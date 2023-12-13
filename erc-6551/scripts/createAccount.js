const hre = require("hardhat");
const { ethers } = require("ethers")
require("dotenv").config()

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

//BNB Address
const registryAddress = '0xAcF0156923Ab468681f728474F781B6b8B7B80D0';

// Sepolia Address
// const registryAddress = '0x02101dfB77FDE026414827Fdc604ddAF224F0921';
const implementationAddress = '0x2d25602551487c3f3354dd80d76d54383a243358';
const tokenId = 0;
const salt = 0;
let nftContract;

const getTokenBoundAccount = async (RegistryContract) => {
  const chainId = await hre.network.provider.send('eth_chainId');
  const tokenBoundAccount = await RegistryContract.account(implementationAddress, chainId, nftContract, tokenId, salt);
  console.log('Token Bound Account: ', tokenBoundAccount);
  return tokenBoundAccount;
};

const main = async () => {
  await deployMint2FishNFT();
};

async function deployCreateTBA(nftTokenContract) {
  const RegistryContract = await hre.ethers.getContractAt('ERC6551Registry', registryAddress, signer);
  const chainId = await hre.network.provider.send('eth_chainId');

   // 透過implementationAddress生成TBA帳號instance
   const initData = '0x';
   const transaction = await RegistryContract.createAccount(implementationAddress, chainId, nftTokenContract.target, tokenId, salt, initData);
 
   await transaction.wait();
   console.log(`createAccount call successful. Tx Hash: ${transaction.hash}`);
   await getTokenBoundAccount(RegistryContract);
}

async function deployMintFishBowlNFT() {
  console.log('Deploying contract...');
  const nftTokenContract = await hre.ethers.deployContract('CityFishingBowl', signer);
  await nftTokenContract.waitForDeployment();
  nftContract = nftTokenContract.target;
  console.log(`ERC-721A contract deployed to ${nftContract}`);

  const uriBowlTxn = await nftTokenContract.setbaseURI("https://gateway.pinata.cloud/ipfs/QmTnuqNqsQoVx7MUs47RWdQA64sXd8CTtPYWkwkJ97Lt8c/");
  console.log(`uri Bowl successful: ${uriBowlTxn.hash}`);

  const mintTxn = await nftTokenContract.safeMint(signer.address);
  console.log(`Mint successful: ${mintTxn.hash}`);
}

async function deployMint2FishNFT() {
  console.log('Deploying contract...');
  const nftTokenContract = await hre.ethers.deployContract('CityFishingBowl', signer);
  await nftTokenContract.waitForDeployment();
  nftContract = nftTokenContract.target;
  console.log(`ERC-721A contract deployed to ${nftContract}`);

  const uriFishTxn = await nftTokenContract.setbaseURI("https://gateway.pinata.cloud/ipfs/QmNw8MWhdfURRmKNwbKmo18jBmTAqUPsnEjz9K1yjGWUuo/");
  console.log(`uri Fish successful: ${uriFishTxn.hash}`);

  const mintTxn = await nftTokenContract.safeMint(signer.address);
  console.log(`Mint Fish 1 successful: ${mintTxn.hash}`);

  const mint2Txn = await nftTokenContract.safeMint(signer.address);
  console.log(`Mint Fish 2 successful: ${mint2Txn.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});