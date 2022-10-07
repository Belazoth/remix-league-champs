import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Link, Form, useSearchParams } from "@remix-run/react";
import { getChampions } from "~/models/champions.server";
import ChampCard from "~/shared/components/ChampCard";

type LoaderData = {
  data: Awaited<ReturnType<typeof getChampions>>;
};

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  return json<LoaderData>({
    data: await getChampions(search.get("q")),
  });
};

export let meta: MetaFunction = () => {
  return {
    title: "Champions",
    description: "Champions Listing page",
  };
};

export default function Index() {
  let { data } = useLoaderData() as LoaderData;
  const [search, setSearch] = useState(useSearchParams()[0].get("q") ?? "");

  return (
    <div>
      <h1 className="my-6 text-4xl text-center">Find your champion</h1>

      <Form method="get" className="flex mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="q"
          className="block w-full px-4 text-lg border-blue-300 rounded-full shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search Champions..."
          list="suggestions"
        />
        <datalist id="suggestions">
          {Object.values(data).map((champion) => {
            return <option key={champion.id} value={champion.name} />;
          })}
        </datalist>
        <button
          type="submit"
          className="inline-flex items-center px-10 py-2 ml-4 text-sm font-medium leading-4 text-white bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </Form>

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-6 sm:gap-x-4 lg:grid-cols-6 xl:gap-x-4"
      >
        {Object.values(data)
          .filter((item) => {
            return search.toLocaleLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(search.toLocaleLowerCase());
          })
          .map((champion) => (
            <ChampCard
              id={champion.id}
              name={champion.name}
              image={champion.img}
            />
          ))}
      </ul>
    </div>
  );
}
