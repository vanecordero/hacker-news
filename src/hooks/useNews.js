import { useContext, useEffect, useState } from "react";
import getNews from "../services/getNews";
import NewsContextProvider from "../context/newsContext.js";

const INITIAL_PAGE = 0;

export const useNews = ({ keyword } = { keyword: null }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const { news, setNews } = useContext(NewsContextProvider);
  console.log(news);

  //Get the last query Search
  const keywordToUse = keyword || localStorage.getItem("lastKeyword");

  useEffect(
    function () {
      setLoading(true);
      getNews({ keyword: keywordToUse }).then((newsRes) => {
        setNews(newsRes);
        setLoading(false);
        //Save keyword to the localStorage
        localStorage.setItem("lastKeyword", keyword);
      });
    },
    [keyword, keywordToUse, setNews]
  );

  return { loading, news, setPage };
};
