import Badge from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import Dropdown from "../components/ui/Dropdown";
import Input from "../components/ui/Input";

export default function DesignSystem() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="">
        <p className="text-white mb-4 text-2xl border-b border-border pb-2">
          Buttons
        </p>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="tertiary" isLoading>
          Loading
        </Button>
      </div>
      {/* ====================================== */}
      <div>
        <p className="text-white mb-4 text-2xl border-b border-border pb-2">
          Badge
        </p>
        <Badge variant={"green"}>Airing</Badge>
        <Badge variant={"red"}>Upcoming</Badge>
        <Badge variant={"default"}>Upcoming</Badge>
      </div>
      {/* ====================================== */}
      <div>
        <p className="text-white mb-4 text-2xl border-b border-border pb-2">
          Input
        </p>
        <Input label="Name" placeholder="Enter your name"></Input>
        <Input
          label="Name"
          placeholder="Enter your name"
          errorMessage="This field can't be empty"
        ></Input>
      </div>
      {/* ====================================== */}
      <div>
        <p className="text-white mb-4 text-2xl border-b border-border pb-2">
          Dropdown
        </p>
        <Dropdown
          placeholder="Select value below"
          data={["test1", "test2", "test3", "test4", "test5", "test6", "test7"]}
        />
      </div>
    </div>
  );
}
