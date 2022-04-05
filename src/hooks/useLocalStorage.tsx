import { useState } from "react";

function useLocalStorage(itemName:string='') {

  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if(localStorageItem === '' || !localStorageItem){
    localStorage.setItem(itemName, JSON.stringify(''));
    parsedItem ='';
  }else{
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = useState(parsedItem);

  const saveItem = (itemName:string, newNews: Array<string | number> | string | number) =>{
    const stringifiedNews = JSON.stringify(newNews);
    localStorage.setItem(itemName, stringifiedNews);
    setItem(newNews);
  }

  return [item, saveItem];

}

export default useLocalStorage;