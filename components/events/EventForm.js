import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchSelectableImages } from "@/util/http";
import ImagePicker from "./ImagePicker";
import ErrorBlock from "../UI/ErrorBlock";

export default function EventForm({ inputData, children, onSubmit }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events-images"],
    queryFn: fetchSelectableImages,
  });

  function selectImageHandler(image) {
    setSelectedImage(image);
  }

  function submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form onSubmit={submitHandler} className="p-6">
      <p>
        <label
          className="block font-bold text-sm mt-4 mb-1 text-[#3c4249] uppercase"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className=" text-l p-1 rounded border border-[#ccc] w-full"
          type="text"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>

      {isLoading && <p>Loading selectable images...</p>}

      {isError && (
        <ErrorBlock
          title="Failed to load sleectable images"
          message="please try again later"
        />
      )}

      {data && (
        <div>
          <ImagePicker
            images={data}
            onSelect={selectImageHandler}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <div>
        <label
          className="block font-bold text-sm mt-4 mb-1 text-[#3c4249] uppercase"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className=" text-l p-1 rounded border border-[#ccc] w-full"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </div>

      <div className="flex gap-8">
        <p>
          <label
            className="block font-bold text-sm mt-4 mb-1 text-[#3c4249] uppercase"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className=" text-l p-1 rounded border border-[#ccc] w-full"
            type="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p>
          <label
            className="block font-bold text-sm mt-4 mb-1 text-[#3c4249] uppercase"
            htmlFor="time"
          >
            Time
          </label>
          <input
            className=" text-l p-1 rounded border border-[#ccc] w-full"
            type="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p>
        <label
          className="block font-bold text-sm mt-4 mb-1 text-[#3c4249] uppercase"
          htmlFor="location"
        >
          Location
        </label>
        <input
          className=" text-l p-1 rounded border border-[#ccc] w-full"
          type="text"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="flex justify-end items-center gap-8 mt-4">{children}</p>
    </form>
  );
}
