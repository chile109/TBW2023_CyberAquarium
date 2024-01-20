import React, { useEffect, useState } from "react";
import SellerAuctionPanel from "./SellerAuctionPanel";
import SellerConfirmPanel from "./SellerConfirmPanel";
import SellerDealLPanel from "./SellerDealPanel";
import BuyerBidPanel from "./BuyerBidPanel";
import { Contract, Signer, Wallet, ethers, providers } from "ethers";
import EnglishAuctionArtifact from "../Contact/EnglishAuction.json";
import { NFT } from '../types/ensDataType';

interface Props {
  signer: ethers.providers.JsonRpcSigner | undefined;
  aquariumData: {
    nft: NFT
  } | null;
}

const SidebarMenu: React.FC<Props> = ({ signer, aquariumData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [auctionContract, setAuctionContract] = useState({} as ethers.Contract);
  const [auctionAddress, setAuctionAddress] = useState("");

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const deployContract = async (
    nftContractTarget: string,
    tokenId: number,
    startingBid: ethers.BigNumber,
    reservePrice: ethers.BigNumber
  ) => {
    try {
      const EnglishAuctionFactory = new ethers.ContractFactory(
        EnglishAuctionArtifact.abi,
        EnglishAuctionArtifact.bytecode,
        signer
      );

      // 部署合约
      const deployedContract = await EnglishAuctionFactory.deploy(
        nftContractTarget,
        tokenId,
        startingBid,
        reservePrice
      );

      // 在测试链上等待部署完成
      await deployedContract.deployed();

      const newContractAddress = deployedContract.address;

      console.log("Contract deployed to:", newContractAddress);

      setAuctionContract(deployedContract);
      setAuctionAddress(newContractAddress);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  return (
    <div className="sidebarFishShop-container">
      <input
        type="checkbox"
        id="side-fishShop"
        className="sidebar-inputSide"
        checked={isOpen}
        onChange={handleClick}
      />
      <label htmlFor="side-fishShop" className="sidebarFishShop bgset"></label>
      <label htmlFor="side-fishShop" className="sidebarFishShop-close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="sidebar-box-close-icon bi bi-x-lg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </label>
      {/* <SellerAuctionPanel deployAuction={deployContract} aquariumData={aquariumData} /> */}
      {/* <SellerConfirmPanel  aquariumData={aquariumData}/> */}
      {/* <SellerDealLPanel aquariumData={aquariumData}/> */}
      <BuyerBidPanel aquariumData={aquariumData} />
    </div>
  );
};

export default SidebarMenu;
