import { ListOfNews } from '../../common/ListOfNews'
import { useNews } from '../../../hooks/useNews'
import './home.css'

const showAllNewsBy = ['All', 'My faves'];

export const Home = () => {
  const {news} = useNews({keyword: 'angular'})
  console.log(news)
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
      <div className='news-container'>
        <ListOfNews news={news} />
      </div>
    </section>
    </>
  )
}
