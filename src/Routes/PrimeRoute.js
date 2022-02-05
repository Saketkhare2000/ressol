import React from "react";
import { WebContext } from "../Context/WebContext";
import { Navigate, Route } from "react-router-dom";

export default function PrimeRoute({ component: Component, ...rest }) {
  return (
    <>
      {(value) => (
        <Route
          {...rest}
          render={(props) => value.loggedIn && <Component {...props} />}
        />
      )}
    </>
  );
}
