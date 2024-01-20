import React from "react";
import { useContractWrite } from 'wagmi';
import EnglishAuctionArtifact from "../Contact/EnglishAuction.json";
import { NFT } from '../types/ensDataType';

interface Props {
  aquariumData: {
    nft: NFT
  } | null
}

const SellerDealLPanel: React.FC<Props> = ({ aquariumData }) => {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: '0x345FDDD623944ACDa874342411ceFfe73C093AD6',
    abi: EnglishAuctionArtifact.abi,
    functionName: 'end',
  })

  return (
    <div className="sidebarFishShop-fishBox">
      <div className="sidebarFish-fishBox-list">
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">最新價格</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue sidebar-box-list-item-buy-lgNum">
            <div className="sidebar-box-list-item-edit">
              <div className="container">
                <section className="countdown-timer">
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-day" className="sheet"></div>
                      <p id="days" className="primary">
                        00
                      </p>
                    </div>
                    <p className="sub-heading">D</p>
                  </div>
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-hour" className="sheet"></div>
                      <div className="circle-left"></div>
                      <p id="hours" className="primary">
                        00
                      </p>
                      <div className="circle-right"></div>
                    </div>
                    <p className="sub-heading">H</p>
                  </div>
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-min" className="sheet"></div>
                      <div className="circle-left"></div>
                      <p id="minutes" className="primary">
                        00
                      </p>
                      <div className="circle-right"></div>
                    </div>
                    <p className="sub-heading">M</p>
                  </div>
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-sec" className="sheet"></div>
                      <div className="circle-left"></div>
                      <p id="seconds" className="primary">
                        00
                      </p>
                      <div className="circle-right"></div>
                    </div>
                    <p className="sub-heading">S</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="sidebar-box-list-item-buy-text">1.08 ETH</div>
          <div className="sidebar-box-list-item-buy-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="sidebar-box-list-item-buy-text-icon bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
            </svg>
            <span>0x12344529380D22</span>
          </div>
        </div>

        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">地板價</p>
          <div className="sidebar-box-list-item-buy-text">2.34 Eth</div>
        </div>
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">擁有者地址</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue">
            0x1234435674342D22
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
        <div className="sidebar-box-list-item">
          <p className="sidebar-box-list-item-title">交易猶豫期</p>
          <div className="sidebar-box-list-item-text sidebar-box-list-item-text-blue sidebar-box-list-item-buy-lgNum">
            <div className="sidebar-box-list-item-edit">
              <div className="container">
                <section className="countdown-timer">
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-day" className="sheet"></div>
                      <p id="days" className="primary">
                        00
                      </p>
                    </div>
                    <p className="sub-heading">D</p>
                  </div>
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-hour" className="sheet"></div>
                      <div className="circle-left"></div>
                      <p id="hours" className="primary">
                        00
                      </p>
                      <div className="circle-right"></div>
                    </div>
                    <p className="sub-heading">H</p>
                  </div>
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-min" className="sheet"></div>
                      <div className="circle-left"></div>
                      <p id="minutes" className="primary">
                        00
                      </p>
                      <div className="circle-right"></div>
                    </div>
                    <p className="sub-heading">M</p>
                  </div>
                  <div className="countdown-info">
                    <div className="timer-box">
                      <div id="flip-sheet-sec" className="sheet"></div>
                      <div className="circle-left"></div>
                      <p id="seconds" className="primary">
                        00
                      </p>
                      <div className="circle-right"></div>
                    </div>
                    <p className="sub-heading">S</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => write()} className="sidebar-box-list-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="sidebar-box-list-btn-icon bi bi-tags"
            viewBox="0 0 16 16"
          >
            <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
          </svg>
          交易成立
        </button>
        {/* <button onClick={onDealClick} className="sidebar-box-list-btn sidebar-box-list-btn-gray">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="sidebar-box-list-btn-icon sidebar-box-list-btn-icon-gray bi bi-tags"
            viewBox="0 0 16 16"
          >
            <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
          </svg>
          取消交易
        </button> */}
      </div>
    </div>
  );
};

export default SellerDealLPanel;
