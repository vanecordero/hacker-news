import { useState } from "react";
import { INewObj } from "../interfaces/interfaces";

function useLocalStorage(itemName:string='', initialValue:string | INewObj[] ='') {

  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if(localStorageItem===''|| !localStorageItem){
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem =initialValue;
  }else{
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = useState(parsedItem);

  const saveItem = (itemName:string, newNews: string | INewObj[]) =>{
    const stringifiedNews = JSON.stringify(newNews);
    localStorage.setItem(itemName, stringifiedNews);
    setItem(newNews);
  }

  return [item, saveItem];

}

export default useLocalStorage;