import { useCallback } from "react";

import { waitForTransaction, readContract, writeContract } from "@wagmi/core";

import { useAccount, useChainId } from "wagmi";
import { zeroAddress } from "viem";

import { dealContractAddress } from "config";
import AbiDeal from "config/AbiDeal";

function useDealContract() {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const getFeeAmount = useCallback(
    async ({ address, amount }: { address?: string; amount: bigint }) => {
      if (address !== undefined) {
        return (await readContract({
          address: dealContractAddress[chainId],
          abi: AbiDeal,
          functionName: "getFeeAmount",
          args: [address, amount]
        })) as bigint;
      } else {
        return (await readContract({
          address: dealContractAddress[chainId],
          abi: AbiDeal,
          functionName: "getFeeAmount",
          args: [amount]
        })) as bigint;
      }
    },
    [chainId]
  );

  const getUSDCfromSOLIDX = useCallback(async () => {
    return (await readContract({
      address: dealContractAddress[chainId],
      abi: AbiDeal,
      functionName: "getUSDCfromSOLIDX",
      args: []
    })) as bigint;
  }, [chainId]);

  const getDealInfo = useCallback(
    async (dealHash: string) => {
      return await readContract({
        address: dealContractAddress[chainId],
        abi: AbiDeal,
        functionName: "dealAt",
        args: [dealHash],
        account
      });
    },
    [account, chainId]
  );

  const getDealDuration = useCallback(async () => {
    return await readContract({
      address: dealContractAddress[chainId],
      abi: AbiDeal,
      functionName: "dealDuration"
    });
  }, [chainId]);

  const getDealsCount = useCallback(async () => {
    return Number(
      await readContract({
        address: dealContractAddress[chainId],
        abi: AbiDeal,
        functionName: "dealCounts",
        account
      })
    );
  }, [account, chainId]);

  const getDealHashAt = useCallback(
    async (user: string, index: number) => {
      return await readContract({
        address: dealContractAddress[chainId],
        abi: AbiDeal,
        functionName: "dealForWalletAt",
        args: [user, index]
      });
    },
    [chainId]
  );

  const createDeal = useCallback(
    async (
      partnerAddress: string,
      sellingToken: string,
      buyingToken: string,
      sellingAmount: bigint,
      buyingAmount: bigint
    ) => {
      const { hash } = await writeContract({
        abi: AbiDeal,
        address: dealContractAddress[chainId],
        functionName: "createDeal",
        args: [partnerAddress, sellingToken, buyingToken, sellingAmount, buyingAmount],
        value: sellingToken === zeroAddress ? sellingAmount : BigInt(0)
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const joinDeal = useCallback(
    async (dealId: string, value?: bigint) => {
      const { hash } = await writeContract({
        abi: AbiDeal,
        address: dealContractAddress[chainId],
        functionName: "joinDeal",
        args: [dealId],
        value
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const approveDeal = useCallback(
    async (dealId: string) => {
      const { hash } = await writeContract({
        abi: AbiDeal,
        address: dealContractAddress[chainId],
        functionName: "approveDeal",
        args: [dealId]
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const cancelDeal = useCallback(
    async (dealId: string) => {
      const { hash } = await writeContract({
        abi: AbiDeal,
        address: dealContractAddress[chainId],
        functionName: "cancelDeal",
        args: [dealId]
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const getDealsBatch = useCallback(
    async (from: number, batchSize: number, isOpened: boolean) => {
      return await readContract({
        address: dealContractAddress[chainId],
        abi: AbiDeal,
        functionName: "dealInfoBatch",
        args: [from, batchSize, !isOpened],
        account
      });
    },
    [account, chainId]
  );

  return {
    getFeeAmount,
    getUSDCfromSOLIDX,
    approveDeal,
    cancelDeal,
    createDeal,
    getDealsBatch,
    getDealsCount,
    getDealDuration,
    getDealHashAt,
    getDealInfo,
    joinDeal
  };
}

export default useDealContract;
