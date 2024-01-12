// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EnglishAuction {
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event OverTimeWithdraw(address indexed bidder, uint amount);
    event End(address winner, uint amount);

    IERC721 public nft;
    uint public nftId;

    address payable public seller;
    uint public endAt;
    bool public ended;

    address public highestBidder;
    uint public initialBid;
    uint public highestBid;
    mapping(address => uint) public bids;
    uint constant public auctionTime = 7 days;
    uint constant public sellerPendingTime = 3 days;

    constructor(address _nft, uint _nftId, uint _startingBid) {
        nft = IERC721(_nft);
        nftId = _nftId;

        seller = payable(msg.sender);
        initialBid = _startingBid;
    }

    function bid() external payable {
        if (highestBidder != address(0)) {
            require(block.timestamp < endAt, "ended");
            require(msg.value > highestBid, "value <= highest");
            bids[highestBidder] += highestBid;
        }else{
            require(msg.value >= initialBid, "value < initialBid");
            endAt = block.timestamp + auctionTime;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit Bid(msg.sender, msg.value);
    }

    function withdraw() external {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(bal);

        emit Withdraw(msg.sender, bal);
    }

    function overTimeWithdraw() external {
        require(!ended, "ended");
        require(msg.sender == highestBidder, "not highest bidder");
        require(block.timestamp >= endAt + sellerPendingTime, "still pending seller action");

        uint bal = highestBid;
        payable(msg.sender).transfer(bal);
        
        highestBid = 0;
        highestBidder = address(0);

        emit OverTimeWithdraw(msg.sender, bal);
    }

    function end() external {
        require(highestBidder != address(0), "no bidder");
        require(msg.sender == seller, "not seller");
        require(block.timestamp >= endAt, "not ended");
        require(!ended, "ended");

        ended = true;
        nft.safeTransferFrom(seller, highestBidder, nftId);
        seller.transfer(highestBid);

        emit End(highestBidder, highestBid);
    }
}
