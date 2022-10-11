import { Link } from "@remix-run/react";

export default function Toolbar() {
  return (
    <>
      <div className="sticky top-0 z-50 mb-4 w-screen max-w-[100vw] bg-white p-2 shadow-md">
        <div className="flex flex-row items-center h-full text-black justify-items-stretch">
          <div className="flex items-center gap-6">
            {/* Link is a Helper from Remix to navigate between pages. Check Remix Docs for more Info */}
            <Link to={"/"} prefetch="none">
              <img
                src={"/images/logo.svg"}
                alt="logo"
                className="transition h-14 hover:scale-110"
              />
            </Link>
          </div>
          <span className="pl-3 text-2xl font-bold leading-7 sm:truncate sm:text-3xl">
            Champion Data
          </span>
        </div>
      </div>
    </>
  );
}
