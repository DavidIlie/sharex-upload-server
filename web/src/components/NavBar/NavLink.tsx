import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface NavLinkProps {
    name: string;
    link: string;
}

const NavLink = ({ name, link, ...rest }: NavLinkProps): JSX.Element => {
    const [pageWidth, setPageWidth] = useState<number>(0);

    useEffect(() => {
        setPageWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setPageWidth(window.innerWidth);
        });
    }, [pageWidth]);

    if (pageWidth === 0) return <div className="hidden" />;

    const router = useRouter();
    const path = router.pathname;

    return pageWidth >= 638 ? (
        link === path ? (
            <Link href={link} passHref={true}>
                <a
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-600 dark:border-blue-400 text-sm font-medium leading-5 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
                    {...rest}
                >
                    {name}
                </a>
            </Link>
        ) : (
            <Link href={link} passHref={true}>
                <a
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-600 dark:text-gray-300 hover:text-dark-gray-900 dark:hover:text-dark-gray-300 hover:border-gray-300 dark:hover:border-dark-gray-500 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                    {...rest}
                >
                    {name}
                </a>
            </Link>
        )
    ) : link === path ? (
        <Link href={link} passHref={true}>
            <a
                className="block pl-3 pr-4 py-2 border-l-4 border-blue-600 dark:border-blue-400 text-base font-medium text-gray-600 dark:text-gray-200 bg-gray-200 dark:bg-dark-gray-900 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out"
                {...rest}
            >
                {name}
            </a>
        </Link>
    ) : (
        <Link href={link} passHref={true}>
            <a
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                {...rest}
            >
                {name}
            </a>
        </Link>
    );
};

export default NavLink;
