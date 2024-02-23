import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import useServiceContract from "./useServiceContract";
import { Service } from "types/deal.type";

function useLoadServices(isOpened: boolean, totalCount: number) {
  const { getServicesBatch } = useServiceContract();
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const _isLoading = useRef<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);
  const [batchSize, setBatchSize] = useState<number>(5);
  const [_, startTransition] = useTransition();

  useEffect(() => {
    setLastIndex(0);
    startTransition(() => toggleLoading(false));
    _isLoading.current = false;
    setServices([]);
  }, [totalCount]);

  const loadNext = useCallback(async () => {
    if (!_isLoading.current && lastIndex < totalCount) {
      try {
        startTransition(() => toggleLoading(true));
        _isLoading.current = true;

        const res = (await getServicesBatch(lastIndex, batchSize, isOpened)) as never[];
        setServices((state) => [...state, ...(res[0] as Service[])]);
        setLastIndex(Number(res[1]));
      } catch (error) {
        console.log(error);
      } finally {
        startTransition(() => toggleLoading(false));
        _isLoading.current = false;
      }
    }
  }, [batchSize, getServicesBatch, isOpened, lastIndex, totalCount]);

  return { lastIndex, isLoading, services, batchSize, setBatchSize, loadNext };
}

export default useLoadServices;
