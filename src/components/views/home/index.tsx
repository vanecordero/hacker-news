import { useContext } from 'react';
import { ListOfNews } from '../../common/ListOfNews'
import { NewsContext } from '../../../context/newsProvider';
import { INewObj } from '../../../interfaces/interfaces';
import getNews from '../../../services/getNews';
import useLocalStorage from '../../../hooks/useLocalStorage';

import './home.css'

const news_name = ['Angular', 'Reacts', 'Vuejs'];

export const Home: React.FunctionComponent = () => {

  const {news, setNewNews} = useContext(NewsContext)
  const [item, saveItem] = useLocalStorage('lastSearch');  

  //handle change event from option search news
  const handleChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    let name = event.target.value;
    getNews({ keyword: name }).then((newsRes) => {
      const newsArray= newsRes[0];
      setNewNews(newsArray as INewObj[]);
    });
    saveItem('lastSearch', event.target.value)
  }

  return (
    <>
      <div>
      <form>
        <div className='searchBy'>
          <select onChange={handleChange} defaultValue={item}>
            <option value='' disabled>Select your news</option>
            {
              news_name.map((name, i)=>(<option
              key={name+i} value={name}
              >{
                name
              }</option>))
            }
          </select>
        </div>
      </form>
      </div>
      <div className='news-container'>
        <ListOfNews news={news} />
      </div>
    </>
  )
}
