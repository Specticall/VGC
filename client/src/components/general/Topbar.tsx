import SearchPopup from "./SearchPopup";

type Props = {
  title?: string;
  searchBar?: boolean;
};

export default function Topbar({ title, searchBar }: Props) {
  return (
    <nav className="text-light grid grid-cols-[auto_1fr_auto] px-8 py-3 items-center bg-primary border-b border-border">
      <h1>{title}</h1>

      {searchBar ? (
        <SearchPopup />
      ) : (
        <p className="justify-self-end">Welcome, Joseph</p>
      )}
      <div className="w-12 aspect-square rounded-full bg-gray"></div>
    </nav>
  );
}
