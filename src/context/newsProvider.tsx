import { createContext, useState, FC, useEffect } from "react";
import { useLocation  } from 'wouter';
import { NewsContextState, INewObj } from "../interfaces/interfaces";
import getNews from "../services/getNews";
import useLocalStorage from "../hooks/useLocalStorage";

const contextDefaultValues: NewsContextState = {
  news: [],
  setNewNews: () => {},
  page: 0,
  setNewPage: ()=> {},
  loading: true,
  setLoad: ()=>{}
}
export const NewsContext = createContext<NewsContextState>(
  contextDefaultValues
);

const NewsProvider: FC = ({ children }) => {
  //Manage pages for the pagination
  const [news, setNews] = useState<INewObj[]>(contextDefaultValues.news);
  const setNewNews = (newNews: INewObj[]) => setNews(newNews);  
  //Manage pages for the pagination
  const [page, setPage]= useState<number>(contextDefaultValues.page);
  const setNewPage = (page:number)=> setPage(page);
  //Manage Storage data
  const [faveNews] = useLocalStorage('favesNews', []);
  const [location] = useLocation();
  //loading
  const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading)
  const setLoad = (loading:boolean) => setLoading(loading);

  useEffect(function(){
  //TO get the last news search 
    let search = localStorage.getItem('latestSearch');
    if(!!search){
      let parsedS = JSON.parse(search);
      if (parsedS !== '' && location ==='/') {
        setLoad(true);
        getNews({ keyword:parsedS , page}).then((newsRes) => {
        const newsArray= newsRes[0];
        setNewNews(newsArray as INewObj[]);
        setLoad(false);
      });
    }}
    //Get the fav news 
    else if (faveNews.length >0 && location === '/my-faves'){
      if(!!faveNews)setNewNews(faveNews.flat())
      }
  },[ location, faveNews, page]);
  

  return (
    <NewsContext.Provider
      value={{
        news,
        setNewNews,
        page,
        setNewPage,
        loading,
        setLoad
      }}
    >
      {children}
    </NewsContext.Provider>
  );
  
};

export default NewsProvider;