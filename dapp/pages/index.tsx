import { SetStateAction, useState } from 'react';
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Paper, TextField, Button, Typography, Grid, Box } from '@mui/material';
import NFTCard from '../components/NFTCard';
import BouncingBall from '../components/BouncingBall';

const Home: NextPage = () => {
  const [addressInput, setAddressInput] = useState('');
  const [add, setAdd] = useState('');

  const SendAddress = () => {
    setAdd(addressInput);
  };

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
          <Container sx={{ py: 2 }} maxWidth="md">
            <Grid container justifyContent="center" alignItems="center">
              <ConnectButton />
            </Grid>
            <TextField fullWidth label="type address" id="addInput"
              sx={{
                mb: '15px',
                mt: '15px'
              }}
              value={addressInput}
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
              >
                Example:
              </Typography>
              <Button onClick={() => {
                setAddressInput('0xd8FDf15e99b371214D6f1728C85f96635361978c');
              }}>address 1</Button>
              <Button onClick={() => {
                setAddressInput('0x448C510Ada54D79701112e9aAf8F3d3Eab60CB48');
              }}>address 2</Button>
            </Box>
            <Button fullWidth variant="outlined" sx={{
              mb: '15px'
            }}
              onClick={SendAddress} >Fetch
            </Button>
            <NFTCard ethAddress={add || ''} />
          </Container>
        </Paper>
      </main>
    </div >
  );
};

export default Home;
