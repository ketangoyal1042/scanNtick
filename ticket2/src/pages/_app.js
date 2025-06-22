import NavigationBar from "@/components/NavigationBar";
import LoginPopup from "@/components/LoginPopup";
import store from "@/store";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <div>
            <NavigationBar />
          </div>
          <div className="pt-16">
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        <LoginPopup />
        </Provider>
      </ThemeProvider>
    </>
  );
}
