import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { AiFillBug, AiOutlineUser, AiFillApi } from "react-icons/ai";

import ThemeToggle from "./ThemeToggle";

import useUser from "@hooks/useUser";

const UserDropdown = (): JSX.Element => {
    const user = useUser();
    return (
        <div className="hidden lg:flex sm:items-center sm:ml-6">
            <Menu as="div" className="relative inline-block text-right">
                <Menu.Button className="inline-flex items-center font-medium text-black dark:text-white">
                    {user.name}
                    <svg
                        className="w-4 h-4 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 bg-gray-100 border border-gray-200 rounded-md shadow-lg w-36 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-900">
                        <div className="border-gray-300 border-1 rounded-t-md dark:border-gray-900">
                            <Menu.Item>
                                <Link
                                    href="https://github.com/DavidIlie/sharex-upload-server/issues"
                                    passHref={true}
                                >
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Submit a bug report"
                                        title="Submit a bug report"
                                    >
                                        <DropdownElement>
                                            <AiFillBug className="mx-0.5 text-xl" />
                                            Report a bug
                                        </DropdownElement>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item as={DropdownElement}>
                                <ThemeToggle />
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/user/profile">
                                    <a>
                                        <DropdownElement>
                                            <AiOutlineUser className="mx-0.5 text-xl" />
                                            Profile
                                        </DropdownElement>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/user/api-keys">
                                    <a>
                                        <DropdownElement>
                                            <AiFillApi className="mx-0.5 text-xl" />
                                            API Keys
                                        </DropdownElement>
                                    </a>
                                </Link>
                            </Menu.Item>
                        </div>
                        <Menu.Item>
                            <Link href="/logout">
                                <a className="flex items-center justify-center w-full py-2 text-sm font-semibold text-center text-white bg-blue-600 cursor-pointer dark:bg-blue-800 group rounded-b-md">
                                    Log Out
                                </a>
                            </Link>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export const DropdownElement = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center w-full gap-1 px-2 py-2 text-sm text-black duration-200 group hover:bg-gray-200 dark:hover:bg-dark-gray-700 dark:text-white">
            {children}
        </div>
    );
};

export default UserDropdown;
