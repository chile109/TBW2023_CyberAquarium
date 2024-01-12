// EnglishAuction.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EnglishAuction", function () {
  let englishAuction;
  let owner;
  let bidder;

  beforeEach(async function () {
    [owner, bidder] = await ethers.getSigners();

    const ERC721Factory = await ethers.getContractFactory("CityFishingBowl");
    const ERC721 = await ERC721Factory.deploy();

    const EnglishAuctionFactory = await ethers.getContractFactory("EnglishAuction");
    englishAuction = await EnglishAuctionFactory.deploy(ERC721.target, 1, ethers.parseEther("1"));

    await englishAuction.waitForDeployment();
  });

  it("Should place a bid", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });

    const bid = await englishAuction.bids(bidder.address);
    expect(bid).to.equal(ethers.parseEther("2"));

    const highestBidder = await englishAuction.highestBidder();
    const highestBid = await englishAuction.highestBid();

    expect(highestBidder).to.equal(bidder.address);
    expect(highestBid).to.equal(ethers.parseEther("2"));
  });

  it("Should withdraw funds", async function () {
    await englishAuction.connect(bidder).bid({ value: ethers.parseEther("2") });

    const initialBalance = await ethers.provider.getBalance(bidder.address);

    await englishAuction.connect(bidder).withdraw();

    const newBalance = await ethers.provider.getBalance(bidder.address);

    const bid = await englishAuction.bids(bidder.address);
    expect(bid).to.equal(0);

    expect(newBalance.gt(initialBalance)).to.be.true;
  });
});
