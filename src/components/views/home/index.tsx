
import './home.css';
import { useContext, useState } from 'react';
import { Pagination } from '../../common/Pagination'
import { ListOfNews } from '../../common/ListOfNews'
import { NewsContext } from '../../../context/newsProvider';
import { INewObj } from '../../../interfaces/interfaces';
import getNews from '../../../services/getNews';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { Loading } from '../../common/Loading';

import arrow from '../../../assets/img/Arrow.png';
import Reactjs from '../../../assets/img/React.png';
import Vuejs from '../../../assets/img/Vuejs.png';
import Angular from'../../../assets/img/Angular.png'

const news_name = ['Angular', 'Reactjs', 'Vuejs'];

export const Home: React.FunctionComponent = () => {

  const {news, setNewNews, loading, setLoad} = useContext(NewsContext)  
  const [search, setSearch] = useLocalStorage('latestSearch', 'Select your news');
  const [show, setShow] = useState(false)

  const showOptions =()=>{
    setShow(bol => !bol);
  }

  const handleClick=(event: React.SyntheticEvent)=>{
    const {target} =event;
    const name = (target as HTMLButtonElement).dataset.value;
    if(!!name)
    {
      setShow(bol => !bol);      
      setLoad(true);
      getNews({ keyword: name }).then((newsRes) => {
      const newsArray= newsRes[0];
      setNewNews(newsArray as INewObj[]);
      setLoad(false);
    });
    setSearch('latestSearch', name);
  }
  }
console.log('render')
  return (
    <>
      <div>
        
      <form>
        <div className='searchBy'>
        <div className='selector'>
          <div className='selector__field' onClick={showOptions}>
            <p>{search===''? 'Select your news': search}</p>
            <img 
              src={arrow} 
              alt='arrow icon to open select'
              className={`${show && 'arrow--rotate'}`}
            />
          </div>
          <div>
          <ul className={`options__list ${!show && 'hide'}`}>
            {
              news_name.map((name, i)=>{
                return (
                  <li
                  key={name+i}
                  value={name}
                  className='options'
                  onClick={handleClick}
                  data-value={name}
                  >
                    <img src={
                      name === 'Angular' ? Angular
                      : name === 'Reactjs' ? Reactjs
                      : Vuejs
                    } 
                    alt={`${name} icon`}
                    data-value={name}
                    />
                    <p
                     data-value={name}>
                       {name}
                    </p>
                  </li>
              )})
            }
          </ul>
          </div>
        </div>
        </div>
      </form>
      </div>
      {
        (search === '' ||search === 'Select your news' )? (<>
        <h4 className='no-search'>Please select a topic to search</h4>
        </>)
        :(<>
          <div className='news-container'>
          {
            !loading ? (<>
              <ListOfNews news={news} />        
              <Pagination/>
            </>):(
              <Loading/>
            )
            
          }
          </div>
        </>)
      }
      
    </>
  )
}
