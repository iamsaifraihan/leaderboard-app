import { useState } from "react"

const useThrottleFn = (fn, limit = 300) => {
  const [lastExecute, setLastExecute] = useState(Date.now());

  return (...arg) => {
    if ((Date.now() - lastExecute) >= limit) {
      console.log("Throttling....")
      fn(...arg);
      setLastExecute(Date.now())
    }
  }


}

export default useThrottleFn