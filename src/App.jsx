import { useEffect, useState } from 'react'
import styles from './styles.module.css'

import { Table } from './Table'
import { DrinkPage } from './DrinkPage'
import { DrinkForm } from './DrinkForm'


function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  var [data,setData] = useState(null)
  var [dataView,setDataView] = useState(null)
  var [searchInput,setSearch] = useState("")
 
  // valid modes are explore,detailed, add
  var [focusDrink,setDrink] = useState(null)
  var [mode,setMode] = useState("explore")


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/');
        const result = await response.json();
        setData(result);
        setDataView(result)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function search(target){
    var results = data.filter((drink)=>{
      return drink.name.toLowerCase().includes(target.toLowerCase())
    })
    setDataView(results)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mode === "explore"){
  return (
    <div >
      <div id={styles.search}>
        <input 
        type='text'
        placeholder='Search for a cocktail...'
        value={searchInput}
        onChange={
          (e)=>{
            setSearch(e.target.value)
            search(e.target.value)
          }}
        />
        <button 
        onClick={()=>{search(searchInput)}}
        >
          Search
        </button>
      </div>
      <button 
      id={styles.addButton}
      onClick={()=>{setMode("add")}}
      >
        Add Cocktail
      </button>

      <Table
       data={dataView}
       setDrink = {setDrink}
       setMode={setMode}
       />
    </div>
  )
}
else if(mode === 'detailed'){
 return (
 <DrinkPage
  drinkInfo={focusDrink} 
  setMode={setMode}
  resetFocus={()=>{setDrink(null)}}
  />)
}

else if (mode === 'add'){
  return (
  <DrinkForm
  defaultValue={focusDrink}
  onCancel={()=>{setMode('explore')}}
  />)
}
}
export default App
