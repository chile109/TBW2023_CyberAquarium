/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
 
  networks: {
    hardhat: {
      //If you want to do some forking, uncomment this
      //  forking: {
      //    url: "MAINNET_RPC_URL"
      //  } ,
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
 
    // sepolia: {
    //   url: process.env.RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY]
    // },
  },
  chai: {
    require: ["chai", "chai-as-promised"],
  },
};
