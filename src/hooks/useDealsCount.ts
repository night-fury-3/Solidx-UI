import { useEffect, useState, useTransition } from "react";
import useDealContract from "./useDealContract";
import { useAccount } from "wagmi";

function useDealsCount() {
  const { isConnected } = useAccount();
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const { getDealsCount } = useDealContract();
  const [count, setCount] = useState<number>(0);
  const [_, startTransition] = useTransition();

  useEffect(() => {
    const init = async () => {
      try {
        toggleLoading(true);
        const _count = await getDealsCount();
        setCount(_count);
      } catch (error) {
        console.log(error);
      } finally {
        startTransition(() => toggleLoading(false));
      }
    };

    if (isConnected) {
      init();
    }
  }, [getDealsCount, isConnected]);

  return { isLoading, count };
}

export default useDealsCount;
