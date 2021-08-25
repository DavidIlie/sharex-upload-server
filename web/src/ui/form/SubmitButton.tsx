interface SubmitButtonProps {
    text: string;
}

const SubmitButton = ({ text, ...rest }: SubmitButtonProps): JSX.Element => {
    return (
        <button
            type="submit"
            className="items-center px-4 py-3 bg-gray-800 border border-gray-900 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-dark-gray-800 focus:outline-none focus:border-gray-800 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 group relative w-full flex justify-center"
            {...rest}
        >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </span>
            {text}
        </button>
    );
};

export default SubmitButton;
