pragma solidity ^0.6.0;

import './Location.sol';

contract LocationFactory {
    address public schdAddress;
    mapping(string => Location) public locations;

    constructor(address _schd) public {
      schdAddress = _schd;
    }

    function createLocation(string memory name, string memory locationId) public {
      Location l = new Location(name, locationId, schdAddress);
      locations[locationId] = l;
    }
}
