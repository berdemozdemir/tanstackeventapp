import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { fetchSingleEvent } from "@/util/http";
import Modal from "../UI/Modal";
import EventForm from "./EventForm";
import ErrorBlock from "../UI/ErrorBlock";
import Loading from "../UI/Loading";

export default function EventEdit() {
  const router = useRouter();

  const eventId = router.query.eventId;

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchSingleEvent(eventId),
  });

  async function submitHandler(eventData) {
    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: eventData }),
    });

    if (!response.ok) {
      const error = new Error("an error ocurred while updating");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    router.push("/event");
  }

  return (
    <Modal>
      {isLoading && <Loading />}

      <EventForm inputData={data ?? null} onSubmit={submitHandler}>
        <>
          <Link href={"../"}>Cancel</Link>
          <button className="button">Update</button>
        </>
      </EventForm>

      {isError && (
        <ErrorBlock
          title="Couldn't update event"
          message={
            error.info?.message ||
            "Something went wrong while updating event. Please try again later"
          }
        />
      )}
    </Modal>
  );
}
