import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import { ListOfNews } from ".";

test('render list of news', ()=>{
  const news = [{
    author:'Rosa Vanessa Cordero',
    story_title:'This is a test render',
    created_at: '2022-04-05T13:24:52.000Z',
    story_url:'https://www.rvcordero.com/',
    story_id: 10001102
  }]
  const view = render(<ListOfNews news={news}/>)
  expect(view.container).toHaveTextContent('This is a test render',)
})


test('Date parser to time ago', ()=>{
  const date = new Date()
  const news = [{
    author:'Rosa Vanessa Cordero',
    story_title: 'This is a test timer',
    created_at: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate() +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
    story_url:'https://www.rvcordero.com/',
    story_id: 10001102
  }]
  const view = render(<ListOfNews news={news}/>)
  expect(view.container).toHaveTextContent('Just now')
})


test('If story_title its null, show message', ()=>{
  const news = [{
    author:'Rosa Vanessa Cordero',
    story_title:null,
    created_at: '2022-04-05T13:24:52.000Z',
    story_url:'https://www.rvcordero.com/',
    story_id: 10001102
  }]
  const view = render(<ListOfNews news={news}/>)
  expect(view.container).toHaveTextContent('Ops, someone forgot to write the title of this news. :(')
})