import React from "react";
import { useContractRead } from "wagmi";
import EnglishAuctionArtifact from "../Contact/EnglishAuction.json";
import CountdownTimer from "./CountdownTimer";
import { ethers } from "ethers";
import { NFT } from '../types/ensDataType';

interface Props {
  aquariumData: {
    nft: NFT
  } | null;
}

const SellerConfirmPanel: React.FC<Props> = ({ aquariumData }) => {
  // const signer = useEthersSigner({ chainId: 11155111 });
  console.log(aquariumData)
  const { data } = useContractRead({
    address: "0x345FDDD623944ACDa874342411ceFfe73C093AD6",
    abi: EnglishAuctionArtifact.abi,
    functionName: "endAt",
  });

  const timestamp = data
    ? Number(data) * 1000
    : Date.now() + 7 * 24 * 60 * 60 * 1000;

  // 使用 new Date() 将时间戳转换为日期字符串
  const dateString = new Date(timestamp).toISOString();

  const { data: bidAddress } = useContractRead({
    address: "0x345FDDD623944ACDa874342411ceFfe73C093AD6",
    abi: EnglishAuctionArtifact.abi,
    functionName: "highestBidder",
  });

  // 處理bidAddress轉為string
  const biderWallet = bidAddress ? bidAddress.toString() : "";

  const { data: sellerAddress } = useContractRead({
    address: "0x345FDDD623944ACDa874342411ceFfe73C093AD6",
    abi: EnglishAuctionArtifact.abi,
    functionName: "seller",
  });

  // 處理bidAddress轉為string
  const sellerWallet = sellerAddress ? sellerAddress.toString() : "";


  const { data: directBuyPrice } = useContractRead({
    address: "0x345FDDD623944ACDa874342411ceFfe73C093AD6",
    abi: EnglishAuctionArtifact.abi,
    functionName: "directBuyPrice",
    args: [],
  });

  // Ensure highestBid is a valid BigNumber
  const buyPriceValue = directBuyPrice ? ethers.BigNumber.from(directBuyPrice) : ethers.constants.Zero;

  // Format highestBidValue
  const buyPrice = ethers.utils.formatEther(buyPriceValue);


  const { data: highestBid } = useContractRead({
    address: "0x345FDDD623944ACDa874342411ceFfe73C093AD6",
    abi: EnglishAuctionArtifact.abi,
    functionName: "highestBid",
  });

  // Ensure highestBid is a valid BigNumber
  const highestBidValue = highestBid ? ethers.BigNumber.from(highestBid) : ethers.constants.Zero;

  // Format highestBidValue
  const highestPrice = ethers.utils.formatEther(highestBidValue);

  return (
    <div className="sidebarFishShop-fishBox">
      <div className="sidebarFish-fishBox-list">
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">最新價格</p>

          <CountdownTimer targetDate={dateString} />
          <div className="sidebar-box-list-item-buy-text">{highestPrice} ETH</div>
          <div className="sidebar-box-list-item-buy-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="sidebar-box-list-item-buy-text-icon bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
            </svg>
            <span style={{ overflow: "hidden", margin: "0px, 30px, 0px, 0px" }}>{biderWallet?.slice(0, 5)}.....{biderWallet.slice(-5)}</span>
          </div>
        </div>

        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">地板價</p>
          <div className="sidebar-box-list-item-buy-text">{buyPrice} Eth</div>
        </div>
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">擁有者地址</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue">
            {sellerWallet?.slice(0, 5)}.....{sellerWallet.slice(-5)}
          </div>
        </div>
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">水族箱名稱</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue">
            {aquariumData && aquariumData ? (aquariumData?.nft?.name) : ('光之水族箱')}
          </div>
        </div>

        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">故事介紹</p>
          <div className="sidebar-box-list-item-text">
            {aquariumData && aquariumData ? (aquariumData?.nft?.description) : ('Fxhash知名創作者生成式藝術家吳哲宇，這個光之水族箱裡可看見其作品SoulFish正緩緩的悠遊。每條魚皆是以數學公式生成，並且都是獨一無二的個體。')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerConfirmPanel;
