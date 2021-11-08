import { useState } from "react";

type ChangeData = {
    func: (text: string) => void;
    children?: JSX.Element | Array<JSX.Element> | string;
    list: string;
};

function Change(props: ChangeData) {
    const [text, setText] = useState<string>("");

    return (
        <div>
            <input
                type="text"
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value);
                }}
                value={text}
                list={props.list}
                className="w-full border-2 border-black bg-white font-bold px-2 py-1 uppercase mb-2"
            />
            <button
                onClick={(event) => {
                    event.preventDefault();
                    props.func(text);
                }}
                className="w-full border-2 border-red-800 bg-white font-bold px-2 py-1 uppercase hover:bg-red-200"
            >
                {props.children}
            </button>
        </div>
    );
}

export default Change;
