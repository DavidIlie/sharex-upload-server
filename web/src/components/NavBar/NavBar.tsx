import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import ToggleColorMode from "@hooks/ToggleColorMode";
import useSettings from "@hooks/useSettings";
import useUser from "@hooks/useUser";
import usePrivacyMode from "@hooks/usePrivacyMode";

import NavLink from "./NavLink";
import UserDropdown from "./UserDropdown";

const NavBar = () => {
    const [clickMobileMenu, setClickMobileMenu] = useState<boolean>(false);

    const settings = useSettings();

    const user = useUser();

    const { resolvedTheme } = useTheme();
    const changeTheme = ToggleColorMode();

    const { isPrivacyModeEnabled, updatePrivacyMode } = usePrivacyMode();

    return (
        <nav className="bg-white border-b border-gray-300 shadow dark:bg-gray-800 dark:border-gray-900">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex items-center flex-shrink-0">
                            <Link href="/dashboard">
                                <a className="font-medium text-black dark:text-gray-100">
                                    {settings.name}
                                </a>
                            </Link>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink name="Dashboard" link="/dashboard" />
                            <NavLink name="Images" link="/dashboard/images" />
                            <NavLink name="Files" link="/dashboard/files" />
                            <NavLink name="Texts" link="/dashboard/texts" />
                            <NavLink
                                name="Control Panel"
                                link="/dashboard/control-panel"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <label
                            className="flex items-center cursor-pointer"
                            aria-label="Hide content"
                            title="Hide content"
                        >
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isPrivacyModeEnabled || false}
                                    onChange={updatePrivacyMode}
                                />
                                <div className="block w-12 h-6 bg-gray-200 bg-opacity-75 rounded-full dark:bg-gray-900 dark:bg-opacity-75"></div>
                                <div className="absolute w-4 h-4 transition bg-gray-400 rounded-full dark:bg-white dot left-1 top-1"></div>
                            </div>
                            <div className="ml-3">Privacy Mode</div>
                        </label>
                        <UserDropdown />
                    </div>
                    <div className="flex items-center -mr-2 sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 text-gray-500 duration-200 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                            onClick={() => {
                                setClickMobileMenu(!clickMobileMenu);
                            }}
                        >
                            {clickMobileMenu ? (
                                <svg
                                    className="block w-6 h-6"
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
                                    className="block w-6 h-6"
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
            >
                <div className="pb-2 space-y-1">
                    <NavLink name="Dashboard" link="/dashboard" />
                    <NavLink name="Images" link="/dashboard/images" />
                    <NavLink name="Files" link="/dashboard/files" />
                    <NavLink name="Texts" link="/dashboard/texts" />
                    <NavLink
                        name="Control Panel"
                        link="/dashboard/control-panel"
                    />
                    <a
                        onClick={() => changeTheme()}
                        className="flex gap-1 py-2 pl-3 pr-3 text-base font-medium text-gray-600 transition duration-150 ease-in-out border-l-4 border-transparent cursor-pointer dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
                    >
                        {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                    </a>
                    <NavLink
                        name="Report a bug"
                        link="https://github.com/DavidIlie/sharex-upload-server/issues"
                    />
                </div>
                <div className="pt-2 pb-1 border-t border-gray-200">
                    <div className="flex items-center px-4">
                        <div>
                            <div className="text-base font-medium text-gray-800 dark:text-gray-300">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-400">
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-1">
                        <NavLink name="Profile" link="/user/profile" />
                        <NavLink name="API Keys" link="/user/api-keys" />
                        <NavLink name="Log Out" link="/logout" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
