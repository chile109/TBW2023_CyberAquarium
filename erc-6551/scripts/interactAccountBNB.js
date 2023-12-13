const hre = require('hardhat');
const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const nftContractAddress = '0x63b9D92D6473e0553E876A0cfee735E2A246D5b9';        // Taget Account NFT
const registryContractAddress = '0xAcF0156923Ab468681f728474F781B6b8B7B80D0';   // TBA 註冊合約
const accountImplementationAddress = '0x2d25602551487c3f3354dd80d76d54383a243358'; // NFT 綁定帳戶的實現合約的地址。
const tokenBoundAccountAddress = '0x4bF6D1e38978a77A2375112D44cb1f8e4Ce1B369';  // TBA 的帳戶
const fishNftContractAddress = '0x62E96E12FB3a8d9e02f10C9aC1713c0EafB0fc17';   // 魚NFT 合約地址

const tokenId = 0;
const salt = 0; // 加密用的鹽

async function getTokenBoundAccount() {
  const chainId = await hre.network.provider.send('eth_chainId');
  const ERC6551Registry = await hre.ethers.getContractAt('ERC6551Registry', registryContractAddress);
  
  return await ERC6551Registry.account(accountImplementationAddress, chainId, nftContractAddress, tokenId, salt);
}

async function sendFundsToTokenAccount() {
  try {
    // 拿TBA的地址並且轉錢給他
    const computedAddress = await getTokenBoundAccount();
    console.log('Token Bound Account Address:', computedAddress);

    const balanceBefore = await hre.ethers.provider.getBalance(computedAddress);
    console.log(`Token account has ${balanceBefore.toString()} ETH before transfer`);

    const tx = {
      to: computedAddress,
      value: hre.ethers.parseEther('0.01'),
    };

    const receipt = await signer.sendTransaction(tx);
    await receipt.wait();

    const tokenAccountBalance = ethers.formatEther((await hre.ethers.provider.getBalance(computedAddress)).toString());
    console.log(`Token account has ${tokenAccountBalance} ETH after transfer`);
  } catch (err) {
    console.error('Error in sendFundsToTokenAccount:', err);
  }
}

async function getNFTTokenId(nftContractAddress) {
  const nftContract = new ethers.Contract(nftContractAddress, ERC721_ABI);
  const balance = await nftContract.balanceOf(signer.getAddress());
  if (balance.eq(0)) {
    throw new Error('No NFTs found in your wallet');
  }
  return await nftContract.tokenOfOwnerByIndex(signer.getAddress(), 0);
}


async function transferToken() {
  try {
    const ERC721Contract = await hre.ethers.getContractAt('CityFishingBowl', nftContractAddress, signer);
    const currentOwner = await ERC721Contract.ownerOf(tokenId);
    console.log(`Current owner of tokenId ${tokenId} is ${currentOwner}`);

    const approveTxn = await ERC721Contract.approve(tokenBoundAccountAddress, tokenId);
    await approveTxn.wait();
    console.log('approve transaction successful. Hash:', approveTxn.hash);

    const transferTxn = await ERC721Contract.transferFrom(signer.address, tokenBoundAccountAddress, tokenId);
    await transferTxn.wait();
    console.log('transfer transaction successful. Hash:', transferTxn.hash);

    const newOwner = await ERC721Contract.ownerOf(tokenId);
    console.log(`New owner of tokenId ${tokenId} is ${newOwner}`);
  } catch (err) {
    console.error('Error in transferToken:', err);
  }
}

async function transferNFT() {
  try {
    const ERC721Contract = await hre.ethers.getContractAt('CityFishingBowl', fishNftContractAddress, signer);
    const currentOwner = await ERC721Contract.ownerOf(tokenId);
    console.log(`Current owner of tokenId ${tokenId} is ${currentOwner}`);

    const approveTxn = await ERC721Contract.approve(tokenBoundAccountAddress, tokenId);
    await approveTxn.wait();
    console.log('approve transaction successful. Hash:', approveTxn.hash);

    const transferTxn = await ERC721Contract.transferFrom(signer.address, tokenBoundAccountAddress, tokenId);
    await transferTxn.wait();
    console.log('transfer transaction successful. Hash:', transferTxn.hash);

    const newOwner = await ERC721Contract.ownerOf(tokenId);
    console.log(`New owner of tokenId ${tokenId} is ${newOwner}`);
  } catch (err) {
    console.error('Error in transferToken:', err);
  }
}

async function main() {
  // await sendFundsToTokenAccount();
  await transferNFT();
}

main().catch(err => console.error('Error in main function:', err));