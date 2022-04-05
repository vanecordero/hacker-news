import React, {useEffect} from 'react';
import { ListOfNews } from '../../common/ListOfNews'
//import { useNews } from '../../../hooks/useNews'
import './home.css'
import { NewsContext } from '../../../context/newsProvider';
import { useContext } from 'react';
import getNews from '../../../services/getNews';
import { INewObj } from '../../../interfaces/interfaces';
import useLocalStorage from '../../../hooks/useLocalStorage';

const showAllNewsBy = ['All', 'My faves'];
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
    
    <section>
      <nav>
        <ol>
          {
            showAllNewsBy.map((name, i) => <ul 
            key={name+i}
            className='nav__link'
            >{name}</ul>)
          }
        </ol>
      </nav>
      <div>
      <form>
        <div>
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
    </section>
    </>
  )
}
