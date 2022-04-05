import { createContext, useState, FC, useEffect } from "react";
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

const TodosProvider: FC = ({ children }) => {
  const [news, setNews] = useState<INewObj[]>(contextDefaultValues.news);
  const setNewNews = (newNews: INewObj[]) => setNews(newNews);
  const [item] = useLocalStorage('lastSearch')

  //TO get the last news search
  useEffect(function(){
    if (item !== '') {
      getNews({ keyword:item }).then((newsRes) => {
      const newsArray= newsRes[0];
      setNewNews(newsArray as INewObj[]);
    });
    }
  },[item])

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