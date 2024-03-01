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
        internalType: "address",
        name: "seller_",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "AchieveDeal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller_",
        type: "address"
      },
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
        name: "buyer_",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "milestoneIndex_",
        type: "uint256"
      }
    ],
    name: "ApproveMilestone",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller_",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "approveCanncel",
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
      },
      {
        internalType: "uint256",
        name: "milestoneIndex_",
        type: "uint256"
      }
    ],
    name: "approveMilestone",
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
    name: "cancelByAdmin",
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
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "isSelling_",
        type: "bool"
      },
      {
        internalType: "string",
        name: "caption_",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "numberOfMilestones_",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "description",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256"
          }
        ],
        internalType: "struct ServiceEscrow.Milestone[]",
        name: "milestones_",
        type: "tuple[]"
      },
      {
        internalType: "address",
        name: "partner_",
        type: "address"
      },
      {
        internalType: "address",
        name: "paymentToken_",
        type: "address"
      }
    ],
    name: "createDeal",
    outputs: [],
    stateMutability: "payable",
    type: "function"
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
    type: "function"
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
    name: "joinDeal",
    outputs: [],
    stateMutability: "payable",
    type: "function"
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
    type: "function"
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
    type: "function"
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
    type: "function"
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
        internalType: "bytes32",
        name: "dealId_",
        type: "bytes32"
      }
    ],
    name: "serviceAt",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
          },
          {
            internalType: "bool",
            name: "isSelling",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "serviceCaption",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "numberOfMilestones",
            type: "uint256"
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string"
              },
              {
                internalType: "string",
                name: "description",
                type: "string"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "status",
                type: "uint256"
              }
            ],
            internalType: "struct ServiceEscrow.Milestone[]",
            name: "milestones",
            type: "tuple[]"
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256"
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
            name: "paymentToken",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "totalBudget",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "paidBudget",
            type: "uint256"
          },
          {
            internalType: "bool",
            name: "isCreatorApprovedCancel",
            type: "bool"
          },
          {
            internalType: "bool",
            name: "isPartnerApprovedCancel",
            type: "bool"
          }
        ],
        internalType: "struct ServiceEscrow.Service",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "serviceCounts",
    outputs: [
      {
        internalType: "uint256",
        name: "_count",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index_",
        type: "uint256"
      }
    ],
    name: "serviceIdAt",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
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
    name: "serviceIds",
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
    type: "function"
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
    name: "serviceInfoBatch",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
          },
          {
            internalType: "bool",
            name: "isSelling",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "serviceCaption",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "numberOfMilestones",
            type: "uint256"
          },
          {
            components: [
              {
                internalType: "string",
                name: "name",
                type: "string"
              },
              {
                internalType: "string",
                name: "description",
                type: "string"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "status",
                type: "uint256"
              }
            ],
            internalType: "struct ServiceEscrow.Milestone[]",
            name: "milestones",
            type: "tuple[]"
          },
          {
            internalType: "uint256",
            name: "status",
            type: "uint256"
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
            name: "paymentToken",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "totalBudget",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "paidBudget",
            type: "uint256"
          },
          {
            internalType: "bool",
            name: "isCreatorApprovedCancel",
            type: "bool"
          },
          {
            internalType: "bool",
            name: "isPartnerApprovedCancel",
            type: "bool"
          }
        ],
        internalType: "struct ServiceEscrow.Service[]",
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
    name: "setMaximumFeeAmountInUSD",
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
    inputs: [],
    name: "withdrawFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];
