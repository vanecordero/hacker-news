
import './home.css';
import { useContext, useState } from 'react';
import { ListOfNews } from '../../common/ListOfNews'
import { NewsContext } from '../../../context/newsProvider';
import { INewObj } from '../../../interfaces/interfaces';
import getNews from '../../../services/getNews';
import useLocalStorage from '../../../hooks/useLocalStorage';

import arrow from '../../../assets/img/Arrow.png';
import Reactjs from '../../../assets/img/React.png';
import Vuejs from '../../../assets/img/Vuejs.png';
import Angular from'../../../assets/img/Angular.png'

const news_name = ['Angular', 'Reactjs', 'Vuejs'];

export const Home: React.FunctionComponent = () => {

  const {news, setNewNews} = useContext(NewsContext)
  //const [item, saveItem] = useLocalStorage('lastSearch');  
  const [search, setSearch] = useLocalStorage('latestSearch', 'Select your news');
  const [show, setShow] = useState(false)

  //handle change event from option search news
  // const handleChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
  //   let name = event.target.value;
  //   getNews({ keyword: name }).then((newsRes) => {
  //     const newsArray= newsRes[0];
  //     setNewNews(newsArray as INewObj[]);
  //   });
  //   saveItem('lastSearch', event.target.value)
  // }

  const showOptions =()=>{
    setShow(bol => !bol);
  }

  const handleClick=(event: React.SyntheticEvent)=>{
    const {target} =event;
    console.log((target as HTMLButtonElement).dataset.value);
    const name = (target as HTMLButtonElement).dataset.value;
    if(!!name)
    {
      setShow(bol => !bol);
      getNews({ keyword: name }).then((newsRes) => {
      const newsArray= newsRes[0];
      setNewNews(newsArray as INewObj[]);
    });
    setSearch('latestSearch', name);
  }
  }

  return (
    <>
      <div>
        
      <form>
        <div className='searchBy'>
        <div className='selector'>
          <div className='selector__field' onClick={showOptions}>
            <p>{search}</p>
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
          {/* <select onChange={handleChange} defaultValue={item}>
            <option value='' disabled>Select your news</option>
            {
              news_name.map((name, i)=>(<option
              key={name+i} value={name}
              >{
                name
              }</option>))
            }
          </select> */}
        </div>
      </form>
      </div>
      <div className='news-container'>
        <ListOfNews news={news} />
      </div>
    </>
  )
}
