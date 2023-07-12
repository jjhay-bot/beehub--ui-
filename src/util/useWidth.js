import { useLayoutEffect, useState } from "react";

export function useWidth() {
  const [size, setSize] = useState([null, null]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return { width: size[0], height: size[0] };
}
