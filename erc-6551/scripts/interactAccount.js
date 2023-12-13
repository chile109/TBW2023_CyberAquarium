const hre = require('hardhat');
const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const nftContractAddress = '0x48115d7907f92bDAA408f94aB1775C22413904C9';        // Taget Account NFT
const registryContractAddress = '0x02101dfB77FDE026414827Fdc604ddAF224F0921';   // TBA 註冊合約
const accountImplementationAddress = '0x2d25602551487c3f3354dd80d76d54383a243358'; // NFT 綁定帳戶的實現合約的地址。
const tokenBoundAccountAddress = '0xd8FDf15e99b371214D6f1728C85f96635361978c';  // TBA 的帳戶
const boundNFTAddress = '0x4A49ad74A00801Ff8277C7665837b5fc5166553E'            // 綁定的 魚NFT 合約地址

// const nftContractAddress = '0xDb134b7Cdfc2B6A2bF5883201b7d7f191b74ea3a';
// const registryContractAddress = '0x02101dfB77FDE026414827Fdc604ddAF224F0921';
// const accountImplementationAddress = '0x2d25602551487c3f3354dd80d76d54383a243358';
// const tokenBoundAccountAddress = '0x5DD81FFB1D7247fb9Bf5f3722F6BCe9497aaa9bB';

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

async function sendNFTToTokenAccount() {
  try {
    // 获取钱包中 NFT 的地址
    const tokenId = await getNFTTokenId(boundNFTAddress);

    const computedAddress = await getTokenBoundAccount();
    console.log('Token Bound Account Address:', computedAddress);

    // 使用 Ethers.js 的 TransferFrom 方法将 NFT 转移到 computedAddress 地址
    const tx = await nftContract.transferFrom(signer.getAddress(), computedAddress, tokenId);
    await tx.wait();

    console.log('NFT successfully transferred to Token Bound Account');
  } catch (err) {
    console.error('Error in sendNFTToTokenAccount:', err);
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
    const ERC721Contract = await hre.ethers.getContractAt('CityFishingBowl', boundNFTAddress, signer);
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
  // await transferToken();
  
  // await sendNFTToTokenAccount();
  await transferNFT();
}

main().catch(err => console.error('Error in main function:', err));