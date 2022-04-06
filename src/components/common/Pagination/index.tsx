import './pagination.css'
import ReactPaginate from 'react-paginate'
import {NewsContext} from '../../../context/newsProvider'
import { useContext } from 'react';

interface objPage{
  selected:number;
}

export const Pagination = () => {
  
  const {page, setNewPage} = useContext(NewsContext);

  const handleClick=(data:objPage)=>{
    setNewPage(data.selected)
  }
  return (<>
    <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={page}
        onPageChange={handleClick}
        containerClassName={'pagination'}
        pageClassName={'pagination__page'}
        pageLinkClassName={'pagination__page-link'}
        previousClassName={''}// btn [<]
        previousLinkClassName={''}// <
        nextClassName={''}// btn [>]
        nextLinkClassName={''}// >
        breakClassName={''}//btn [...]
        breakLinkClassName={''}// ...
        activeClassName={''}// active page

    />
  </>)
}
