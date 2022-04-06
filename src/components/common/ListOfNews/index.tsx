import { useContext, useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaRegClock } from 'react-icons/fa'
import { newsContainer } from '../../../interfaces/interfaces'
import { INewObj } from '../../../interfaces/interfaces';
import { NewsContext } from '../../../context/newsProvider';
import { useLocation } from 'wouter';
import './listOfNews.css'
import {Pagination} from '../Pagination'

interface ITimer{
  dateType: string;
  seconds: number;
}
const times:ITimer[] = [ //Timer object for the "timeSince" function
  { dateType: 'year', seconds: 31536000 },
  { dateType: 'month', seconds: 2592000 },
  { dateType: 'day', seconds: 86400 },
  { dateType: 'hour', seconds: 3600 },
  { dateType: 'minute', seconds: 60 },
  { dateType: 'second', seconds: 1 }
];

export const ListOfNews = ({news}:newsContainer) => {

  const {setNewNews} = useContext(NewsContext)
  const [favesNews, setFavesNews] = useState<INewObj[]>([])
  const [Location] = useLocation()

  useEffect(function(){
    let favNewsItem = localStorage.getItem('favesNews');
    if(!!favNewsItem)setFavesNews(JSON.parse(favNewsItem).flat());
  }, [news])

  //save on the localStorage the favorite news
  useEffect(function(){    
    if(favesNews.length>0)localStorage.setItem('favesNews', JSON.stringify([favesNews]));
  }, [favesNews])

  // Convert create_at to times ago
  function timeSince(creationTime: string) {
    // convert String date to Date type
    const date = new Date(creationTime);
    //get the seconds rounded and find the date type
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    //Condition for just in time date
    if(seconds === 0 ){    
      return 'Just now';
    } else {
      const time = times.find(i => i.seconds < seconds); 
      if (typeof time != 'undefined'){
        const count = Math.floor(seconds / time.seconds);
        return `${count} ${time.dateType}${count !== 1 ? 's' : ''} ago`;
      }
    }
  }

  // Open the news url
  const goToNewsUrl = (url:string) => {
    window.open(url,'_blank','noopener noreferrer')
  }

  // Toogle as favorite a news
  const makeFavorite = (newsFavObj:INewObj)=>{
    const {story_id, author, created_at}=newsFavObj
    
    //Toogle Fav
    if(favesNews.some(e => (e.story_id === story_id && e.author === author && e.created_at === created_at))){

      //I use all those conditions bc there its some news how has the same Title_id 
      let index = favesNews.findIndex(elem=>(
        elem.story_id === story_id && elem.author === author && elem.created_at === created_at
      ))
      setFavesNews(favesNews.filter((ele, i)=> i !== index))
      
      if(Location==='/my-faves'){ //UnMark Favorite for my faves screen
        setNewNews(favesNews.filter((ele, i)=> i !== index));
        localStorage.setItem('favesNews', JSON.stringify([favesNews.filter((ele, i)=> i !== index)]))
      }    
    }
    else {     
      setFavesNews(favNews=>[...favNews.flat(), newsFavObj]);      
    }
     
  }


  return (<>
  <div className='nCard_container'>
  {
      news.map((data, i)=>{
        const create_at = timeSince(data['created_at'])
       return(
       <div 
        key={data.story_id+i+data.author} 
        className='nCard'
        >
          <div onClick={e=>goToNewsUrl(data.story_url)}>
           <span className='nCard__date-autor'>
             <FaRegClock className='nCard__title-clock'/>&nbsp;
             {create_at} by {data.author}
            </span>
            <p className='nCard__title'>{
            (data.story_title != null)? data.story_title 
            : 'Ops, someone forgot to write the title of this news. :('
            }</p>
          </div>
          <div className='nCard__like' onClick={e=> makeFavorite(data)}>
            {
              (favesNews.some(e => (e.story_id === data.story_id && e.author === data.author && e.created_at === data.created_at)))
              ?<FaHeart className='nCard__like--true' />
              :<FaRegHeart className='nCard__like--false'/>
            }
          </div>
        </div>
      )
      })
    }
  </div>  
  <Pagination/>
  
  </>)
}
