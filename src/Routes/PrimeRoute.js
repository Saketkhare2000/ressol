import React from "react";
import { WebContext } from "./Context/WebContext";
import { Redirect, Route } from "react-router-dom";

export default function PrimeRoute({ component: Component, ...rest }) {
  return (
    <WebContext.Consumer>
      {(value) => (
        <Route
          {...rest}
          render={(props) =>
            value.prime ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </WebContext.Consumer>
  );
}
