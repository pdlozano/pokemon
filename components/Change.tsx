import { useState } from "react";

type ChangeData = {
    func: (text: string) => void;
    children?: JSX.Element | Array<JSX.Element> | string;
    available?: Array<string>;
};

function Change(props: ChangeData) {
    const [text, setText] = useState<string>("");
    const random = Math.floor(Math.random() * 1000);

    return (
        <div>
            <input
                type="text"
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value);
                }}
                value={text}
                className="border-2 border-black"
                list={"items" + random}
            />
            <datalist id={"items" + random}>
                {props.available?.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </datalist>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    props.func(text);
                }}
            >
                {props.children}
            </button>
        </div>
    );
}

export default Change;
