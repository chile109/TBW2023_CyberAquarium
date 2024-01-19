import { SetStateAction, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image'
import Head from 'next/head';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container, Paper, TextField, Button, Typography, Grid, Box, colors } from '@mui/material';
import { useWalletClient } from 'wagmi'
import { TokenboundClient } from '@tokenbound/sdk'
import { type TBAccountParams } from "@tokenbound/sdk/dist/src";
import AquariumBag from '../components/AquariumBag';
import SidebarMenu from '../components/SidebarMenu';
import WrapWalletLink from '../components/WrapWalletLink';
import { useGetNFT } from '../hooks/openSeaApi';
import NFTCard from '../components/NFTCard';
import BouncingBall from '../components/BouncingBall';

const DEFAULT_ACCOUNT: TBAccountParams = {
  tokenContract: "0x",
  tokenId: ""
}

const Home: NextPage = () => {
  const chain = 'sepolia'
  const identifier = 1
  const _address = '0x6CcA2d398B2060DC824ba0Cdaf69a8e8344C329e'
  const [isOpen, setIsOpen] = useState(true);
  const [addressInput, setAddressInput] = useState<string>('');
  const [tbaTokenId, setTbaTokenId] = useState<number>(0);
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const tokenboundClient = new TokenboundClient({ signer: walletClient, chainId: 11155111 })
  const [TBAccount, setTBAccount] = useState<TBAccountParams>(DEFAULT_ACCOUNT)
  const [imgUrl, setImgUrl] = useState('')
  const { nfts } = useGetNFT(chain, identifier, _address)

  useEffect(() => {
    fetch(
      `https://testnets-api.opensea.io/api/v2/chain/${chain}/contract/${_address}/nfts/${tbaTokenId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setImgUrl(data.nft.image_url);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tbaTokenId]);

  useEffect(() => {
    console.log(tbaTokenId);
    const myString: string = tbaTokenId.toString();
    const getAccount = async () => {
      setTBAccount({
        tokenContract: "0x6CcA2d398B2060DC824ba0Cdaf69a8e8344C329e",
        tokenId: myString,
      });
    };
    getAccount();
  }, [tbaTokenId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const account = tokenboundClient.getAccount(TBAccount);
        setAddressInput(account);
      } catch (err) {
        console.log(err);
      }
    };
    if (TBAccount) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TBAccount]);

  if (nfts === undefined) {
    return null;
  }

  return (
    <main className="...">
      <BouncingBall ethAddress={addressInput || ''} />
      <Head>
        <title>CyberAquarium</title>
        <meta
          content="developer by Kevin & Owen"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {imgUrl ? (<Image src={imgUrl} alt={''}
        layout='fill'
        style={{ zIndex: -99, }}
      ></Image>) : (<Image src={'/aquarium/aquarium-1.jpeg'} alt={''}
        layout='fill'
        style={{ zIndex: -99, }}
      ></Image>)}
      <div className="...">
        <div onClick={() => setIsOpen(!isOpen)}>
          <WrapWalletLink />
        </div>
        <AquariumBag />
        <SidebarMenu signer={undefined} />
        {isOpen ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
                {/* <Button fullWidth variant="outlined" sx={{
                  mb: '15px'
                }}
                  onClick={() => setAdd(addressInput)} >Fetch fish
                </Button> */}
                <Typography variant='h3' align='center' sx={{
                  color: 'white',
                  mb: '1rem'
                }}>My Aquarium</Typography>
                <NFTCard ethAddress={''} onTbaAddChange={setTbaTokenId} />
              </Container>
            </Paper>
          </Box>
        ) : null}
      </div>
    </main>
  )
}

export default Home;
