type Props = {
  title?: string;
  searchBar?: boolean;
};

export default function Topbar({ title, searchBar }: Props) {
  return (
    <nav className="text-light grid grid-cols-[auto_1fr_auto] px-8 py-3 items-center bg-primary border-b border-border">
      <h1>{title}</h1>
      {searchBar ? (
        <div className="max-w-fit ">
          <div className="flex items-center border [&:has(.searchbar-top:focus)]:border-accent border-border rounded-md bg-primary relative justify-between px-4 py-2">
            <div className="flex items-center gap-3">
              <i className="bx bx-search text-2xl"></i>
              <input
                type="text"
                placeholder="Search Movies"
                className="bg-transparent w-full text-light focus:outline-none searchbar-top"
              />
            </div>
            <p className="text-sm text-white border-border border-2 px-3 py-2 rounded bg-secondary">
              CTRL + K
            </p>
          </div>
        </div>
      ) : (
        <p className="justify-self-end">Welcome, Joseph</p>
      )}
      <div className="w-12 aspect-square rounded-full bg-gray"></div>
    </nav>
  );
}
