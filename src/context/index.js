import { createContext, useEffect, useState } from "react";
import { queryKeys } from "../react-query/constants";
import { getLoginToken, getStoredUser, setStoredUser } from "../storage";
import { getDecodedJWT, isAuthenticated } from "../utils";
import { useAuthenticatedUser } from "./hooks";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext({
  user: undefined,
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  updateUser: (data) => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const userDetails = useAuthenticatedUser();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
    }
  }, []);

  useEffect(() => {
    const data = getLoginToken();
    if (data) {
      setAuthToken(data);
    }
  }, []);

  useEffect(() => {
    const data = getStoredUser();
    if (data) {
      setUser(data);
    }
  }, []);

  // console.log(userDetails, "check");

  useEffect(() => {
    if (userDetails) {
      setUser(userDetails);
    }
  }, [userDetails]);

  console.log(userDetails, "user");
  function logout() {
    setUser(undefined);
    setAuthToken(undefined);
    localStorage.clear();
    queryClient.invalidateQueries([queryKeys.user]);
  }
  function updateUser(data) {
    setUser(data);
  }
  function authenticate(data) {
    setAuthToken(data);
    const decoded = getDecodedJWT();
    setUser(decoded);
    setStoredUser(decoded);
  }

  const value = {
    user: user,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    updateUser: updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
