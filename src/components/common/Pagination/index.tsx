import './pagination.css'
import ReactPaginate from 'react-paginate'
import {NewsContext} from '../../../context/newsProvider'
import { useContext } from 'react';

interface objPage{
  selected:number;
}

export const Pagination = () => {
  
  const {setNewPage} = useContext(NewsContext);
  const totalPage = 50;

  const handleClick=(data:objPage)=>{
    setNewPage(data.selected)
  }
  return (<>
    <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={totalPage}
        onPageChange={handleClick}
        containerClassName={'pagination'}
        pageClassName={'pagination__page'}
        pageLinkClassName={'pagination__page-link'}
        previousClassName={'pagination__page'}// btn [<]
        previousLinkClassName={'pagination__page-link'}// <
        nextClassName={'pagination__page'}// btn [>]
        nextLinkClassName={'pagination__page-link'}// >
        breakClassName={'pagination__page'}//btn [...]
        breakLinkClassName={'pagination__page-link'}// ...
        activeClassName={'pagination__page--active'}// active page
        activeLinkClassName={'pagination__page--active'}// active page

    />
  </>)
}
