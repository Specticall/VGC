import { Outlet } from "react-router-dom";
import Sidebar from "@/components/general/Sidebar";
import Topbar from "@/components/general/Topbar";
import useToggleState from "@/hooks/useToggleState";
import { cn } from "@/lib/utils";

export default function AppLayout() {
  const [isOpen, toggleIsOpen] = useToggleState(true);
  return (
    <div
      className={cn(
        "min-h-screen grid transition-[grid-template-columns] duration-500 overflow-hidden",
        isOpen ? " grid-cols-[17.5rem_1fr]" : "grid-cols-[0rem_1fr]"
      )}
    >
      <Sidebar isOpen={isOpen} onClose={toggleIsOpen} />
      <div className="flex flex-col ">
        {/* <Topbar /> */}
        <main className="flex-1 flex flex-col w-full relative">
          <div className="flex column absolute inset-0 overflow-auto">
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
