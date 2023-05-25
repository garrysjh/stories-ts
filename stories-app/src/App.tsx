import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';


interface InputWithLabelProps {
  id: string;
  label: string;
  value: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
 }
const InputWithLabel = ({id, label, value, onInputChange, type}: InputWithLabelProps) => (
    <>
      <label htmlFor={id}>{label} </label>
      <input id={id} value={value} type={type} onChange={onInputChange}/>
    </>
    );

  


const App = () => {
  const [searchTerm, setSearchterm] = useState(localStorage.getItem('search') || 'React');
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
  
  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const search =(event.target as HTMLInputElement)
    setSearchterm(search.value)
  };

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <>
     <div>
      <h1>
        Hello World
      </h1>
      <InputWithLabel id='search' label="Search: " type="text" value={searchTerm} onInputChange={handleSearch}/>
      <List list={searchedStories}/>
    </div>
    </>
  )
}
const List = (props: any) => {
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
