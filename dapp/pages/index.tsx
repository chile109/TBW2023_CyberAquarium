import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Grid, Card, CardMedia, Paper } from '@mui/material';
import useNFT from '../hooks/useNFT';
import Ball from '../components/BouncingBall';

interface nftsData {
  id: number;
  image_original_url?: string;
  image_preview_url?: string;
  image_url?: string;
}

const Home: NextPage = () => {
  const { nfts } = useNFT() as { nfts: nftsData[] };
  // console.log(nfts); 

  return (
    <div className={styles.container}>
      {nfts.map((nft: nftsData) => <Ball key={nft.id} image={nft.image_preview_url} id={0} />)}
      <Head>
        <title>CyberAquarium</title>
        <meta
          content="developer by Kevin & Owen"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Image
        src="/aquarium/aquarium-1.jpeg"
        alt="bg"
        layout='fill'
        z-tabIndex={-99}
        style={{ position: 'absolute', zIndex: -2 }}
      />
      <main className={styles.main}>
        <Paper
          elevation={6}
          sx={{
            padding: '20px',
            borderRadius: '20px'
          }}>
          <Image
            src='/logo-002.png'
            alt='logo'
            layout='responsive'
            width={100}
            height={100}
            style={{ marginBottom: '15px', borderRadius: '20px' }}
          ></Image>
          <ConnectButton />
          <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container spacing={4}>
              {nfts.map((nft: nftsData) => (
                <Grid item key={nft.image_original_url} xs={12} sm={6} md={4}>
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
          </Container>
        </Paper>
      </main>
    </div >
  );
};

export default Home;
