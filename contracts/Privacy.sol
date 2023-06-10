// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Privacy {

    // slot 0
    bool public locked = true;
    // slot 1
    uint256 public ID = block.timestamp;
    // slot 2
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    uint16 private awkwardness = uint16(block.timestamp);
    // slot 3, 4, 5
    bytes32[3] private data;

    constructor(bytes32[3] memory _data) {
        data = _data;
    }
    
    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
        A bunch of super advanced solidity algorithms...

        ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
        .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
        *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
        `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
        ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
    */
}

contract TestPrivacy {

    // slot 0
    bool public locked = true;
    // slot 1
    uint256 public ID = block.timestamp;
    // slot 2
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    uint16 private awkwardness = uint16(block.timestamp);
    // slot 3
    uint8[3] private data;

    constructor(uint8[3] memory _data) {
        data = _data;
    }
    
    function unlock(uint8 _key) public {
        require(_key == data[2]);
        locked = false;
    }

    /*
        A bunch of super advanced solidity algorithms...

        ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
        .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
        *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
        `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
        ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
    */
}