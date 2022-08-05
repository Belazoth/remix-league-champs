import { ChevronRightIcon } from "@heroicons/react/solid";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { getChampion } from "~/models/champions.server";

type LoaderData = {
    champion: Awaited<ReturnType<typeof getChampion>>;
};

export const loader: LoaderFunction = async ({ params, }) => {
    return json({
        champion: await getChampion(params.name),
    });
};

export let meta: MetaFunction = ({ data, params }) => {
    //if it is a bad path
    if (!data) {
        return {
            title: "Missing Champion",
            description: `There is no champion with the ID of ${params.name}. 😢`,
        };
    }

    //if the data is there
    return {
        title: data.champion.name + " | Champion Page",
        description: data.champion.lore,
    };
};

export let handle = {
    breadcrumb: (params: { name: string }, data: LoaderData) => (
        <>
            <ChevronRightIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500" />

            <Link
                to={`/${params.name}`}
                className="text-sm font-medium text-gray-400 hover:text-gray-200"
            >
                {data.champion.name}
            </Link>
        </>
    ),
};

export default function PostSlug() {
    const { champion } = useLoaderData() as LoaderData;

    let champ_title = champion.title;
    champ_title = champ_title.replace(/^the/gi, 'The');

    const attributes = useMemo(
        () => ({
            Armor: champion.stats.armor,
            'Armor per level': champion.stats.armorperlevel,
            'Attack damage': champion.stats.attackdamage,
            'Attack damage per level': champion.stats.attackdamageperlevel,
            'Attack range': champion.stats.attackrange,
            'Attack speed': champion.stats.attackspeed,
            'Attack speed per level': champion.stats.attackspeedperlevel,
            Crit: champion.stats.crit,
            'Crit per level': champion.stats.critperlevel,
            HP: champion.stats.hp,
            'HP per level': champion.stats.hpperlevel,
            'HP regen': champion.stats.hpregen,
            'HP regen per level': champion.stats.hpregenperlevel,
            'Move speed': champion.stats.movespeed,
            MP: champion.stats.mp,
            'MP per level': champion.stats.mpperlevel,
            'MP regen': champion.stats.mpregen,
            'MP regen per level': champion.stats.mpregenperlevel,
            'Spell block': champion.stats.spellblock,
            'Spell block per level': champion.stats.spellblockperlevel,
        }),
        [champion.stats]
    );


    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 pb-2 text-center text-4xl">
                {champion.name}: {champ_title}
            </h1>


            <img className='mx-auto' src={champion.img} />


            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Attribute
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(attributes).map(([key, value], idx) => (
                            <tr
                                key={key}
                                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {key}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}