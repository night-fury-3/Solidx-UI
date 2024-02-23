export const walletconnectProjectID = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || "";

export const WETH = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
export const SDX = "0xfd719FB632Dd6681f94428D8C52692EBbC9C0E07"; // mainnet: 0x072382557067B36966dAB6f5FB90Be32C2dA07Eb

export const dealContractAddress: { [key: number]: `0x${string}` } = {
  1: "0x",
  56: "0x",
  97: "0x7517b23286F8a4AF1a4a06dE99CE2F190044AF45",
  11155111: "0xd30A75dBBf8A0Cfa8294DF3F4089a9d9D464fff3"
};

export const serviceContractAddress: Record<number, `0x${string}`> = {
  1: "0x",
  56: "0x",
  97: "0x005d29ab0B0FdD44bBc8fA2Aa4d7Fc6405543f90",
  11155111: "0xa540D8224aa8f18AB2C59DE7FD35444F504D0675"
};
