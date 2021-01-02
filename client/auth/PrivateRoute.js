import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = props => {
  const { auth } = useContext(AuthContext);

  return auth ? (
    <Route path={props.path}>{props.children}</Route>
  ) : (
    <Redirect
      to={{
        pathname: "/user-auth-signin",
        state: { from: props.location }
      }}
    />
  );
};

export default PrivateRoute;
