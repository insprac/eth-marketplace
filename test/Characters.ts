import { ethers } from "hardhat"
import { expect } from "chai"

describe("Characters", () => {
  const deployCharactersFixture = async () => {
    const Characters = await ethers.getContractFactory("Characters")
    const characters = await Characters.deploy()
    const [owner, otherAccount] = await ethers.getSigners()
    const ownerSupply = await characters.OWNER_SUPPLY()
    return { characters, owner, otherAccount, ownerSupply }
  }

  describe("Deployment", () => {
    it("Should deploy with the right name and symbol", async () => {
      const { characters } = await deployCharactersFixture()
      expect(await characters.name()).to.equal("Characters")
      expect(await characters.symbol()).to.equal("CHAR")
    })

    it("Should deploy with the right supply", async () => {
      const { characters, owner, ownerSupply } = await deployCharactersFixture()
      expect(await characters.totalSupply()).to.equal(ownerSupply)
      expect(await characters.balanceOf(owner.address)).to.equal(ownerSupply)
    })
  })

  describe("Minting", () => {
    it("Should mint the right amount of tokens", async () => {
      const { characters, owner } = await deployCharactersFixture()
      await characters.mint(owner.address)
      expect(await characters.totalSupply()).to.equal(51)
      expect(await characters.balanceOf(owner.address)).to.equal(51)
    })
  })
})
