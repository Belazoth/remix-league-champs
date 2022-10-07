import { Link } from "@remix-run/react";

interface IProps {
  id: string;
  name: string;
  image: string;
}

export default function ChampCard({ id, name, image }: IProps) {
  return (
    <li
      key={id}
      className={"champ-card champ-card- relative" + id.toLowerCase()}
    >
      <Link to={id}>
        <div className="block w-full overflow-hidden transition duration-200 bg-gray-100 rounded-lg hover-within:text-white aspect-w-5 aspect-h-10 group focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 hover:scale-90">
          <img
            src={image}
            alt=""
            className="object-cover pointer-events-none group-hover:opacity-75"
          />
        </div>
        <p className="block mt-2 text-sm font-medium text-center text-gray-900 truncate pointer-events-none">
          {name}
        </p>
      </Link>
    </li>
  );
}
