pragma solidity ^0.4.10;
contract Ownable {
    address owner;
    constructor() public {
        owner = msg.sender;
    }
    
    // access modifier
    modifier Owned {
        require(msg.sender == owner);
        _;
    }
}

contract Mortal is Ownable{
    function kill() public Owned{
        selfdestruct(owner);
    }
}

contract Donate is Mortal {
    string doner;
    string prize;
    mapping(address => uint256) public balanceOf;
    
    event donation_made(uint _amount);
    event show_message_from_doner(string _message);
    event show_prize(string _prize);
    
    constructor(string _prize) payable public {
        require(bytes(_prize).length > 0);
        balanceOf[address(this)] = msg.value;
        prize = _prize;
    }
    
    function() public{
        // fallback
        revert();
    }
    
    function make_donation(string _message) payable public {
        uint donation = msg.value;
        require(donation > 0);
        if(bytes(_message).length > 0){
            emit show_message_from_doner(_message);
        }
    
        balanceOf[address(this)] += msg.value;
        emit donation_made(donation);
        emit show_prize(prize);
        
    }
    
    function checkContractBalance() Owned public view returns(uint) {
        return balanceOf[address(this)];
    }
    
}