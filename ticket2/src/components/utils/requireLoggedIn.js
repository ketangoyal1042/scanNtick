import { showLoginPopup } from "@/store/slices/isLoggedinSlice";

export const requireLoggedIn = ({ auth, visitor, dispatch }, callback) => {
  const isAuthLoggedIn = !!auth.user && !!auth.token;
  const isVisitorLoggedIn = !!visitor.user && !!visitor.token;
  if (isAuthLoggedIn || isVisitorLoggedIn) {
    callback();
  } else {
    dispatch(showLoginPopup());
  }
};
