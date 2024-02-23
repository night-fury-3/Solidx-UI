import { useCallback } from "react";
import { waitForTransaction, readContract, writeContract } from "@wagmi/core";
import { type Address, erc20ABI, readContracts, useChainId } from "wagmi";

import AbiERC20 from "config/AbiERC20";
import { SDX } from "config";

function useTokenInfo() {
  const chainId = useChainId();

  const nameAndSymbol = useCallback(
    async (address: string) => {
      return await readContracts({
        contracts: [
          { abi: erc20ABI, address: address as `0x${string}`, functionName: "symbol", chainId },
          { abi: erc20ABI, address: address as `0x${string}`, functionName: "name", chainId }
        ]
      });
    },
    [chainId]
  );

  const balanceOf = useCallback(async (token: Address, account: Address) => {
    return (await readContract({
      abi: AbiERC20,
      address: token,
      functionName: "balanceOf",
      args: [account]
    })) as bigint;
  }, []);

  const allowance = useCallback(async (address: `0x${string}`, from: string, to: string) => {
    return await readContract({
      abi: AbiERC20,
      address: address,
      functionName: "allowance",
      args: [from, to]
    });
  }, []);

  const decimals = useCallback(async (address: `0x${string}`) => {
    return Number(
      await readContract({
        abi: AbiERC20,
        address: address,
        functionName: "decimals"
      })
    );
  }, []);

  const approve = useCallback(async (token: `0x${string}`, to: string, amount: string) => {
    if (token === SDX) {
      const { hash } = await writeContract({
        abi: AbiERC20,
        address: token,
        functionName: "increaseAllowance",
        args: [to, amount]
      });
      return waitForTransaction({ hash });
    } else {
      const { hash } = await writeContract({
        abi: AbiERC20,
        address: token,
        functionName: "approve",
        args: [to, amount]
      });
      return waitForTransaction({ hash });
    }
  }, []);

  return { balanceOf, decimals, approve, allowance, nameAndSymbol };
}

export default useTokenInfo;
