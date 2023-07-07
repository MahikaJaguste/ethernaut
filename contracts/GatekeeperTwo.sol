// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract GatekeeperTwo {

    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        uint x;
        assembly { 
            x := extcodesize(caller()) 
        }
        require(x == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == type(uint64).max);
        _;
    }

    function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}

contract TestGatekeeperTwo {
    GatekeeperTwo g;
    constructor(address _gatekeeperAddr) {
        g = GatekeeperTwo(_gatekeeperAddr);
        bytes8 _gateKey = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max);
        g.enter(_gateKey);
    }
}

contract BeingCalled {
    address public callerValue;
  
    function testCaller() public {
        address c;
        assembly { c := caller() }
        callerValue = c;
    }
}
  
contract DelegatorCaller {
    address public callerValue;

    function testDelegatecall(address _c) public returns (bool) {
        (bool success,) = _c.delegatecall(
            abi.encodeWithSignature("testCaller()")
        );
        return success;
    }

    function testCall(address _c) public returns(bool) {
        (bool success,) = _c.call(
            abi.encodeWithSignature("testCaller()")
        );
        return success;
    }

}