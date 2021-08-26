import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { AiFillBug, AiOutlineUser, AiFillApi } from "react-icons/ai";

import type User from "../../types/User";

interface UserDropdownProps {
    user: User;
}

const UserDropdown = ({ user }: UserDropdownProps): JSX.Element => {
    return (
        <div className="hidden sm:flex sm:items-center sm:ml-6">
            <Menu as="div" className="relative inline-block text-right">
                <Menu.Button className="inline-flex items-center">
                    {user.name}
                    <svg
                        className="ml-1 h-4 w-4"
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
                    <Menu.Items className="absolute right-0 mt-2 w-36 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-900">
                        <div className="border-1 rounded-t-md border-gray-900">
                            <Menu.Item>
                                <Link
                                    href="https://github.com/DavidIlie/sharex-media-server/issues"
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
                            <Menu.Item>
                                <Link href="/user/profile">
                                    <a className="mt-1">
                                        <DropdownElement>
                                            <AiOutlineUser className="mx-0.5 text-xl" />
                                            Profile
                                        </DropdownElement>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/user/api-keys">
                                    <a className="mt-1">
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
                                <a className="font-semibold cursor-pointer bg-blue-800 text-center group flex justify-center rounded-b-md items-center w-full py-2 text-sm">
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
        <div className="group flex gap-1 items-center w-full px-2 py-2 text-sm duration-200 hover:bg-dark-gray-800">
            {children}
        </div>
    );
};

export default UserDropdown;
