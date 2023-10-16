import Link from "next/link";
import { Fragment } from "react";

export default function Header({ children }) {
  return (
    <Fragment>
      <header className="m-0 py-8 px-[15%] flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/event">
            <h1 className="text-2xl text-[#fff] shadow-md">React Event</h1>
          </Link>
        </div>
        <nav className="flex gap-4">{children}</nav>
      </header>
    </Fragment>
  );
}
