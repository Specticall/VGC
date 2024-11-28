import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import useMediaMutation from "@/hooks/mutation/useMediaMutation";
import axios from "axios";

type Props = {
  title: string;
  description: string;
  uploadDescription: string;
  type: "image" | "video";
  onChange: (file?: File) => void;
  onError: (message: string) => void;
  errorMessage?: string;
  value?: string;
};

function validateImage(imgFile: File) {
  if (!imgFile.type.includes("png") && !imgFile.type.includes("jpeg")) {
    return "Invalid file type, File must either be .png or .png";
  }

  const fileSizeMB = imgFile.size / (1024 * 1024);
  if (fileSizeMB > 2) {
    return "File is too large, the maximum size is 2mb";
  }

  return true;
}

function validateVideo(videoFile: File) {
  if (!videoFile.type.includes("mp4") && !videoFile.type.includes("mkv")) {
    return "Invalid file type, File must either be .mp4 or .mkv";
  }

  const fileSizeMB = videoFile.size / (1024 * 1024);
  if (fileSizeMB > 20) {
    return "File is too large, the maximum size is 20mb";
  }

  return true;
}

export const MediaInput = ({
  title,
  description,
  uploadDescription,
  type,
  value,
  errorMessage,
  onChange,
  onError,
}: Props) => {
  const { presignedURLMutation } = useMediaMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (value) setPreview(value);
  }, [value]);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    const validation =
      type === "image" ? validateImage(file) : validateVideo(file);

    if (typeof validation === "string") {
      onError(validation);
      return;
    }

    if (onChange) onChange(file);
    const data = await presignedURLMutation.mutateAsync({
      category: type === "image" ? "poster" : "trailer",
      path: file.name,
      mimetype: file.type,
    });

    await axios.put(data.data.data.url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleDelete = () => {
    if (onChange) onChange(undefined);
    setPreview(undefined);
  };

  return (
    <div className="">
      {preview ? (
        <div className="relative group">
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition invisible group-hover:visible flex items-center justify-center gap-4">
            <Button variant={"secondary"} onClick={handleButtonClick}>
              Edit
            </Button>
            <Button variant={"primary"} onClick={handleDelete}>
              Delete
            </Button>
          </div>
          {type === "video" ? (
            <video
              src={preview}
              controls
              className="object-cover inset-0 rounded-[8px]"
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="object-cover inset-0 rounded-[8px] w-full"
            />
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center border-border border-dashed border-2 gap-2 rounded-[8px] p-8 min-h-[20rem]",
            errorMessage && "border-red-500"
          )}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-white text-heading">{title}</p>
            <p className="text-light text-paragraph text-center mt-1">
              {description}
            </p>
          </div>
          <div className="flex flex-col items-center mt-3">
            <Button
              variant="primary"
              type="button"
              onClick={handleButtonClick}
              className="px-10"
            >
              <i className="bx bx-plus mr-2"></i>
              {uploadDescription}
            </Button>
          </div>
        </div>
      )}
      {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};