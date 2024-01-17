
import { Typography, Box, Grid, Avatar, Card, CardMedia } from '@mui/material';
import useNFT from "../hooks/useNFT";
import useTba from "../hooks/useTba";

interface Props {
  ethAddress: string;
}
interface nftsData {
  identifier: number;
  image_original_url?: string;
  image_preview_url?: string;
  image_url?: string;
}

const NFTCard = ({ ethAddress }: Props) => {
  const { nfts } = useTba(ethAddress);
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
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '100%',
                }}
                image={nft.image_url || ''}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default NFTCard;
