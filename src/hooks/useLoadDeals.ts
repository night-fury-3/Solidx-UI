import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import useDealContract from "./useDealContract";
import { Deal } from "types/deal.type";

function useLoadDeals(isOpened: boolean, totalCount: number) {
  const { getDealsBatch } = useDealContract();
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const _isLoading = useRef<boolean>(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [batchSize, setBatchSize] = useState<number>(5);
  const [_, startTransition] = useTransition();

  useEffect(() => {
    setLastIndex(0);
    startTransition(() => toggleLoading(false));
    _isLoading.current = false;
    setDeals([]);
  }, [totalCount]);

  const loadNext = useCallback(async () => {
    if (!_isLoading.current && lastIndex < totalCount) {
      try {
        startTransition(() => toggleLoading(true));
        _isLoading.current = true;

        const res = (await getDealsBatch(lastIndex, batchSize, isOpened)) as never[];
        setDeals((state) => [...state, ...(res[0] as Deal[])]);
        setLastIndex(Number(res[1]));
      } catch (error) {
        console.log(error);
      } finally {
        startTransition(() => toggleLoading(false));
        _isLoading.current = false;
      }
    }
  }, [batchSize, getDealsBatch, isOpened, lastIndex, totalCount]);

  return { lastIndex, isLoading, deals, batchSize, setBatchSize, loadNext };
}

export default useLoadDeals;
