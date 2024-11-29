import useLanguageQuery from "@/hooks/queries/useLanguageQuery";
import Dropdown from "../ui/Dropdown";
import { Control, Controller } from "react-hook-form";
import { MovieFields } from "@/pages/MovieForm";

type Props = {
  control: Control<MovieFields>;
};

export default function MovieLanguageInput({ control }: Props) {
  const { languageData } = useLanguageQuery();
  const {
    _formState: { errors },
  } = control;

  return (
    <div>
      <p className="mb-2">Language</p>
      <Controller
        control={control}
        name="language"
        rules={{
          required: "Language field is required",
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <Dropdown
              onSelect={onChange}
              value={value}
              data={languageData?.map((lang) => lang.Name)}
              errorMessage={errors.language?.message}
            />
          );
        }}
      />
    </div>
  );
}
