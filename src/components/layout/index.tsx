import { Route, Switch, useLocation } from "wouter";
import './style.css'
import { Link  } from 'wouter';
import TodosProvider from "../../context/newsProvider";
import { Home } from "../views/home";
import { ErrorPage } from "../views/ErrorPage";
import { FavesNews } from "../views/Faves";
export const Layout = () => {
  const [location] = useLocation();

  return (
    <section>
      <header className="page-title">
        <h1>Hacker News</h1>
      </header>

      <nav className="menu">
        <Link  
          href='/'
          >
            <span className={`menu__link ${location=== '/'&& 'menu__link--active'}`}>All </span>
        </Link>
        <Link  
          href='/my-faves'
          >
            <span className={`menu__link ${location=== '/my-faves'&& 'menu__link--active'}`}>My faves</span>
        </Link>
      </nav>
      <main>
        
          <TodosProvider>
            <Switch>
              <Route component={Home} path="/" />
              <Route component={FavesNews} path="/my-faves" />
              <Route component={ErrorPage} path="/:rest*" />
            </Switch> 
          </TodosProvider>
      </main>
    </section>
  );
};
