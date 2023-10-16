import Link from "next/link";

export default function EventItem({ event }) {
  const humanReadableDate = new Date(event.date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="h-full my-8 mx-0 p-0 rounded bg-[#3c4249] shadow-md gap-4 overflow-hidden flex flex-col w-80">
      <img
        className="w-full h-full object-cover"
        src={`http://localhost:3000/${event.image}`}
        alt={event.title}
      />
      <div className="h-full p-4 text-center flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-sans m-0 text-[#d7bfcb]">
            {event.title}
          </h2>
          <p className="m-2 text-xs font-sans text-white">
            {humanReadableDate}
          </p>
          <p className="m-2 text-lg font-sans text-white">{event.location}</p>
        </div>
        <p>
          <Link href={`/event/${event.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}
