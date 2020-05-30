import { map, redirect } from "navi";

export default (matcher) =>
  map(() => {
    if (localStorage.currentUser === undefined) {
      return redirect("/Wibu-Never-Die");
    }
    const currentUser = JSON.parse(localStorage.currentUser);
    if (!!currentUser && !!currentUser.id) return matcher;
  });
