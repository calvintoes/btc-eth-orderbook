import { Provider } from "react-redux";
import { store } from "../store/store";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
