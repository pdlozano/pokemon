import { useState } from "react";

type ChangeData = {
    func: (text: string) => void;
    children?: JSX.Element | Array<JSX.Element>;
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
            />
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
