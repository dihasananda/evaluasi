import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // menyimpan data dari db.json
  const [data, setData] = useState([])
  // pointer untuk edit data
  const [edit, setEdit] = useState(null)

  // untuk mendapatkan data
  function getData() {
    axios.get('http://localhost:3001/trello')
      .then(hasil => setData(hasil.data))
    console.log(data)
  }

  // yang dilakukan setiap ada perubahan
  useEffect(() => {
    getData()

    return () => {

    }
  }, [])

  // submit data
  function handleSubmit(e) {
    e.preventDefault()
    const value = e.target.submit.value
    console.log(value)
    if (value !== '')
      axios.post('http://localhost:3001/trello', { name: value })
        .then(() => {
          getData()
          e.target.submit.value = ''
        })
  }

  // menghapus data
  function handleDelete(index) {
    axios.delete(`http://localhost:3001/trello/${index}`)
      .then(() => getData())
  }

  // menyimpan data yang telah diedit
  function handleEdit(e) {
    e.preventDefault()
    const value = e.target.save.value
    // console.log(value)
    axios.patch(`http://localhost:3001/trello/${data[edit].id}`, { name: value })
      .then(() => { getData(); setEdit(null) })
  }

  return (
    // body
    <div className='p-5 grid grid-rows-1 gap-2'>

      {/* header */}
      <div className=''>
        Trello
      </div>

      {/* submit */}
      <div>
        <form onSubmit={handleSubmit}>
          <input className='p-2' name='submit' />
          <button className='p-2' type='submit'>submit</button>
        </form>
      </div>

      {/* cards container */}
      <div className='grid grid-cols-3 bg-blue-100 gap-2 p-2'>
        {/* card */}
        {
          data.map((value, index) => {
            return (
              edit !== index ?
                <div key={index} className='bg-red-100 p-2'>
                  <div>{value.name}</div>
                  <button className='p-2 bg-green-100 mx-1' onClick={() => setEdit(index)} >e</button>
                  <button className='p-2 bg-red-200 mx-1' onClick={() => handleDelete(value.id)}>x</button>
                  <button className='p-2 bg-blue-200 mx-1'>+</button>
                </div>
                :
                <form key={index} onSubmit={handleEdit}>
                  <input name='save' defaultValue={value.name} />
                  <button className='p-2 bg-blue-200 mx-1' >save</button>
                </form>
            )
          })
        }
      </div>
    </div>

  );
}

export default App;
