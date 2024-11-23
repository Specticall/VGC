import { Outlet } from "react-router-dom";
import Sidebar from "../components/general/Sidebar";
import Topbar from "../components/general/Topbar";
import useToggleState from "../hooks/useToggleState";
import { cn } from "../lib/utils";

export default function AppLayout() {
  const [isOpen, toggleIsOpen] = useToggleState(true);
  console.log(isOpen);
  return (
    <div
      className={cn(
        "min-h-screen grid transition-[grid-template-columns] duration-500 overflow-hidden",
        isOpen ? " grid-cols-[17.5rem_1fr]" : "grid-cols-[0rem_1fr]"
      )}
    >
      <Sidebar isOpen={isOpen} onClose={toggleIsOpen} />
      <div className="">
        <Topbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
