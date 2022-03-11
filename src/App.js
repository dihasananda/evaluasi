import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // menyimpan data dari db.json
  const [data, setData] = useState([])
  // pointer untuk edit card
  const [edit, setEdit] = useState(null)
  // pointer untuk tambah item pada card
  const [add, setAdd] = useState(null)
  // buka tutup submit
  const [submit, setSubmit] = useState(false)

  // untuk mendapatkan data
  function getData() {
    axios.get('http://localhost:3001/trello')
      .then(hasil => setData(hasil.data))
    console.log(data)
  }

  // dilakukan setiap ada perubahan
  useEffect(() => {
    getData()

    return () => {

    }
  }, [])

  // submit data 
  function handleSubmit(e) {
    e.preventDefault()
    const value = e.target.submit.value
    // console.log(value)
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

  // menyimpan card yang telah diedit
  function handleEdit(e) {
    e.preventDefault()
    const value = e.target.save.value
    // console.log(value)
    if (value !== '')
      axios.patch(`http://localhost:3001/trello/${data[edit].id}`, { name: value })
        .then(() => { getData(); setEdit(null) })
  }

  // menambah item dalam card, tapi belum jadi :)
  function handleAdd(e) {
    e.preventDefault()
    const value = e.target.add.value
    if (value !== '') setAdd(null)
  }

  return (
    // body
    <div className='p-5 grid grid-rows-1 gap-2'>

      {/* header */}
      <div className='text-center text-xl bg-blue-100 py-5'>
        Trello
      </div>

      {/* cards container */}
      <div className='grid grid-cols-3 bg-blue-100 gap-2 p-4'>

        {/* card */}
        {data.map((value, index) => {
          return (
            <div key={index} className='bg-red-100 p-2'>
              {edit !== index ?
                <div>
                  <div className='m-1'>{value.name}</div>
                  <button className='p-2 bg-green-100 m-1' onClick={() => setEdit(index)} >e</button>
                  <button className='p-2 bg-red-200 m-1' onClick={() => handleDelete(value.id)}>x</button>
                </div>
                :
                <form onSubmit={handleEdit}>
                  <input className='p-2 m-1' name='save' defaultValue={value.name} />
                  <button className='p-2 bg-blue-200 m-1' >save</button>
                </form>}

              {/* tambah data, tapi belum jadi :) */}
              {add !== index ?
                <button className='p-2 bg-blue-200 m-1 w-full' onClick={() => setAdd(index)}>+</button>
                :
                <form onSubmit={handleAdd}>
                  <input className='p-2 m-1' name='add' />
                  <button className='p-2 bg-blue-200 m-1' >add</button>
                </form>
              }
              <div className='p-2 bg-white m-1 w-full'>
                <div>programming</div>
                <button className='p-2 bg-green-100 m-1' onClick={() => setEdit(index)} >e</button>
                <button className='p-2 bg-red-200 m-1' onClick={() => handleDelete(value.id)}>x</button>

              </div>
            </div>
          )
        })
        }

        {/* submit */}
        <div className='bg-red-200 p-2' >
          {submit ?
            <form onSubmit={handleSubmit}>
              <input className='p-2 m-1' name='submit' />
              <button className='p-2 bg-blue-200 m-1' type='submit'>submit</button>
              <button className='p-2 bg-red-300 m-1' onClick={() => setSubmit(false)}>x</button>
            </form>
            :
            <div>
              <button className='w-full bg-blue-300 p-2' onClick={() => setSubmit(true)}>Tambah kartu</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
