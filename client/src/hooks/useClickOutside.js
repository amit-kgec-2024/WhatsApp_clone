import { useEffect, useCallback } from "react";

function useClickOutside(refs, callback) {
  const handleClickOutside = useCallback(
    (event) => {
      for (let currRef of refs) {
        if (currRef.current && currRef.current.contains(event.target)) {
          return;
        }
      }
      callback();
    },
    [refs, callback]
  );

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClickOutside]);
}

export default useClickOutside;
