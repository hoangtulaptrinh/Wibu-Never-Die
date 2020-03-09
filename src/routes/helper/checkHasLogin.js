import { redirect } from "navi";

export default matcher => {
  console.log(localStorage.currentUser);
  if (localStorage.currentUser === undefined) {
    return redirect("/Wibu-Never-Die");
  }
  const currentUser = JSON.parse(localStorage.currentUser);
  if (!!currentUser && !!currentUser.id) return matcher;
};
