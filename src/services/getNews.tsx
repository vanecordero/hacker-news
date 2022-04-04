import { API_URL } from './settings'
import { Resp } from '../interfaces/interfaces'

interface searchProps{
  keyword: string | null;
  page?: number
}
const getResponse = (apiResponse:Resp )=> {
    const {hits, nbPages} = apiResponse;
    if(Array.isArray(hits)){
        const newsArr = hits.map(objNew=>{
            const {author,story_title, created_at, story_url } = objNew
            return {author,story_title, created_at, story_url }
        })
        return [newsArr, nbPages]
    }
  return []
}

export default function getNews({keyword= "angular", page = 0}:searchProps) {
    const apiURL = `${API_URL}/search_by_date?query=${keyword}&page=${page}`
  
    return fetch(apiURL)
      .then((res) => res.json())
    .then(getResponse)
  }