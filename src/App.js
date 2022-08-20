import { useState } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=kr&apiKey=9d3d84ca6daa4cb7a27ee3a9492e524b')
      setData(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} readOnly={true}></textarea>}
    </div>
  )
}
export default App;