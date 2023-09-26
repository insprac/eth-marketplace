// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Characters is ERC721, Ownable {
    uint256 public totalSupply = 0;
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant OWNER_SUPPLY = 50;

    constructor() ERC721("Characters", "CHAR") {
      for (uint256 i = 0; i < OWNER_SUPPLY; i++) {
        mint(msg.sender);
      }
    }

    function mint(address recipient) public onlyOwner {
        require(totalSupply <= MAX_SUPPLY, "Max supply reached");
        totalSupply++;
        _safeMint(recipient, totalSupply);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://api.example.com/nft/";
    }
}
