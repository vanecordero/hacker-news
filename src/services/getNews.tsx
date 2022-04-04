import { API_URL } from './settings'
import { Resp } from './models'


const getResponse = (apiResponse:Resp )=> {
    const {hits, nbPages} = apiResponse;
    console.log(Array.isArray(hits))
    console.log(hits[0])
    console.log(nbPages)
    console.log(apiResponse)
    if(Array.isArray(hits)){
        const news = hits.map(objNew=>{
            const {author,story_title, created_at, story_url } = objNew
            return {author,story_title, created_at, story_url }
        })
        return {news, nbPages}
    }
  return []
}

export default function getNews({
    keyword = "angular",
    page = 0,
  } = {}) {
    const apiURL = `${API_URL}/search_by_date?query=${keyword}&page=${page}`
  
    return fetch(apiURL)
      .then((res) => res.json())
    .then(getResponse)
  }