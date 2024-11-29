import {
  ChangeEvent,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";
import Input from "../ui/Input";
import useActorsQuery from "@/hooks/queries/useActorsQuery";
import Skeleton from "react-loading-skeleton";

type Props = {
  onSelect: (actorIds: string[]) => void;
  value: string[];
};

export default function MovieActorInput({
  onSelect,
  value,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const {
    actorsData,
    actorsQuery: { isLoading: isLoadingActors },
  } = useActorsQuery();
  const elRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [actors, setActors] = useState<string[]>([]);

  const usedValue = typeof value !== "undefined" ? value : actors;

  // Searched actor
  const queriedActorData = actorsData?.filter((data) =>
    data.Name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedActors = useMemo(() => {
    return actorsData?.filter((actor) => usedValue.includes(actor.CastId));
  }, [usedValue, actorsData]);

  // Handle closing on click outside
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        !elRef.current?.contains(e.target as HTMLElement) &&
        !triggerRef.current?.contains(e.target as HTMLElement)
      ) {
        setShow(false);
      }
    };

    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  return (
    <div
      {...props}
      className={cn("relative flex gap-6 w-full", props.className)}
    >
      <div
        ref={elRef}
        className={cn(
          "grid bg-primary border border-border rounded-md w-full bottom-[7rem] z-20 absolute left-0 right-0 shadow-lg transition invisible opacity-0 scale-[97.5%] shadow-secondary",
          show && "scale-100 visible opacity-100"
        )}
      >
        <p className="text-light mb-4 border-b border-border p-4">
          Select Actor
        </p>
        <Input
          placeholder="Search Actor"
          className="[&_input]:py-3 mb-4 px-4"
          onChange={(e) =>
            setSearch((e as ChangeEvent<HTMLInputElement>).target.value)
          }
          value={search}
        />

        <ul className="h-[15rem] flex flex-col gap-2 overflow-y-auto">
          {isLoadingActors &&
            new Array(5).fill("x").map((_, i) => {
              return (
                <div className="px-4" key={i}>
                  <Skeleton key={i} className="py-2" />
                </div>
              );
            })}
          {queriedActorData?.map((actor, i) => {
            return (
              <li
                key={i}
                className={cn(
                  "flex items-center gap-4 px-4 py-2 mx-4 hover:bg-secondary/70 transition cursor-pointer rounded-md active:bg-gray/20",
                  usedValue.includes(actor.CastId) && "bg-secondary"
                )}
                onClick={() => {
                  let newValue;
                  if (usedValue.includes(actor.CastId)) {
                    newValue = usedValue.filter(
                      (item) => item !== actor.CastId
                    );
                  } else {
                    newValue = [...usedValue, actor.CastId];
                  }
                  setActors(newValue);
                  onSelect(newValue);
                }}
              >
                <img
                  src={actor.Image || ""}
                  className="w-8 aspect-square rounded-full object-cover border border-border"
                />
                <p className="text-light">{actor.Name}</p>
              </li>
            );
          })}
          {queriedActorData?.length === 0 && (
            <p className="text-light px-4 py-6 text-center h-[15rem] flex items-center justify-center">
              No Actor Found
            </p>
          )}
        </ul>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,3.5rem)] gap-8 w-full">
        {selectedActors?.map((actor) => {
          return (
            <div
              key={actor.CastId}
              className="flex items-center gap-3 flex-col justify-center cursor-pointer transition group"
              onClick={() => {
                const newValue = usedValue.filter(
                  (item) => item !== actor.CastId
                );
                setActors(newValue);
                onSelect(newValue);
              }}
            >
              <div className="relative">
                <img
                  src={actor.Image || ""}
                  className="group-hover:opacity-50 w-14 h-14 rounded-full object-cover transition"
                  alt=""
                />
                <i className="bx opacity-0 group-hover:opacity-100 transition text-3xl bx-x text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></i>
              </div>
              <p className="text-light group-hover:opacity-50 text-paragraph text-center transition">
                {actor.Name}
              </p>
            </div>
          );
        })}
        <div
          className="flex items-center gap-3 flex-col justify-center hover:opacity-50 cursor-pointer transition"
          ref={triggerRef}
          onClick={() => {
            setShow(true);
          }}
        >
          <div className="relative border-2 border-light border-dashed rounded-full bg-primary w-14 h-14  flex items-center justify-center">
            <i className="bx bx-plus text-light text-3xl"></i>
          </div>
          <p className="text-white text-paragraph whitespace-nowrap">
            Add Actor
          </p>
        </div>
      </div>
    </div>
  );
}
