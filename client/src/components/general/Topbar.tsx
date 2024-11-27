import useUserQuery from "@/hooks/queries/useUserQuery";

export default function Topbar() {
  const { userData } = useUserQuery();

  return (
    <nav className="text-light grid grid-cols-[auto_1fr_auto] px-8 py-3 gap-4 items-center bg-primary border-b border-border">
      <h1>Dashboard</h1>
      <p className="justify-self-end">Welcome, {userData?.Name}</p>
      <img
        src={userData?.ProfilePicture}
        className="w-12 aspect-square rounded-full "
      ></img>
    </nav>
  );
}
