import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Grid, Card, CardMedia, Paper } from '@mui/material';
import useNFT from '../hooks/useNFT';
import useImgColor from "../hooks/useImgColor";
import Ball from '../components/BouncingBall';


interface nftsData {
  id: number;
  image_original_url?: string;
  image_preview_url?: string;
  image_url?: string;
}

type colorRawType = {
  _rgb: [number, number, number, number]
}

const DisplayLastSecondColor: React.FC<{ colors: Array<colorRawType> }> = ({ colors }) => {
  const lastSecondColor = colors[colors.length - 2];

  return (
    <div>
      {lastSecondColor && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: '-99',
            backgroundColor: `rgb(${lastSecondColor._rgb.join(',')})`,
          }}
        ></div>
      )}
    </div>
  );
};


const Home: NextPage = () => {
  const { nfts } = useNFT() as { nfts: nftsData[] };
  // console.log(nfts);

  const imgColor: Array<colorRawType> = useImgColor((nfts.length > 0 && nfts[nfts.length - 1].image_preview_url) || "");
  // console.log(imgColor);

  const [sortedColors, setSortedColors] = useState<Array<colorRawType>>([]);
  // console.log(sortedColors);


  const lastItemOriginalUrl = (nfts as nftsData[])[nfts.length - 1]?.image_preview_url || '';

  useEffect(() => {
    setSortedColors((sortColors(imgColor)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgColor]);

  const getBrightness = (clr: colorRawType) => {
    if (clr) {
      return clr._rgb[0] * 0.299 + clr._rgb[1] * 0.587 + clr._rgb[2] * 0.114;
    } else {
      return 0;
    }
  };

  const sortColors = (colors: Array<colorRawType>) => {
    if (!colors) return [];
    let clrs = colors
      .map((clr) => ({ clr, brightness: getBrightness(clr) }))
      .sort((a, b) => {
        return a.brightness - b.brightness;
      })
      .map(({ clr }) => clr);
    return clrs;
  };

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

      {/* <DisplayLastSecondColor colors={sortedColors} /> */}

      <Image
        src="/aquarium-001.jpeg"
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
          {/* <Container
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '5vh',
            }}
          >
            <Card
              sx={{
                width: { xs: '200px', sm: '300px', md: '400px', lg: '450px' },
                height: { xs: '150px', sm: '200px', md: '300px', lg: '300px' },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '15px',
                boxShadow: 5,
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: '100%',
                }}
                image={lastItemOriginalUrl || ''}
              />
            </Card>
          </Container> */}
          {/* <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{
              mt: '20px',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Your Fish:
          </Typography> */}
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
