import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Link, Form, useSearchParams } from "@remix-run/react";
import { getChampions } from "~/models/champions.server";

type LoaderData = {
    data: Awaited<ReturnType<typeof getChampions>>;
};

export let loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url)
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


    // console.log(Object.keys(data))
    // console.log(typeof data)
    // console.log(data.Zyra.name)
    // Object.values(data.Zyra).forEach(function(element){
    //     console.log(element);
    // });

    return (
        <div>
            <h1 className="my-6 text-center text-4xl">
                Find your champion
            </h1>

            <Form method="get" className="mb-10 flex">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="q"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg border-gray-300 px-4 rounded-full"
                    placeholder="Search Champions..."
                />
                <button
                    type="submit"
                    className="ml-4 inline-flex items-center px-10 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Search
                </button>
            </Form>

            <ul
                role="list"
                className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-6 sm:gap-x-4 lg:grid-cols-6 xl:gap-x-4"
            >

                {Object.values(data).map((champion) => (
                    <li key={champion.id}
                        className={'relative champ-card champ-card-' + champion.id.toLowerCase()}
                    >
                        <Link to={champion.id}>
                            <div className="hover:scale-90 hover-within:text-white transition duration-200 group block w-full aspect-w-5 aspect-h-10 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                <img
                                    src={champion.img}
                                    alt=""
                                    className="object-cover pointer-events-none group-hover:opacity-75"
                                />
                            </div>
                            <p className="mt-2 block text-center text-sm font-medium text-gray-900 truncate pointer-events-none">
                                {champion.name}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
