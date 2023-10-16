import Link from "next/link";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { fetchSingleEvent } from "@/util/http";
import Header from "../UI/Header";
import Loading from "../UI/Loading";
import ErrorBlock from "../UI/ErrorBlock";

export default function EventDetail() {
  const router = useRouter();

  const eventId = router.query.eventId;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchSingleEvent(eventId),
  });

  const readableDate = new Date(data?.date).toLocaleDateString("en-us", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  async function deleteHandler() {
    alert('This event going to delete..Are you sure ?')

    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = new Error("An Error occurred while deleting event.");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    router.push('/event')

    return response.json();
  }

  return (
    <Fragment>
      <Header>
        <Link className="text-[#b6cad5]" href="/event">
          View all events
        </Link>
      </Header>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}

      {isError && (
        <ErrorBlock
          title="Something failed fetching detail"
          message={
            error.info?.message ||
            "failed to fetch detail please try again later"
          }
        />
      )}

      {data && (
        <article className="h-screen">
          <header className="w-[40rem] my-8 mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#b6cad5] uppercase">
              {data.title}
            </h1>
            <nav className="flex gap-4">
              <button
                onClick={deleteHandler}
                className="cursor-pointer border-none bg-transparent text-[#b6cad5] rounded font-bold p-1"
              >
                delete
              </button>
              <Link
                className="cursor-pointer border-none bg-transparent text-[#b6cad5] rounded font-bold p-1"
                href={`${eventId}/edit`}
              >
                edit
              </Link>
            </nav>
          </header>

          <div className="w-[40rem] my-8 mx-auto bg-[#343b3f] rounded-lg overflow-hidden">
            <img
              src={`http://localhost:3000/${data.image}`}
              alt={data.title}
              className="w-full h-80 object-cover mb-8"
            />
            <div className="pt-0 p-12">
              <div>
                <p className="text-xl text-[#b6cad5] font-bold m-0">
                  {data.location}
                </p>
                <time
                  className="text-2xl mx-0 my-2 text-[#b6cad5]"
                  dateTime={`Todo-DateT$Todo-Time`}
                >
                  {readableDate} / {data.time}
                </time>
              </div>
              <p className="text-xl text-[#b6cad5]">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </Fragment>
  );
}
