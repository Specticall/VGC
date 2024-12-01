type Props = {
  title?: string;
  searchBar?: boolean;
};

export default function Topbar({ title, searchBar }: Props) {
  return (
    <nav className="text-light grid grid-cols-[auto_1fr_auto] px-8 py-3 gap-4 items-center bg-primary border-b border-border">
      <h1>{title}</h1>
      {searchBar ? (
        <div className="relative max-w-fit">
          <div className="flex items-center border border-border rounded-md bg-primary relative">
            <i className="absolute left-3 bx bx-search text-2xl"></i>
            <input
              type="text"
              placeholder="Search Movies"
              className="pl-10 pr-16 py-3 bg-transparent w-full text-light"
            />
            <p className="absolute right-3 text-sm text-white border-border border-2 p-[5px] rounded bg-secondary">
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
