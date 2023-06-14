import React from "react";

function computeColumnsFromWidth(width: number) {
  if (width <= 300) return 1;
  if (width <= 600) return 2;
  if (width <= 900) return 3;
  return 4;
}

export default function useResponsiveColumns() {
  const [nbColumns, setNbColumns] = React.useState(4);

  const user = React.useMemo(
    () => ({
      name: nbColumns % 2 === 0 ? "Julien" : "Michael",
      age: 20,
      address: "Paris",
    }),
    [nbColumns]
  );

  React.useEffect(() => {
    const handleResize = () => {
      const newNbColumns = computeColumnsFromWidth(window.innerWidth);
      console.log(`Hello ${user.name}, columns: ${newNbColumns} !`);
      setNbColumns(newNbColumns);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  return nbColumns;
}
