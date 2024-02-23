import { useEffect, useState, useTransition } from "react";
import useServiceContract from "./useServiceContract";
import { useAccount } from "wagmi";

function useServicesCount() {
  const { isConnected } = useAccount();
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const { getServicesCount } = useServiceContract();
  const [count, setCount] = useState<number>(0);
  const [_, startTransition] = useTransition();

  useEffect(() => {
    const init = async () => {
      try {
        toggleLoading(true);
        const _count = await getServicesCount();
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
  }, [getServicesCount, isConnected]);

  return { isLoading, count };
}

export default useServicesCount;
