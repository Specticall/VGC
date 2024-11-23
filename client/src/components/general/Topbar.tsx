export default function Topbar() {
  return (
    <nav className="text-light grid grid-cols-[auto_1fr_auto] px-8 py-3 gap-4 items-center bg-primary border-b border-border">
      <h1>Dashboard</h1>
      <p className="justify-self-end">Welcome, Joseph</p>
      <div className="w-12 aspect-square rounded-full bg-gray"></div>
    </nav>
  );
}
