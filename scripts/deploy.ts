import { ethers } from "hardhat";

const coinInitialSupply = ethers.parseEther("1000000");

async function main() {
  await deployCoin(coinInitialSupply);
  await deployCharacters();
  await deployItems();
}

async function deployCoin(initialSupply: any) {
  const coin = await ethers.deployContract("Coin", [initialSupply]);
  await coin.waitForDeployment();
  console.log(`Coin with initial supply ${ethers.formatEther(initialSupply)} deployed to ${coin.target}`);
}

async function deployCharacters() {
  const characters = await ethers.deployContract("Characters", []);
  await characters.waitForDeployment();
  console.log(`Characters deployed to ${characters.target}`);
}

async function deployItems() {
  const items = await ethers.deployContract("Items", []);
  await items.waitForDeployment();
  console.log(`Items deployed to ${items.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
