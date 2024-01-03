
import { Typography, Box, Grid, Avatar } from '@mui/material';
import Link from 'next/link';
import useNFT from "../hooks/useNFT";
interface Props {
  ethAddress: string;
}
const NFTCard = ({ ethAddress }: Props) => {
  const { nfts } = useNFT(ethAddress);
  return (
    <>
      {nfts && (
        <Typography mt={4} mb={4} color="brand-dark" fontSize="20px">
          your fish
        </Typography>
      )}
      <Grid mb={4} columns={5} spacing={1}>
        {nfts &&
          nfts.map((data: any) => (
            <Link key={data.id} href={data.permalink}>
              <Avatar
                src={data.image_preview_url}
              >
                <Box></Box>
              </Avatar>
              <Typography fontSize="xs" mt="10px">
                {data.name}
              </Typography>
            </Link>
          ))}
      </Grid>
    </>
  );
};

export default NFTCard;
