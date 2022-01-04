// contracts/Cryptopunks.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Tiger2022 is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => bool) _avatarExists;

    constructor() ERC721("Tiger2022", "TIGER") {}

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function Claim(string memory _tokenURI) public returns (uint256) {
        require(!_avatarExists[_tokenURI]);

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        _avatarExists[_tokenURI] = true;

        return newItemId;
    }

    function getExists(string memory _tokenURI) public view returns (bool) {
        return _avatarExists[_tokenURI];
    }

}