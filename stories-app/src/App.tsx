import './App.css'
import { ReactNode, useState } from 'react';
import { useEffect } from 'react';

interface story {
  title: string;
  url: string;
  author: string;
  num_comments: number
  points: number;
  objectID: number;
}
const initialStories = [
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

interface InputWithLabelProps {
  id: string;
  value: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  children: ReactNode;
 }
const InputWithLabel = ({id, value, onInputChange, type, children}: InputWithLabelProps) => (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} value={value} type={type} onChange={onInputChange}/>
    </>
    );

    const getAsyncStories = () =>
  new Promise((resolve) =>
  setTimeout(
    () => resolve({ data: { stories: initialStories } }),
    2000
  ));
  


const App = () => {
  const [searchTerm, setSearchterm] = useState(localStorage.getItem('search') || 'React');
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getAsyncStories().then((result: any) => {
      setStories(result.data.stories);
    });
  }, []);
  
  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const search =(event.target as HTMLInputElement)
    setSearchterm(search.value)
  };

  const handleRemoveStory = (item: any) => {
    const newStories = stories.filter(
      (story: story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  };


  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const searchedStories = stories.filter(function (story: story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <>
     <div>
      <h1>
        Hello World
      </h1>
      <InputWithLabel id='search' type="text" value={searchTerm} onInputChange={handleSearch}>Search:adada </InputWithLabel>
      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
    </div>
    </>
  )
}
interface ListProps {
  list: any;
  onRemoveItem: (item: typeof Item) => void;
 }
const List = ({list, onRemoveItem}: ListProps) => (
    <ul>
      {list.map((item: any) => (
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/> 
      ))}
    </ul>
  );
  interface ItemProps {
    item: any;
    onRemoveItem: (item: any) => void;
   }
const Item = ({item, onRemoveItem}: ItemProps) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };
  return(
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>
      {item.author}
    </span>
    <span>
      {item.points}
    </span>
    <span><button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button></span>
  </li>
)}

export default App
