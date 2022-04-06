import { createContext, useState, FC, useEffect } from "react";
import { useLocation  } from 'wouter';
import { NewsContextState, INewObj } from "../interfaces/interfaces";
import getNews from "../services/getNews";
import useLocalStorage from "../hooks/useLocalStorage";

const contextDefaultValues: NewsContextState = {
  news: [],
  setNewNews: () => {}
};

export const NewsContext = createContext<NewsContextState>(
  contextDefaultValues
);

const NewsProvider: FC = ({ children }) => {
  const [news, setNews] = useState<INewObj[]>(contextDefaultValues.news);
  const setNewNews = (newNews: INewObj[]) => setNews(newNews);
  const [item] = useLocalStorage('lastSearch');
  const [faveNews] = useLocalStorage('favesNews', [])
  const [location] = useLocation()

  useEffect(function(){
  //TO get the last news search 
    if (item !== '' && location ==='/') {
      getNews({ keyword:item }).then((newsRes) => {
      const newsArray= newsRes[0];
      setNewNews(newsArray as INewObj[]);
    });
    }
    //Get the fav news 
    else if (faveNews.length >0 && location === '/my-faves'){
      if(!!faveNews)setNewNews(faveNews.flat())
      }
  },[item, location, faveNews])

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

export default NewsProvider;