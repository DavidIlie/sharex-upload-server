import { useRouter } from "next/router";

interface NavLinkProps {
    name: string;
    link: string;
}

const NavLink = ({ name, link }: NavLinkProps): JSX.Element => {
    const router = useRouter();
    const path = router.pathname;

    return link === path ? (
        <a
            className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-400 text-sm font-medium leading-5 text-gray-200 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
            href={link}
        >
            {name}
        </a>
    ) : (
        <a
            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-300 hover:text-dark-gray-300 hover:border-gray-300 dark:hover:border-dark-gray-500 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
            href={link}
        >
            {name}
        </a>
    );
};

export default NavLink;
