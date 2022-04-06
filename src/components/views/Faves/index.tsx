import { useEffect, useState, useContext } from 'react';
import { NewsContext } from '../../../context/newsProvider';
import { INewObj } from '../../../interfaces/interfaces';
import { ListOfNews } from '../../common/ListOfNews';
import './style.css'

export const FavesNews: React.FunctionComponent = () => {

  const {news} = useContext(NewsContext)
  const [favs, setFavs] = useState<INewObj[]>([])

  //Update if some fave news its unlike
  useEffect(function(){
    const faveNews =  localStorage.getItem('favesNews');
    if (!!faveNews){ 
      if(faveNews.length >0)setFavs(JSON.parse(faveNews).flat())
      }
  }, [news])

  return (
    <>   
    {
        favs.length === 0 ? (<>
        <h4 className='no-faves'>You don't have any news marked as favorites.</h4>
        </>)
        :(<>
          <section>
            <div className='news-container'>
              <ListOfNews news={favs} />
            </div>
          </section>
        </>)
      }
      
    
    </>
  )
}
