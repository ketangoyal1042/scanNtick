import NavigationBar from "@/components/NavigationBar";
import store from "@/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <NavigationBar />
        <div className="pt-[26px]">
          {/* Adjust this value to match the height of your nav */}
          <ToastContainer />
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  );
}
