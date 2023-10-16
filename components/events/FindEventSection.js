import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "@/util/http";
import Loading from "../UI/Loading";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();

    setSearchTerm(searchElement.current.value);
  }
  let content = (
    <p className="text-white mt-6">
      Please enter a search term and to find events.
    </p>
  );

  if (isLoading) {
    content = (
      <div className="flex justify-center my-16">
        <Loading />
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="Couldnt fetch events"
        message={
          error.info?.message || "something went wrong while fetching events"
        }
      />
    );
  }

  if (data) {
    content = (
      <ul className="max-w-[60rem] grid grid-cols-3 mx-auto gap-12">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="mt-12 mb-24 mx-auto py-0">
      <header className="text-center">
        <h2 className="text-3xl font-sans my-8 mx-auto text-[#b6cad5]">
          Find your next event!
        </h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            className=" py-2 px-4 rounded-l-[4px] border-none bg-[#fff]"
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button className="py-2 px-4 rounded-r-[4px] border-none bg-[#b6cad5] text-[#1d161a] font-bold cursor-pointer">
            Search
          </button>
        </form>
      </header>
      {content}
    </section>
  );
}
