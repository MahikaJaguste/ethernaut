// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MagicNum {

  address public solver;

  constructor() {}

  function setSolver(address _solver) public {
    solver = _solver;
  }

  /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}

contract TestMagicNum {

    event Log(address indexed addr);

    function deploy() external {
		bytes memory bytecode = hex"69602a60005260206000f3600052600a6016f3";
		address addr;
		assembly {
				addr := create(0, add(bytecode, 0x20), 0x13)
		}
		require(addr != address(0), "error in deployment");
        console.log(addr);
		emit Log(addr);
    }
}

interface ITestMagicSolver {
    function getMeaningOfLife() external view returns (uint);
}