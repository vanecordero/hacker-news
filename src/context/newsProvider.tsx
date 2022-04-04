import { createContext, useState, FC } from "react";
import { NewsContextState, INewObj } from "../interfaces/interfaces";

const contextDefaultValues: NewsContextState = {
  news: [],
  setNewNews: () => {}
};

export const TodosContext = createContext<NewsContextState>(
  contextDefaultValues
);

const TodosProvider: FC = ({ children }) => {
  const [news, setNews] = useState<INewObj[]>(contextDefaultValues.news);
  const setNewNews = (newNews: INewObj[]) => setNews(newNews);
  return (
    <TodosContext.Provider
      value={{
        news,
        setNewNews
      }}
    >
      {children}
    </TodosContext.Provider>
  );
  
};

export default TodosProvider;