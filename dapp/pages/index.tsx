import { SetStateAction, useState } from 'react';
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Paper, TextField, Button, Typography, Grid, Box, colors } from '@mui/material';
import NFTCard from '../components/NFTCard';
import BouncingBall from '../components/BouncingBall';

const Home: NextPage = () => {
  const [addressInput, setAddressInput] = useState('');
  const [add, setAdd] = useState('');

  return (
    <div className={styles.container}>
      <BouncingBall ethAddress={add || ''} />
      <Head>
        <title>CyberAquarium</title>
        <meta
          content="developer by Kevin & Owen"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Image
        src="/aquarium/aquarium-10.jpeg"
        alt="bg"
        layout='fill'
        z-tabindex={-99}
        style={{ position: 'absolute', zIndex: -2 }}
      />
      <main className={styles.main}>
        <Paper
          elevation={6}
          sx={{
            width: '45%',
            padding: '2rem',
            maxHeight: '80vh',
            background: 'linear-gradient(180deg, rgba(34, 36, 80, 0.9) 0%, rgba(23, 24, 38, 0.9) 100%)',
            border: '3px solid #6DCDFF',
            borderRadius: '1rem',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
          }}>
          <Image
            src='/logo-002.png'
            alt='logo'
            layout='responsive'
            width={100}
            height={100}
            style={{ marginBottom: '15px', borderRadius: '20px' }}
          ></Image>
          <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container justifyContent="center" alignItems="center">
              <ConnectButton />
            </Grid>
            <TextField fullWidth label="Type TBA address" id="addInput"
              InputLabelProps={{ style: { color: 'white' } }}
              color='secondary'
              sx={{
                mb: '15px',
                mt: '15px',
              }}
              value={addressInput}
              inputProps={{
                style: { color: 'white' },
              }}
              onChange={(e: { target: { value: SetStateAction<string> } }) => {
                if (e.target.value.toString().startsWith("0x")) {
                  setAddressInput(e.target.value);
                }
                setAddressInput(e.target.value);
              }}
            />
            <Box
              sx={{ mb: '10px' }}
            >
              <Typography
                display={'inline'}
                sx={{
                  color: 'white'
                }}
              >
                Example:
              </Typography>
              <Button onClick={() => {
                setAddressInput('0xd8FDf15e99b371214D6f1728C85f96635361978c');
              }}>address 1</Button>
              <Button onClick={() => {
                setAddressInput('0x51840Ea7B892145feaCB347Ab2ebaac9032A2140');
              }}>address 2</Button>
            </Box>
            <Button fullWidth variant="outlined" sx={{
              mb: '15px'
            }}
              onClick={() => setAdd(addressInput)} >Fetch fish
            </Button>
            <Typography variant='h3' align='center' sx={{
              color: 'white',
              mb: '1rem'
            }}>My Aquarium</Typography>
            <NFTCard ethAddress={''} />
          </Container>
        </Paper>
      </main>
    </div >
  );
};

export default Home;
