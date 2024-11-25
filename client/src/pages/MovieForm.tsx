import BackNavigation from "../components/general/BackNavigation";
import { Button } from "../components/ui/Button";
import { Form } from "../components/Movie/Form";
import Input from "../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";

type movieFields = {
  title: string;
  description: string;
  duration: string;
  releaseDate: Date;
  cast: string;
  fileVideo: FileList;
  fileImage: FileList;
};

export default function MovieForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<movieFields>();

  const onSubmit: SubmitHandler<movieFields> = (value) => {
    console.log(value);
  };

  return (
    <main className="min-h-screen grid px-4">
      <div className="flex flex-col gap-4 pt-4">
        <BackNavigation
          subtitle="Back to movie list"
          title="Add New Movie"
          to="/movie-list"
        />
        <div className="grid grid-cols-2 text-white gap-5">
          <div className="flex flex-col border-border border-2 rounded-[8px] bg-primary h-fit">
            <div className="flex flex-row items-center border-b border-border p-2 pl-7">
              <p className="text-heading ">Media</p>
              <div className="w-2 h-2 bg-accent rounded-full ml-2 "></div>
            </div>
            <div className="px-2">
              <Form
                title="Upload Trailer Video"
                description="File must be .mp4 and not exceed 20mb"
                uploadDescription="Select From Device"
                type="video"
                //  {register("fileVideo", {
                //       required: "Trailer video is required",
                //     })}
                //     errorMessage={errors.fileVideo?.message}
              />
              <Form
                title="Upload Poster"
                description="File must be .png or .jpg and not exceed 2mb"
                uploadDescription="Select From Device"
                type="image"
              />
            </div>
          </div>
          <div className="flex flex-col border-border border-2 rounded-[8px] bg-primary relative">
            <div className="flex flex-row items-center border-b border-border p-2 pl-7">
              <p className="text-heading ">General Info</p>
              <div className="w-2 h-2 bg-accent rounded-full ml-2 "></div>
            </div>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col pt-5 gap-5"
            >
              <Input
                label="Movie Title"
                placeholder="Venom : The last dance"
                className="px-5"
                {...register("title", {
                  required: "Title field is required",
                })}
                errorMessage={errors.title?.message}
              />
              <Input
                label="Description"
                placeholder="Movie Description"
                className="px-5"
                style={{ height: "200px" }}
                {...register("description", {
                  required: "Description field is required",
                })}
                errorMessage={errors.description?.message}
              />
              <Input
                label="Duration (Minutes)"
                placeholder="120"
                className="px-5"
                {...register("duration", {
                  required: "Duration field is required",
                })}
                errorMessage={errors.duration?.message}
              />
              <Input
                label="Release Date"
                type="date"
                placeholder=""
                className="px-5"
                {...register("releaseDate", {
                  required: "Release Date field is required",
                })}
              />
              <div className="flex flex-col justify-center items-start px-5 gap-2 pb-[4rem]">
                <div className=" flex items-center justify-center"></div>
                <div className="relative border-2 border-light border-dashed rounded-full bg-primary w-14 h-14  flex items-center justify-center">
                  <i className="bx bx-plus text-light text-3xl"></i>
                </div>
                <p className="text-white text-paragraph">Add Actor</p>
              </div>
              <div className="absolute bottom-2 right-3 pb-1">
                <Button type="submit" className="px-7 py-2 text-white text-sm">
                  Add Movie
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
