import { newsContainer } from '../../../interfaces/interfaces'
import {FaRegHeart, FaHeart, FaRegClock} from 'react-icons/fa'
import './listOfCards.css'

interface ITimer{
  dateType: string;
  seconds: number;
}
const intervals:ITimer[] = [
  { dateType: 'year', seconds: 31536000 },
  { dateType: 'month', seconds: 2592000 },
  { dateType: 'day', seconds: 86400 },
  { dateType: 'hour', seconds: 3600 },
  { dateType: 'minute', seconds: 60 },
  { dateType: 'second', seconds: 1 }
];


export const ListOfNews = ({news}:newsContainer) => {

  const favesID: number[] = [30896340,30908908, 30912973, 30908084]

  const itsFaves=()=>{

  }

  function timeSince(creationTime: string) {
    // convert String dato to Date type
    const date = new Date(creationTime) 

    //get the seconds rounded and find the date type
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = intervals.find(i => i.seconds < seconds); 

    if (typeof interval != 'undefined'){
      const count = Math.floor(seconds / interval.seconds);
      return `${count} ${interval.dateType}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return (<>
    {
      
      news.map((data, i)=>{
        const create_at = timeSince(data['created_at'])
       return(
       <div 
        key={data.story_id+i} 
        className='nCard'>
          <div>
           <span className='nCard__date-autor'>
             <FaRegClock className='nCard__title-clock'/>&nbsp;
             {create_at} by {data.author}
            </span>
            <p className='nCard__title'>{data.story_title}</p>
          </div>
          <div className='nCard__like'>
            {
              (favesID.some(id => id === data.story_id))
              ?<FaHeart className='nCard__like--true' />
              :<FaRegHeart className='nCard__like--false'/>
            }
          
          
          </div>
        </div>
      )
      })
    }
  </>)
}
