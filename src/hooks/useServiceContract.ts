import { useCallback } from "react";

import { waitForTransaction, readContract, writeContract } from "@wagmi/core";

import { useAccount, useChainId } from "wagmi";
import { zeroAddress } from "viem";

import { serviceContractAddress } from "config";
import AbiService from "config/AbiService";

function useServiceContract() {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const getFeeAmount = useCallback(
    async ({ address, amount }: { address?: string; amount: bigint }) => {
      if (address !== undefined) {
        return (await readContract({
          address: serviceContractAddress[chainId],
          abi: AbiService,
          functionName: "getFeeAmount",
          args: [address, amount],
          account
        })) as bigint;
      } else {
        return (await readContract({
          address: serviceContractAddress[chainId],
          abi: AbiService,
          functionName: "getFeeAmount",
          args: [amount]
        })) as bigint;
      }
    },
    [account, chainId]
  );

  const getServiceInfo = useCallback(
    async (_dealHash: string) => {
      return await readContract({
        address: serviceContractAddress[chainId],
        abi: AbiService,
        functionName: "serviceAt",
        args: [_dealHash],
        account
      });
    },
    [account, chainId]
  );

  const createDeal = useCallback(
    async (
      isSelling: boolean,
      caption: string,
      numberOfMilestones: number,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      milestones: any[],
      partner: string,
      paymentToken: string
    ) => {
      let _amount = 0;
      milestones.forEach((milestone) => (_amount += milestone.amount));

      const { hash } = await writeContract({
        abi: AbiService,
        address: serviceContractAddress[chainId],
        functionName: "createDeal",
        args: [isSelling, caption, numberOfMilestones, milestones, partner, paymentToken],
        value:
          !isSelling && paymentToken === zeroAddress ? (_amount as unknown as bigint) : BigInt(0)
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const joinDeal = useCallback(
    async (dealId: string, value?: bigint) => {
      const { hash } = await writeContract({
        abi: AbiService,
        address: serviceContractAddress[chainId],
        functionName: "joinDeal",
        args: [dealId],
        value
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const approveMilestone = useCallback(
    async (dealId: string, index: number) => {
      const { hash } = await writeContract({
        abi: AbiService,
        address: serviceContractAddress[chainId],
        functionName: "approveMilestone",
        args: [dealId, index]
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const cancelDeal = useCallback(
    async (dealId: string) => {
      const { hash } = await writeContract({
        abi: AbiService,
        address: serviceContractAddress[chainId],
        functionName: "cancelDeal",
        args: [dealId]
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const approveCanncel = useCallback(
    async (dealId: string) => {
      const { hash } = await writeContract({
        abi: AbiService,
        address: serviceContractAddress[chainId],
        functionName: "approveCanncel",
        args: [dealId]
      });
      return await waitForTransaction({ hash });
    },
    [chainId]
  );

  const getServicesCount = useCallback(async () => {
    return Number(
      await readContract({
        address: serviceContractAddress[chainId],
        abi: AbiService,
        functionName: "serviceCounts",
        account
      })
    );
  }, [account, chainId]);

  const getServicesBatch = useCallback(
    async (from: number, batchSize: number, isOpened: boolean) => {
      return await readContract({
        address: serviceContractAddress[chainId],
        abi: AbiService,
        functionName: "serviceInfoBatch",
        args: [from, batchSize, !isOpened],
        account
      });
    },
    [account, chainId]
  );

  return {
    cancelDeal,
    createDeal,
    approveCanncel,
    approveMilestone,
    getFeeAmount,
    getServiceInfo,
    getServicesBatch,
    getServicesCount,
    joinDeal
  };
}

export default useServiceContract;
