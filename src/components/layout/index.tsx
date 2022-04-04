import React from "react";
import { NewsContextProvider } from "../../context/newsContext";
import { Route, Switch } from "wouter";
import { Home } from "../views/home";
import { ErrorPage } from "../views/ErrorPage";

export const Layout = () => {
  return (
    <>
      <NewsContextProvider>
        <Switch>
          <Route component={Home} path="/" />
          <Route component={ErrorPage} path="/:rest*" />
        </Switch>
      </NewsContextProvider>
    </>
  );
};
