// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MetaVaultKYC {

    struct Record {
        string cid;
        uint256 timestamp;
    }

    mapping(address => Record) public kycRecords;

    event KYCUploaded(address indexed user, string cid, uint256 timestamp);

    constructor() {}

    function uploadKYC(string memory cid) public {
        kycRecords[msg.sender] = Record(cid, block.timestamp);
        emit KYCUploaded(msg.sender, cid, block.timestamp);
    }

    function getKYC(address user) public view returns (string memory, uint256) {
        return (kycRecords[user].cid, kycRecords[user].timestamp);
    }
}
