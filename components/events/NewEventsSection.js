import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "@/util/http";
import EventItem from "./EventItem";
import Loading from "../UI/Loading";
import ErrorBlock from "../UI/ErrorBlock";

export default function NewEventsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5000,
  });

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="something went wrong while fetching events."
        message={
          error.info?.message || "Couldn't fetch events please try again later"
        }
      />
    );
  }

  if (data) {
    content = (
      <ul className="max-w-[60rem] mx-auto grid grid-cols-3 gap-12">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section>
      <header className="text-center">
        <h2 className="text-4xl font-sans my-8 mx-auto text-[#b6cad5] ">
          Recently added events
        </h2>
      </header>
      {content}
    </section>
  );
}
