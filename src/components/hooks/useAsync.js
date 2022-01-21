import { useEffect } from "react";

function useAsync(asyncFunction, onSuccess, onFailure) {
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const data = await asyncFunction();
        if (isMounted) onSuccess(data);
      } catch (err) {
        if (isMounted) onFailure(err);
      }
    };

    getData();
    return () => {
      isMounted = false;
    };
  }, [asyncFunction, onSuccess, onFailure]);
}

export default useAsync;
