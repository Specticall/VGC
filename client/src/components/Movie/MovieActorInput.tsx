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

const dummy = [
  {
    castId: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Hero",
    movieId: "m1a2b3c4d-5e6f-7g8h-9i0j",
  },
  {
    castId: "2a3b4c5d-6e7f-8g9h-0i1j-k2l3m4n5o6p7",
    name: "Jane Smith",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Villain",
    movieId: "m1a2b3c4d-5e6f-7g8h-9i0j",
  },
  {
    castId: "3a4b5c6d-7e8f-9g0h-1i2j-k3l4m5n6o7p8",
    name: "Alice Johnson",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Sidekick",
    movieId: "m2a3b4c5d-6e7f-8g9h-0i1j",
  },
  {
    castId: "4a5b6c7d-8e9f-0g1h-2i3j-k4l5m6n7o8p9",
    name: "Bob Brown",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Mentor",
    movieId: "m2a3b4c5d-6e7f-8g9h-0i1j",
  },
  {
    castId: "5a6b7c8d-9e0f-1g2h-3i4j-k5l6m7n8o9p0",
    name: "Charlie Green",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Comic Relief",
    movieId: "m3a4b5c6d-7e8f-9g0h-1i2j",
  },
  {
    castId: "6a7b8c9d-0e1f-2g3h-4i5j-k6l7m8n9o0p1",
    name: "Diana Prince",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Detective",
    movieId: "m3a4b5c6d-7e8f-9g0h-1i2j",
  },
  {
    castId: "7a8b9c0d-1e2f-3g4h-5i6j-k7l8m9n0o1p2",
    name: "Evan Turner",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Henchman",
    movieId: "m4a5b6c7d-8e9f-0g1h-2i3j",
  },
  {
    castId: "8a9b0c1d-2e3f-4g5h-6i7j-k8l9m0n1o2p3",
    name: "Fiona Harris",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Scientist",
    movieId: "m4a5b6c7d-8e9f-0g1h-2i3j",
  },
  {
    castId: "9a0b1c2d-3e4f-5g6h-7i8j-k9l0m1n2o3p4",
    name: "George Lopez",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Villager",
    movieId: "m5a6b7c8d-9e0f-1g2h-3i4j",
  },
  {
    castId: "0a1b2c3d-4e5f-6g7h-8i9j-k0l1m2n3o4p5",
    name: "Helen Carter",
    image:
      "https://images.unsplash.com/photo-1568038479111-87bf80659645?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    character: "Queen",
    movieId: "m5a6b7c8d-9e0f-1g2h-3i4j",
  },
];

type Props = {
  onSelect: (actorIds: string[]) => void;
  value: string[];
};

export default function MovieActorInput({
  onSelect,
  value,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const actorData = dummy;
  const elRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [actors, setActors] = useState<string[]>([]);

  const usedValue = typeof value !== "undefined" ? value : actors;

  // Searched actor
  const queriedActorData = actorData.filter((data) =>
    data.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedActors = useMemo(() => {
    return actorData.filter((actor) => usedValue.includes(actor.castId));
  }, [usedValue, actorData]);

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
          "grid bg-primary border border-border rounded-md w-full top-[-26rem] absolute left-0 right-0 shadow-lg transition invisible opacity-0 scale-[97.5%] shadow-secondary",
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
          {queriedActorData.map((actor, i) => {
            return (
              <li
                key={i}
                className={cn(
                  "flex items-center gap-4 px-4 py-2 mx-4 hover:bg-secondary/70 transition cursor-pointer rounded-md active:bg-gray/20",
                  usedValue.includes(actor.castId) && "bg-secondary"
                )}
                onClick={() => {
                  let newValue;
                  if (usedValue.includes(actor.castId)) {
                    newValue = usedValue.filter(
                      (item) => item !== actor.castId
                    );
                  } else {
                    newValue = [...usedValue, actor.castId];
                  }
                  setActors(newValue);
                  onSelect(newValue);
                }}
              >
                <img
                  src={actor.image}
                  className="w-8 aspect-square rounded-full object-cover border border-border"
                />
                <p className="text-light">{actor.name}</p>
              </li>
            );
          })}
          {queriedActorData.length === 0 && (
            <p className="text-light px-4 py-6 text-center h-[15rem] flex items-center justify-center">
              No Actor Found
            </p>
          )}
        </ul>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,3.5rem)] gap-8 w-full">
        {selectedActors.map((actor) => {
          return (
            <div
              key={actor.castId}
              className="flex items-center gap-3 flex-col justify-center cursor-pointer transition group"
              onClick={() => {
                const newValue = usedValue.filter(
                  (item) => item !== actor.castId
                );
                setActors(newValue);
                onSelect(newValue);
              }}
            >
              <div className="relative">
                <img
                  src={actor.image}
                  className="group-hover:opacity-50 w-14 h-14 rounded-full object-cover transition"
                  alt=""
                />
                <i className="bx opacity-0 group-hover:opacity-100 transition text-3xl bx-x text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></i>
              </div>
              <p className="text-light group-hover:opacity-50 text-paragraph text-center transition">
                {actor.name}
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
