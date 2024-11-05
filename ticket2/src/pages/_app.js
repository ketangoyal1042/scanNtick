import NavigationBar from "@/components/NavigationBar";
import store from "@/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <NavigationBar />
        <div className="pt-20">
          {/* Adjust this value to match the height of your nav */}
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
