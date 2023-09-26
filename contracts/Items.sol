// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Items is ERC1155, Ownable {
    using SafeMath for uint256;

    // Mapping from token ID to token supply
    mapping(uint256 => uint256) private _totalSupply;

    constructor() ERC1155("https://api.example.com/items/{id}.json") {}

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
        _totalSupply[id] = _totalSupply[id].add(amount);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
        for (uint256 i = 0; i < ids.length; i++) {
            _totalSupply[ids[i]] = _totalSupply[ids[i]].add(amounts[i]);
        }
    }

    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        _burn(account, id, amount);
        _totalSupply[id] = _totalSupply[id].sub(amount);
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public onlyOwner {
        _burnBatch(account, ids, amounts);
        for (uint256 i = 0; i < ids.length; i++) {
            _totalSupply[ids[i]] = _totalSupply[ids[i]].sub(amounts[i]);
        }
    }

    function totalSupply(uint256 id) public view returns (uint256) {
        return _totalSupply[id];
    }
}
