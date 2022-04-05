import { Route, Switch } from "wouter";
import { Home } from "../views/home";
import { ErrorPage } from "../views/ErrorPage";
import TodosProvider from "../../context/newsProvider";

export const Layout = () => {
  return (
    <>
    <section>
      <h1 className="page-title">Hacker News</h1>
    </section>
      <TodosProvider>
        <Switch>
          <Route component={Home} path="/" />
          <Route component={ErrorPage} path="/:rest*" />
        </Switch>
      </TodosProvider>
    </>
  );
};
