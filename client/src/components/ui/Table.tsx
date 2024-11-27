import { ReactNode, createContext, useContext } from "react";

type TableContextValues = {
  cols: string;
};

const TableContext = createContext<TableContextValues | null>(null);

function useTable() {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTable must be used inside of it's Provider's scope");
  return context;
}

function Root({ cols, children }: { children: ReactNode; cols: string }) {
  return (
    <TableContext.Provider value={{ cols }}>
      <div className="">{children}</div>
    </TableContext.Provider>
  );
}
function Head({ children }: { children: ReactNode }) {
  const { cols } = useTable();
  return (
    <ul
      className="grid gap-4 bg-border text-white py-3 px-6 rounded-md"
      style={{
        gridTemplateColumns: cols,
      }}
    >
      {children}
    </ul>
  );
}

function Body({ children }: { children: ReactNode }) {
  const { cols } = useTable();
  return (
    <ul
      className="grid gap-4 px-5 py-4 border-border border-b items-center"
      style={{
        gridTemplateColumns: cols,
      }}
    >
      {children}
    </ul>
  );
}

export default { Root, Head, Body };
