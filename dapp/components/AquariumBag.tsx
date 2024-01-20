import React from 'react';
import { NFTData } from '../types/ensDataType';
import { Grid, Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';

const SidebarFishBoxList: React.FC<{ nftData: NFTData | null }> = ({ nftData }) => {
  return (
    <>
      <Typography
        variant='h3'
      >
        your fish:
      </Typography>
      <Grid container spacing={4} sx={{ mb: '1rem', mt: '0.5rem' }}>
        {nftData && nftData.nfts?.map((nft) => (
          <Grid item key={nft.identifier} xs={12} sm={6} md={6}>
            <Card
              sx={{
                height: '100%', display: 'flex', flexDirection: 'column',
                boxShadow: 5, color: '#6DCDFF',
                border: '1px solid #6DCDFF ',
                background: 'linear-gradient(180deg, rgba(34, 36, 80, 0.8) 0%, rgba(23, 24, 38, 0.8) 100%)'
              }}
            >
              <CardActionArea>
                <CardMedia
                  onClick={() => {
                    // do something here
                  }}
                  sx={{
                    // 16:9
                    pt: '100%',
                  }}
                  image={nft.image_url || ''}
                />
                <span style={{ display: 'flex', justifyContent: 'center', padding: '0.4rem' }}>
                  {nft.name}
                </span>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const AquariumBag: React.FC<{ nftData: NFTData | null }> = ({ nftData }) => {
  return (
    <div>
      <input type="checkbox" id="side-fish" className="sidebar-inputSide" />
      <label htmlFor="side-fish" className="sidebarFish bgset"></label>
      <label htmlFor="side-fish" className="sidebarFish-close">
        <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-box-close-icon bi bi-x-lg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </label>
      <div className="sidebarFish-fishBox">
        <div className="sidebarFish-fishBox-list">
          <SidebarFishBoxList nftData={nftData} />
          <a href='https://www.fxhash.xyz/generative/15625' target='_blank'>
            <button className="sidebar-box-list-btn">
              <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-box-list-btn-icon" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
              </svg>
              購買連結
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AquariumBag;
