import React, { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";

type Props = {
  title: string;
  description: string;
  uploadDescription: string;
  type: "image" | "video";
};

type InputFields = {
  file: FileList;
};

export const Form = ({
  title,
  description,
  uploadDescription,
  type,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFields>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();

  const onSubmit: SubmitHandler<InputFields> = (value) => {
    console.log(value);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = () => {
    const file = inputRef.current?.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-4">
      <div className=" flex flex-col items-center justify-center border-border border-dashed border-2 py-[5rem] gap-2 rounded-[8px]">
        {preview ? (
          type == "video" ? (
            <video
              src={preview}
              controls
              className="object-cover inset-0 rounded-[8px]"
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="object-cover inset-0 rounded-[8px]"
            />
          )
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-heading">{title}</p>
              <p className="text-light text-paragraph">{description}</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              <Input
                type="file"
                placeholder=""
                {...register("file", { required: true })}
                className="hidden"
                ref={inputRef}
                onChange={handleFileChange}
                errorMessage={errors.file?.message}
              />
              <Button
                variant="primary"
                type="button"
                onClick={handleButtonClick}
                className="px-10"
              >
                <i className="bx bx-plus mr-2"></i>
                {uploadDescription}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
