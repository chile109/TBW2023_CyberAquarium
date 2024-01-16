
import { Typography, Box, Grid, Avatar, Card, CardMedia } from '@mui/material';
import useNFT from "../hooks/useNFT";

interface Props {
  ethAddress: string;
}
interface nftsData {
  id: number;
  image_original_url?: string;
  image_preview_url?: string;
  image_url?: string;
}

const NFTCard = ({ ethAddress }: Props) => {
  const { nfts } = useNFT(ethAddress);
  return (
    <>
      <Grid container spacing={4}>
        {nfts && nfts.map((nft: nftsData) => (
          <Grid item key={nft.image_original_url} xs={12} sm={6} md={4}
          >
            <Card
              sx={{
                height: '100%', display: 'flex', flexDirection: 'column',
                borderRadius: '50%', boxShadow: 5,
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '100%',
                }}
                image={nft.image_preview_url || ''}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NFTCard;
