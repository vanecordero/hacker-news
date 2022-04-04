import { ListOfGift } from '../../common/ListOfNews'
import { useNews } from '../../../hooks/useNews'
//const showAllNewsBy = ['All', 'My faves']

export const Home = () => {
  const {news} = useNews({keyword: 'angular'})
  console.log(news)
  return (
    <>
    <section>
      <h1>Hacker News</h1>
    </section>
    <section>
      <nav>
        <ol>
          <li>All</li>
          <li></li>
        </ol>
      </nav>
      <div>
        <ListOfGift news={news} />
      </div>
    </section>
    </>
  )
}
