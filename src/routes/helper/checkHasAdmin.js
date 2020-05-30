import { map, redirect } from "navi";
import isEmpty from "lodash/isEmpty";

export default (matcher) =>
  map(() => {
    const currentUser = localStorage.currentUser;
    if (
      !currentUser ||
      (!isEmpty(JSON.parse(currentUser)) &&
        JSON.parse(currentUser).role !== "admin")
    ) {
      return redirect("/Wibu-Never-Die");
    }

    return matcher;
  });
