import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";

declare global {
    // to access the global type String
    interface String {
        toPascalCase(): string;
    }
}

String.prototype.toPascalCase = function (): string {
    return this.split(" ")
        .map((text) => text[0].toUpperCase() + text.substring(1))
        .join(" ");
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
