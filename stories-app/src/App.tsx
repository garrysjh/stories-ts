import './App.css'
import { useState } from 'react';


const Search = () => {
  const [searchTerm, setSearchterm] = useState('');
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const search =(event.target as HTMLInputElement)
    setSearchterm(search.value)
  };
  return ( 
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>
      <p>Searching for {searchTerm}</p>
    </div>
  )
}


const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  return (
    <>
     <div>
      <h1>
        Hello World
      </h1>
      <Search/>
      <List list={stories}/>
    </div>
    </>
  )
}
function List(props: any){
  return (
    <ul>
      {props.list.map((item: any) => (
          <Item key={item.objectID} item={item}/> 
      ))}
    </ul>
  );
}
function Item(props: any) {
  return(
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>
      {props.item.author}
    </span>
    <span>
      {props.item.points}
    </span>
  </li>
)}

export default App
