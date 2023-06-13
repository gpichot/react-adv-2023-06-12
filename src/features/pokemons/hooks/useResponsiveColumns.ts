import React from "react";

function computeColumnsFromWidth(width: number) {
  if (width <= 300) return 1;
  if (width <= 600) return 2;
  if (width <= 900) return 3;
  return 4;
}
export default function useResponsiveColumns() {
  const [nbColumns, setNbColumns] = React.useState(() => {
    return computeColumnsFromWidth(window.innerWidth);
  });

  React.useEffect(() => {
    const handleResize = () => {
      const nbColumns = computeColumnsFromWidth(window.innerWidth);
      setNbColumns(nbColumns);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return nbColumns;
}
