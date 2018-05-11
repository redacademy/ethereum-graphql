const address = "0x950f2569af9751a2cf10c55e0486832223fd3b3d"; // contract address
const ABI = [
  // ABI from Remix
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "donation_made",
    type: "event"
  },
  {
    constant: false,
    inputs: [],
    name: "kill",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_message",
        type: "string"
      }
    ],
    name: "make_donation",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_message",
        type: "string"
      }
    ],
    name: "show_message_from_doner",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "_prize",
        type: "string"
      }
    ],
    name: "show_prize",
    type: "event"
  },
  {
    payable: false,
    stateMutability: "nonpayable",
    type: "fallback"
  },
  {
    inputs: [
      {
        name: "_prize",
        type: "string"
      }
    ],
    payable: true,
    stateMutability: "payable",
    type: "constructor"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "checkContractBalance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
module.exports = { ABI, address };
