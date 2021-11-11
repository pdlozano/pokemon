import { useState } from "react";

type ChangeData = {
    func: (text: string) => void;
    children?: JSX.Element | Array<JSX.Element> | string;
    list: string;
    move?: boolean;
};

function Change(props: ChangeData) {
    const [text, setText] = useState<string>("");

    return (
        <div
            className={
                "border-2 border-gray-500 px-4 py-2 flex items-center" +
                (props.move ? " rounded-md" : "")
            }
        >
            <div className="w-full">
                <input
                    type="text"
                    onChange={(event) => {
                        event.preventDefault();
                        setText(event.target.value);
                    }}
                    value={text}
                    list={props.list}
                    className={
                        "w-full border-2 border-black bg-white dark:bg-gray-900 font-bold px-2 py-1 uppercase mb-2" +
                        (props.move ? " rounded-t-md" : "")
                    }
                />
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        props.func(text);
                    }}
                    className={
                        "w-full border-2 border-red-800 bg-white dark:bg-gray-900 font-bold px-2 py-1 uppercase hover:bg-red-200 focus:bg-red-200 dark:hover:bg-red-700 dark:focus:bg-red-700 focus:outline-none" +
                        (props.move ? " rounded-b-md" : "")
                    }
                >
                    {props.children}
                </button>
            </div>
        </div>
    );
}

export default Change;
