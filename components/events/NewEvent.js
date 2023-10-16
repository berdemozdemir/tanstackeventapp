import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";

import { createNewEvent } from "@/util/http";
import EventForm from "@/components/events/EventForm";
import Modal from "@/components/UI/Modal";
import ErrorBlock from "../UI/ErrorBlock";

export default function NewEvent() {
  const router = useRouter();

  const { mutate, isLoading, error, isError } = useMutation({
    mutationKey: ["events"],
    mutationFn: createNewEvent,
    onSuccess: () => {
      router.push("/event");
    },
  });

  function submitHandler(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal>
      
      <EventForm onSubmit={submitHandler}>
        {isLoading ? (
          "submitting.."
        ) : (
          <>
            <Link href={"../event"}>Cancel</Link>
            <button className="button">Create</button>
          </>
        )}
      </EventForm>

      {isError && (
        <ErrorBlock
          title="Something went wrong"
          message={
            error.info?.message ||
            "Couldn't create a event please try again later"
          }
        />
      )}
    </Modal>
  );
}
