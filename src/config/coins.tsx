import { Coin } from "types/coin.type";

import { zeroAddress } from "viem";

export const coins: { [key: number]: Coin[] } = {
  1: [
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      address: zeroAddress
    }
    // {
    //   address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    //   name: "Tether USDt",
    //   symbol: "USDT"
    // }
  ],
  56: [
    {
      id: "binancecoin",
      symbol: "bnb",
      name: "BNB",
      icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
      address: zeroAddress
    }
    // {
    //   address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    //   name: "Tether USDt",
    //   symbol: "USDT"
    // }
  ],
  97: [
    {
      address: zeroAddress,
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      name: "Ethereum",
      symbol: "ETH"
    },
    {
      address: "0x9c286A916A5738C67411869E2aC6148cAF65E227",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      name: "USDC",
      symbol: "USDC"
    },
    {
      address: "0x89a4152Cd611b8A84F4D7DB2Da16C08cf306268d",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      name: "Tether USDt",
      symbol: "USDT"
    }
  ],
  11155111: [
    // {
    //   address: zeroAddress,
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    //   name: "Ethereum",
    //   symbol: "ETH"
    // },
    // {
    //   address: "0x465b4C99f7A2D8Bc57ec7d8d06531852E8C310Ba",
    //   icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    //   name: "USDC",
    //   symbol: "USDC"
    // }
  ]
};
