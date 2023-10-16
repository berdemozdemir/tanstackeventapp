import Link from "next/link";

import meetupImg from "../../public/meetup.jpg";

const EventsIntroSection = () => {
  return (
    <section
      className="-mt-32 mb-12 py-32 px-[15%] text-center [&>p]:text-xl [&>p]:leading-6 [&>p]:font-sans "
      style={{ backgroundImage: `url(${meetupImg.src})` }}
    >
      <h2 className="text-3xl font-sans my-10 mx-auto font-bold text-[#1d161a] [&>strong]:text-[#e30d7c]">
        Connect with amazing people <br />
        or <strong>find a new passion</strong>
      </h2>
      <p className="mb-12">
        Anyone can organize and join events on React Event!
      </p>
      <p>
        <Link href="/event/new" className="button">
          Create your first event
        </Link>
      </p>
    </section>
  );
};

export default EventsIntroSection;
