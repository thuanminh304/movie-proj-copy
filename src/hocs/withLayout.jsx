import React from "react";
import { Route,Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const withLayout = (WrappedComponent) => {
  return ({ component: Component, isPrivate, ...rest }) => {
    const { currentUser } = useSelector((state) => state.authUserReducer);
    const content = (
      <Route
        {...rest}
        render={(routeProps) => (
          <WrappedComponent>
            <Component {...routeProps} />
          </WrappedComponent>
        )}
      />
    );
    //protect routePrivate
    if (isPrivate) {
      if (currentUser) {
        return content;
      }
      return <Redirect to="/" />;
    }
    return content;
  };
};

export default withLayout;
