import useUserQuery from "@/hooks/queries/useUserQuery";
import SearchPopup from "./SearchPopup";

type Props = {
  searchBar?: boolean;
};

export default function Topbar({ searchBar }: Props) {
  const { userData } = useUserQuery();
  return (
    <nav className="text-light grid grid-cols-[auto_1fr] px-8 py-3 items-center bg-primary border-b border-border">
      {searchBar && <SearchPopup />}
      <div className="flex justify-self-end items-center gap-4">
        <p className="justify-self-end">Welcome, Joseph</p>
        <img
          src={userData?.ProfilePicture}
          className="w-12 aspect-square rounded-full bg-gray"
        ></img>
      </div>
    </nav>
  );
}
