import { useContext, useState, useEffect } from "react";
import { NewsContext} from "../context/newsProvider";
import getNews from "../services/getNews";
import { INewObj } from "../interfaces/interfaces";

const INITIAL_PAGE = 0;

interface keyProp{
  keyword: string | null;
}

export const useNews = ({ keyword = null }:keyProp) => {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { news, setNewNews } = useContext(NewsContext);

  //Get the last query Search
  const keywordToUse:string | null = keyword || localStorage.getItem("lastKeyword");

  useEffect(
    function () {
      setLoading(true);
      getNews({ keyword: keywordToUse }).then((newsRes) => {
        const newsArray= newsRes[0];
        setNewNews(newsArray as INewObj[]);
        setLoading(false);
        //Save keyword to the localStorage
        //localStorage.setItem("lastKeyword", keyword);
      });
    },
    [keyword, keywordToUse]
  );

  return { loading, news, setPage };

}