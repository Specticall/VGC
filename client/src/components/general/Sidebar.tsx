import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { cn } from "../../lib/utils";
import useToggleState from "../../hooks/useToggleState";

const adminMenus = [
  {
    title: "Dashboard",
    icon: "bx-grid-alt",
    redirect: "/dashboard",
  },
  {
    title: "Movies",
    icon: "bx-movie",
    redirect: "/admin-movies",
  },
  {
    title: "Tickets",
    icon: "bxs-discount",
    redirect: "/admin-tickets",
  },
];

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export default function Sidebar({ onClose, isOpen }: Props) {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={cn(
          "fixed left-0 bottom-12 translate-x-[17.5rem] px-4 bg-primary border border-border py-3 rounded-md transition-all duration-500 -z-10",
          isOpen
            ? "translate-x-0 opacity-0"
            : "translate-x-[0rem] z-10 opacity-100"
        )}
      >
        <div>
          <i
            className="bx bx-sidebar text-gray hover:text-white transition cursor-pointer text-2xl"
            onClick={onClose}
          ></i>
        </div>
      </div>
      <nav
        className={cn(
          "bg-primary border-r border-border px-3 py-4 min-w-[17.5rem] flex flex-col transition-transform duration-500",
          isOpen ? "translate-x-0" : "translate-x-[-17.5rem]"
        )}
      >
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div className="flex gap-3 items-center">
            <Logo />
            <p className="font-bold text-white text-2xl">VCG</p>
          </div>
          <i
            className="bx bx-sidebar text-gray hover:text-white transition cursor-pointer text-2xl"
            onClick={onClose}
          ></i>
        </div>
        <p className="pl-3 mt-4 text-gray text-[0.75rem]">MAIN MENU</p>
        <ul className="mt-4 grid gap-2">
          {adminMenus.map((menu, i) => {
            const active = pathname.includes(menu.redirect);
            return (
              <li
                key={i}
                className={cn(
                  "px-3 py-2 rounded-md",
                  active
                    ? "border-accent border bg-accent/10"
                    : "hover:bg-secondary/100 transition cursor-pointer"
                )}
              >
                <Link
                  to={menu.redirect}
                  className={cn(
                    "text-light flex items-center gap-2",
                    active && "text-accent"
                  )}
                >
                  <i className={cn("bx text-2xl ", menu.icon)}></i>
                  <p>{menu.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex-1"></div>
        <p className="pl-3 mt-4 text-gray text-[0.75rem]">OTHER</p>
        <li className={cn("px-3 py-2 mt-1 text-light flex gap-2 items-center")}>
          <i className={cn("bx bx-exit text-2xl ")}></i>
          <p>Log Out</p>
        </li>
      </nav>
    </>
  );
}
