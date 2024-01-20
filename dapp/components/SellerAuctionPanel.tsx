import React, { useState } from "react";
import { ethers } from "ethers";
import { NFT } from '../types/ensDataType';

interface Props {
  deployAuction: (
    nftContractTarget: string,
    tokenId: number,
    startingBid: ethers.BigNumber,
    reservePrice: ethers.BigNumber
  ) => void;
  aquariumData: {
    nft: NFT
  } | null;
}

const SellerAuctionPanel = ({ deployAuction, aquariumData }: Props) => {
  const [buyPrice, setBuyPrice] = useState("");
  console.log(aquariumData)

  const onClickButton = () => {
    // For debugging purposes, will use html input fields later
    const nftContractTarget = "0xAE9eb972D43eCaEC22eF02Afb1f856cF61f7F9F8";
    const tokenId = 1;
    const startingBid = ethers.utils.parseEther("0.1");
    const reservePrice = ethers.utils.parseEther("3");

    deployAuction(nftContractTarget, tokenId, startingBid, reservePrice);
  };

  return (
    <div className="sidebarFishShop-fishBox">
      <div className="sidebarFish-fishBox-list">
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">起標價格</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue sidebar-box-list-item-buy-lgNum">
            0.1
            <span className="sidebar-box-list-item-edit-rowline-text">
              ETＨ
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="sidebar-box-list-item-text-icon sidebar-box-list-item-buy-lgNum-icon"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </div>
          <div className="sidebar-box-list-item-edit">
            <input type="text" className="sidebar-box-list-item-edit-input" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="sidebar-box-list-item-edit-input-icon bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
            <div className="wrap-login-tip">不得低於0.1</div>
          </div>
        </div>

        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">直接購買價</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue sidebar-box-list-item-buy-lgNum">
            3
            <span className="sidebar-box-list-item-edit-rowline-text">
              ETＨ
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="sidebar-box-list-item-text-icon sidebar-box-list-item-buy-lgNum-icon"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          </div>
          <div className="sidebar-box-list-item-edit">
            <input type="text" className="sidebar-box-list-item-edit-input"
              value={buyPrice}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBuyPrice(event.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="sidebar-box-list-item-edit-input-icon bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
            <div className="wrap-login-tip">不得低於0.1</div>
          </div>
        </div>

        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">Name</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue">
            {aquariumData && aquariumData ? (aquariumData?.nft?.name) : ('光之水族箱')}
          </div>
        </div>
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">Description</p>
          <div className="sidebar-box-list-item-text">
            {aquariumData && aquariumData ? (aquariumData?.nft?.description) : ('Fxhash知名創作者生成式藝術家吳哲宇，這個光之水族箱裡可看見其作品SoulFish正緩緩的悠遊。每條魚皆是以數學公式生成，並且都是獨一無二的個體。')}
          </div>
        </div>
        <button onClick={onClickButton} className="sidebar-box-list-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="sidebar-box-list-btn-icon bi bi-tags"
            viewBox="0 0 16 16"
          >
            <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
          </svg>
          確認起標
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default SellerAuctionPanel;
