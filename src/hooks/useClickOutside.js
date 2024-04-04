import { useEffect } from "react";

function useClickOutside(refs, callback) {
  console.log("search-ref: ", refs[1]);
  console.log("input-ref: ", refs[0]);
  const handleClickOutside = (event) => {
    for (let currRef of refs) {
      // if (!currRef || !currRef.current) return;
      if (currRef.current && currRef.current.contains(event.target)) {
        return;
      }
    }
    callback();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, []);
}

export default useClickOutside;
