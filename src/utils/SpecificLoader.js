import { getStoredUser } from "../storage";

function SpecificLoader(props) {
  const user = getStoredUser();
  console.log(user?.role, "role");
  return props[user?.role] || (() => null);
}

export default SpecificLoader;
