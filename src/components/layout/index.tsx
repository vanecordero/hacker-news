import { Route, Switch } from "wouter";
import { Home } from "../views/home";
import { ErrorPage } from "../views/ErrorPage";
import TodosProvider from "../../context/newsProvider";
import { FavesNews } from "../views/Faves";
import { Link  } from 'wouter';
export const Layout = () => {
  return (
    <>
    <section>
      <h1 className="page-title">Hacker News</h1>
    </section>
<section>
  <nav>
       <Link  
        className='nav__link'
        href='/'
        >
          <span>Alll</span>
      </Link>
      <Link  
        className='nav__link'
        href='/my-faves'
        >
          <span>My faves</span>
      </Link>
    </nav>

    
      <TodosProvider>
        {/* <Switch> */}
          <Route component={Home} path="/" />
          <Route component={FavesNews} path="/my-faves" />
          {/* <Route component={ErrorPage} path="/my-faves/:rest*" /> */}
        {/* </Switch> */}
      </TodosProvider>
  </section>
    </>
  );
};
