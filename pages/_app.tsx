import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";

declare global {
    // to access the global type String
    interface String {
        toPascalCase(): string;
    }
}

String.prototype.toPascalCase = function (): string {
    return this.replace(new RegExp(/[-_]+/, "g"), " ")
        .replace(new RegExp(/[^\w\s]/, "g"), "")
        .replace(
            new RegExp(/\s+(.)(\w*)/, "g"),
            (_, _2, _3) => `${_2.toUpperCase() + _3.toLowerCase()}`
        )
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
