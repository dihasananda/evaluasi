import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data,setData] = useState([])

  // untuk mendapatkan data
  function getData() {
    axios.get('http://localhost:3001/trello')
    .then(hasil=>setData(hasil.data))
    console.log(data)
  }
  
  // yang dilakukan setiap ada perubahan
  useEffect(() => {
    getData()
  
    return () => {
      
    }
  }, [])
  
  // submit data
  function handleSubmit(e){
    e.preventDefault()
    const value = e.target.submit.value
    axios.post('http://localhost:3001/trello',{name:value})
    .then(()=>getData())
  }

  
  return (
    <div>
      {/* header */}
      <div>
        Trello
      </div>

      {/* submit */}
      <div>
        <form onSubmit={handleSubmit}>
          <input name='submit'/>
          <button type='submit'>submit</button>
        </form>
      </div>

      {/* cards container */}
      <div>
        {/* card */}
        {
          data.map((value,index)=>{
            return (
              <div key={index}>{value.name}</div>
            )
          })
        }
      </div>
    </div>

  );
}

export default App;
