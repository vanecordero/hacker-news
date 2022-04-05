import {useEffect, useState, useContext} from 'react';
import { ListOfNews } from '../../common/ListOfNews'
import { NewsContext } from '../../../context/newsProvider';
import {useLocation} from 'wouter';


export const FavesNews: React.FunctionComponent = () => {
  const [location] = useLocation()
  const {news, setNewNews} = useContext(NewsContext)


  useEffect(function(){
    
  }, [])


console.log(location)
console.log(news)
  return (
    <>   
    <section>
      <div className='news-container'>
        <ListOfNews news={news} />
      </div>
    </section>
    </>
  )
}
