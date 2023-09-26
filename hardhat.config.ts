import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      accounts: ["0x1713d51cc2c9297e89f4973c1946f874784fe4da88a8a9cc46398f7258e625ed"],
    },
  },
};

export default config;
