import { useState } from "react";
import { useRouter } from "next/router";

import type User from "../../types/User";
import type { SettingsType } from "@sharex-server/common";
import NavLink from "./NavLink";
import UserDropdown from "./UserDropdown";

interface NavBarProps {
    user: User;
    settings: SettingsType;
}

const NavBar = ({ user, settings }: NavBarProps): JSX.Element => {
    const [clickMobileMenu, setClickMobileMenu] = useState<boolean>(false);
    const router = useRouter();
    return (
        <nav className="bg-gray-800 border-b border-gray-900 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <a
                                className="font-medium text-gray-100"
                                href={router.asPath}
                            >
                                {settings.name}
                            </a>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink name="Dashboard" link="/dashboard" />
                            <NavLink name="Images" link="/images" />
                            <NavLink name="Files" link="/files" />
                            <NavLink name="Admin Panel" link="/admin" />
                        </div>
                    </div>
                    <UserDropdown user={user} />
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={() => {
                                setClickMobileMenu(!clickMobileMenu);
                            }}
                        >
                            {clickMobileMenu ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={
                    clickMobileMenu ? "sm:hidden block" : "sm:hidden hidden"
                }
            ></div>
        </nav>
    );
};

export default NavBar;
