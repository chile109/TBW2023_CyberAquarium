/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
module.exports = {
  defaultNetwork: "test",
  solidity: "0.8.19",
  networks: {
    hardhat: {
    },
    test: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  }
};
