export default [
  {
    inputs: [
      {
        internalType: "address",
        name: "usdc_",
        type: "address"
      },
      {
        internalType: "contract IERC20",
        name: "feeToken_",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "ApproveDeal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "canceller_",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "CancelDeal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "creator_",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "CreateDeal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "partner_",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "JoinDeal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive",
    payable: true
  },
  {
    inputs: [],
    name: "feeToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [],
    name: "minimumFeeAmountInUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [],
    name: "maximumFeeAmountInUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "origin",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "getFeeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [],
    name: "dealDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [],
    name: "dealCounts",
    outputs: [
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index_",
        type: "uint256"
      }
    ],
    name: "dealIdAt",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "dealAt",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
          },
          {
            internalType: "address",
            name: "creator",
            type: "address"
          },
          {
            internalType: "address",
            name: "partner",
            type: "address"
          },
          {
            internalType: "address",
            name: "sellingToken",
            type: "address"
          },
          {
            internalType: "address",
            name: "buyingToken",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "sellingAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "buyingAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256"
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8"
          }
        ],
        internalType: "struct DealContract.Deal",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from_",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "count_",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "status_",
        type: "bool"
      }
    ],
    name: "dealIds",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]"
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from_",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "count_",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "status_",
        type: "bool"
      }
    ],
    name: "dealInfoBatch",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
          },
          {
            internalType: "address",
            name: "creator",
            type: "address"
          },
          {
            internalType: "address",
            name: "partner",
            type: "address"
          },
          {
            internalType: "address",
            name: "sellingToken",
            type: "address"
          },
          {
            internalType: "address",
            name: "buyingToken",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "sellingAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "buyingAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256"
          },
          {
            internalType: "uint8",
            name: "status",
            type: "uint8"
          }
        ],
        internalType: "struct DealContract.Deal[]",
        name: "",
        type: "tuple[]"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
    constant: true
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeToken_",
        type: "address"
      }
    ],
    name: "setFeeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "feeAmount_",
        type: "uint256"
      }
    ],
    name: "setMinimumFeeAmountInUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "feeAmount_",
        type: "uint256"
      }
    ],
    name: "setMaximumFeeAmountInUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "durationHours_",
        type: "uint256"
      }
    ],
    name: "setDealDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint24",
        name: "feePercentage_",
        type: "uint24"
      }
    ],
    name: "setFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partner_",
        type: "address"
      },
      {
        internalType: "address",
        name: "sellingToken_",
        type: "address"
      },
      {
        internalType: "address",
        name: "buyingToken_",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "sellingAmount_",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "buyingAmount_",
        type: "uint256"
      }
    ],
    name: "createDeal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "joinDeal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "approveDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "cancelDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
