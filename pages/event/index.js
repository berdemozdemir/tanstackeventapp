import Link from "next/link";
import { Fragment } from "react";

import EventsIntroSection from "@/components/events/EventsIntroSection";
import NewEventsSection from "@/components/events/NewEventsSection";
import FindEventSection from "@/components/events/FindEventSection";
import Header from "@/components/UI/Header";

const EventsPage = () => {
  return (
    <Fragment>
      <Header>
        <Link href="/event/new" className="button">
          New Event
        </Link>
      </Header>

      <EventsIntroSection />
      <NewEventsSection />
      <FindEventSection />
    </Fragment>
  );
};

export default EventsPage;
