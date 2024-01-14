// EnglishAuction.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EnglishAuction", function () {
  let nftContract;
  let tokenId;
  let englishAuction;
  let owner;
  let bidder;
  let bidder2;

  beforeEach(async function () {
    [owner, bidder, bidder2] = await ethers.getSigners();

    const ERC721Factory = await ethers.getContractFactory("CityFishingBowl");
    nftContract = await ERC721Factory.deploy();
    // mint NFT
    tokenId = 0;
    await nftContract.safeMint(owner.address);
    expect(await nftContract.ownerOf(tokenId)).to.equal(owner.address);

    const EnglishAuctionFactory = await ethers.getContractFactory("EnglishAuction");
    englishAuction = await EnglishAuctionFactory.deploy(nftContract.target, tokenId, ethers.parseEther("1"));

    await englishAuction.waitForDeployment();
  });

  it("Should place a bid and set endAt", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });

    const highestBidder = await englishAuction.highestBidder();
    const highestBid = await englishAuction.highestBid();
    const auctionTime = await englishAuction.auctionTime();
    const endAt = await englishAuction.endAt();
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    const timestamp = block.timestamp;
    const expectedEndAt = BigInt(timestamp) + auctionTime;

    expect(highestBidder).to.equal(bidder.address);
    expect(highestBid).to.equal(ethers.parseEther("2"));
    expect(endAt).to.equal(expectedEndAt);
  });

  it("Should withdraw funds", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });
    await englishAuction.connect(bidder2).bid({ value: ethers.parseEther("3") });
    const bidBeforeWithdraw = await englishAuction.bids(bidder.address);
    expect(bidBeforeWithdraw).to.equal(ethers.parseEther("2"));

    const initialBalance = await ethers.provider.getBalance(bidder.address);
    await englishAuction.connect(bidder).withdraw();

    const bidAfterWithdraw = await englishAuction.bids(bidder.address);
    const newBalance = await ethers.provider.getBalance(bidder.address);

    expect(bidAfterWithdraw).to.equal(0);
    expect(newBalance > initialBalance).to.be.true;
  });

  it("Should revert if withdrawer balance is zero ", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });
    await expect(englishAuction.connect(bidder).withdraw()).to.be.revertedWith("no balance");
  });

  it("Should overTimeWithdraw funds after auction end", async function () {
    const auctionTime = await englishAuction.auctionTime();
    const sellerPendingTime = await englishAuction.sellerPendingTime();
    // Place a bid
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });

    // Increase the time to simulate the auction end
    await ethers.provider.send("evm_increaseTime", [Number(auctionTime) + Number(sellerPendingTime) + 1]);
    // Withdraw funds
    const initialBalance = await ethers.provider.getBalance(bidder.address);
    await englishAuction.connect(bidder).overTimeWithdraw();

    const highestBidder = await englishAuction.highestBidder();
    const highestBid = await englishAuction.highestBid();

    const bidAfterWithdraw = await englishAuction.bids(bidder.address);
    const newBalance = await ethers.provider.getBalance(bidder.address);

    expect(highestBidder).to.equal(ethers.ZeroAddress); // Reset Auction
    expect(highestBid).to.equal(0);

    expect(bidAfterWithdraw).to.equal(0);
    expect(newBalance > initialBalance).to.be.true;
  });

  it("Should revert if overTimeWithdraw is called before auction end", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });
    await expect(englishAuction.connect(bidder).overTimeWithdraw()).to.be.revertedWith("still pending seller action");
  });

  it("Should revert if auction has no bidder", async function () {
    await expect(englishAuction.connect(owner).end()).to.be.revertedWith("no bidder");
  });

  it("Should revert if not called by the owner", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });
    await expect(englishAuction.connect(bidder).end()).to.be.revertedWith("not seller");
  });

  it("Should revert if auction has not end", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });
    await expect(englishAuction.connect(owner).end()).to.be.revertedWith("not ended");
  });

  it("should transfer NFT to highest bidder", async () => {
    // 設定最高出價者
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });
    await englishAuction.connect(bidder2).bid({ value: ethers.parseEther("3") });

    await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine");

    // 確認拍賣時間已結束
    const endAt = await englishAuction.endAt();
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    const timestamp = block.timestamp;
    expect(endAt).to.lessThanOrEqual(BigInt(timestamp));

    await nftContract.approve(englishAuction, tokenId, {from: owner});

    // 結束拍賣，確認NFT轉移
    const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
    const txn = await englishAuction.connect(owner).end();
    expect(await nftContract.ownerOf(tokenId)).to.equal(bidder2.address);

    // 確認owner收到款項
    const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
    const ownerBalanceDiff = ownerBalanceAfter - ownerBalanceBefore;
    expect(ownerBalanceDiff).to.greaterThan(0);
  });

  it("Should change endAt", async function () {
    const newEndAt = Math.floor(Date.now() / 1000) + 3600; // Set new endAt time to 1 hour from now
    await englishAuction.connect(owner).changeEndAt(newEndAt);

    const endAt = await englishAuction.endAt();
    expect(endAt).to.equal(newEndAt);
  });
});