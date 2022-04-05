import { createContext, useState, FC, useEffect } from "react";
import { NewsContextState, INewObj } from "../interfaces/interfaces";
import getNews from "../services/getNews";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLocation  } from 'wouter';

const contextDefaultValues: NewsContextState = {
  news: [],
  setNewNews: () => {}
};

export const NewsContext = createContext<NewsContextState>(
  contextDefaultValues
);

const TodosProvider: FC = ({ children }) => {
  const [news, setNews] = useState<INewObj[]>(contextDefaultValues.news);
  const setNewNews = (newNews: INewObj[]) => setNews(newNews);
  const [item] = useLocalStorage('lastSearch');
  const [faveNews] = useLocalStorage('favesNews', [])
  const [location] = useLocation()

  //TO get the last news search
  useEffect(function(){
    if (item !== '' && location ==='/') {
      console.log('in all')
      getNews({ keyword:item }).then((newsRes) => {
      const newsArray= newsRes[0];
      setNewNews(newsArray as INewObj[]);
    });
    }
    else if (location !=='' && location === '/my-faves'){
      if(!!faveNews){ 
        console.log('insert data')
        console.log(faveNews)
        setNews(faveNews)
      }
      }
  },[item, location, faveNews])

  console.log(news)

  return (
    <NewsContext.Provider
      value={{
        news,
        setNewNews
      }}
    >
      {children}
    </NewsContext.Provider>
  );
  
};

export default TodosProvider;