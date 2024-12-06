// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract IterMapping {
  mapping(string _name => uint _age) public ages;
  string[] public keys;
  mapping(string _key => bool isSet) public isInserted;

  function set(string memory _name, uint256 _age) public {
    ages[_name] = _age;
    if(!isInserted[_name]) {
      isInserted[_name] = true;
      keys.push(_name);
    }
  }

  function length() public view returns(uint) {
    return keys.length;
  }

  function get(uint _index) public view returns(uint) {
    return ages[keys[_index]];
  }

  function values() public view returns(uint[] memory) {
    uint[] memory values = new uint[](keys.length);

    for(uint i = 0; i < keys.length; i++) {
      values[i] = ages[keys[i]];
    }
    return values;
  }

}