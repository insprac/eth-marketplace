import { ethers } from "hardhat"
import { expect } from "chai"

describe("Items", () => {
  const deployItemsFixture = async () => {
    const Items = await ethers.getContractFactory("Items")
    const items = await Items.deploy()
    const [owner, otherAccount] = await ethers.getSigners()
    return { items, owner, otherAccount }
  }

  describe("Deployment", () => {
    it("Should deploy with the right URI", async () => {
      const { items } = await deployItemsFixture()
      expect(await items.uri(1)).to.equal("https://api.example.com/items/{id}.json")
    })

    it("Should deploy with no supply", async () => {
      const { items } = await deployItemsFixture()
      expect(await items.totalSupply(1)).to.equal(0)
      expect(await items.totalSupply(2)).to.equal(0)
      expect(await items.totalSupply(3)).to.equal(0)
    })
  })
})
