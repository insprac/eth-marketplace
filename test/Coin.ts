import { ethers } from "hardhat";
import { expect } from "chai";

describe("Coin", () => {
  const deployCoinFixture = async (initialSupplyEth?: string) => {
    const Coin = await ethers.getContractFactory("Coin");
    const initialSupply = ethers.parseEther(initialSupplyEth || "1000000");
    const coin = await Coin.deploy(initialSupply);
    const [owner, otherAccount] = await ethers.getSigners();
    return { coin, initialSupply, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("Should deploy with the right name and symbol", async () => {
      const { coin } = await deployCoinFixture();
      expect(await coin.name()).to.equal("Coin");
      expect(await coin.symbol()).to.equal("COIN");
    })

    it("Should deploy with the right supply", async () => {
      const { coin, initialSupply, owner } = await deployCoinFixture("999999");
      expect(await coin.totalSupply()).to.equal(initialSupply);
      expect(await coin.balanceOf(owner.address)).to.equal(initialSupply);
    })
  })
})
