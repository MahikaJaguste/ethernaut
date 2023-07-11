// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Switch {
    bool public switchOn; // switch is off
    bytes4 public offSelector = bytes4(keccak256("turnSwitchOff()"));

     modifier onlyThis() {
        require(msg.sender == address(this), "Only the contract can call this");
        _;
    }

    modifier onlyOff() {
        // we use a complex data type to put in memory
        bytes32[1] memory selector;
        // check that the calldata at position 68 (location of _data)
        assembly {
            calldatacopy(selector, 68, 4) // grab function selector from calldata
        }
        require(
            selector[0] == offSelector,
            "Can only call the turnOffSwitch function"
        );
        _;
    }

    function flipSwitch(bytes memory _data) public onlyOff {
        (bool success, ) = address(this).call(_data);
        require(success, "call failed :(");
    }

    function turnSwitchOn() public onlyThis {
        switchOn = true;
    }

    function turnSwitchOff() public onlyThis {
        switchOn = false;
    }

}

contract TestSwitch {

    struct CreateOrderAddressParams {
        address a;
        address b;
        address[] c;
    }

    struct CreateOrderNumberParams {
        uint256 d;
        uint256 e;
        uint256 f;
    }

    struct CreateOrder {
        CreateOrderAddressParams addressParams;
        CreateOrderNumberParams numberParams;
        uint256 g;
        bool h;
    }

    function testEmptyParams() public pure returns (bytes memory) {
        CreateOrder memory order;
        bytes memory data = abi.encode(order);
        return data;
    }

    function testFilledParams() public pure returns (bytes memory) {
        CreateOrder memory order;
        address[] memory c = new address[](2);
        c[0] = address(3);
        c[1] = address(4);
        order.addressParams = CreateOrderAddressParams(
            address(1),
            address(2),
            c
        );
        order.numberParams = CreateOrderNumberParams(5, 6, 7);
        order.g = 8;
        order.h = true;
        bytes memory data = abi.encode(order);
        return data;
    }

}