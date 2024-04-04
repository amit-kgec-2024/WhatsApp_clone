import { useEffect } from "react";

function useClickOutside(refs, callback) {
  const handleClickOutside = (event) => {
    for (let currRef of refs) {
      if (currRef.current && currRef.current.contains(event.target)) {
        return;
      }
    }
    callback();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, [refs]);
}

export default useClickOutside;
