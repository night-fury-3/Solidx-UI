export const walletconnectProjectID = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || "";

export const WETH = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const SDX = "0xA76A6cC7fa9ab055b6101d443FD975520eb8cC75"; // !!! bscscan

export const dealContractAddress: { [key: number]: `0x${string}` } = {
  1: "0x",
  56: "0xa6e1afEa442cc0437eCeF89E70a5A3A8188E17dC", // ???
  97: "0x7517b23286F8a4AF1a4a06dE99CE2F190044AF45",
  11155111: "0xd30A75dBBf8A0Cfa8294DF3F4089a9d9D464fff3"
};

export const serviceContractAddress: Record<number, `0x${string}`> = {
  1: "0x",
  56: "0x51FAeFEdD3436D31d62218195c28ccE171a0E0d9", // ???
  97: "0x005d29ab0B0FdD44bBc8fA2Aa4d7Fc6405543f90",
  11155111: "0xa540D8224aa8f18AB2C59DE7FD35444F504D0675"
};
