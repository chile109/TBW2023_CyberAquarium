import { Grid, Card, CardMedia, CardActionArea } from '@mui/material';
import useTba from "../hooks/useTba";
import { useEffect } from 'react';
import { nftsData } from '../types/ensDataType';

interface Props {
  ethAddress: string;
  onTbaAddChange: (tbaAdd: number) => void;
}

const NFTCard = ({ ethAddress, onTbaAddChange }: Props) => {
  const { nfts } = useTba(ethAddress);

  useEffect(() => {
    console.log(nfts);
  }, [nfts]);

  return (
    <>
      <Grid container spacing={4}>
        {nfts && nfts.map((nft: nftsData) => (
          <Grid item key={nft.identifier} xs={12} sm={6} md={3}
          >
            <Card
              sx={{
                height: '100%', display: 'flex', flexDirection: 'column',
                borderRadius: '50%', boxShadow: 5,
              }}
            >
              <CardActionArea
              >
                <CardMedia
                  onClick={() => {
                    onTbaAddChange(nft.identifier);
                  }}
                  component="div"
                  sx={{
                    // 16:9
                    pt: '100%',
                  }}
                  image={nft.image_url || ''}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NFTCard;
