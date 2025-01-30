import { useEffect } from "react";

export const useSidebarBehavior = (
  isOpenSidebar: boolean,
  closeSidebar: () => void,
  windowSize: number
) => {
  useEffect(() => {
    if (windowSize > 500 && isOpenSidebar) {
      closeSidebar();
    }
  }, [windowSize, isOpenSidebar, closeSidebar]);

  useEffect(() => {
    if (isOpenSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpenSidebar]);
};
