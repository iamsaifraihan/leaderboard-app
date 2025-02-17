import { useEffect, useState } from "react";

const useThrottle = (value, limit = 300) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastExecute, setLastExecute] = useState(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if ((Date.now() - lastExecute) >= limit) {
        setThrottledValue(value);
        setLastExecute(Date.now())
      }

      return () => clearTimeout(handler)
    }, limit - (Date.now() - lastExecute))
  }, [value, limit, lastExecute])

  return throttledValue
};

export default useThrottle;
