pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

contract PhotographerRole{
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event PhotographerAdded(address indexed account);
    event PhotographerRemoved(address indexed account);

    // Define a struct 'photographer' by inheriting from 'Roles' library, struct Role
    Roles.Role private photographers;

      // In the constructor make the address that deploys this contract the 1st photographer
    constructor() public {
        _addPhotographer(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyPhotographer() {
        require(isPhotographer(msg.sender));
        _;
    }

      // Define a function 'isPhotographer' to check this role
    function isPhotographer(address account) public view returns (bool) {
        return photographers.has(account);
    }

    // Define a function 'addPhotographer' that adds this role
    function addPhotographer(address account) public onlyPhotographer {
        _addPhotographer(account);
    }


    // Define a function 'renouncePhotographer' to renounce this role
    function renouncePhotographer() public {
        _removePhotographer(msg.sender);
    } 

    // Define an internal function '_addPhotographe' to add this role, called by 'addPhotographer'
    function _addPhotographer(address account) internal {
        photographers.add(account);
        emit PhotographerAdded(account);
    }

      // Define an internal function '_removePhotographer' to remove this role, called by 'removePhotographer'
    function _removePhotographer(address account) internal {
        photographers.remove(account);
        emit PhotographerRemoved(account);
    }
}