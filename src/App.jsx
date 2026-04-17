import { useState } from 'react'
import styles from './styles.module.css'
import cocktails from '../iba-cocktails-web.json'
import { Table } from './Table'
import { DrinkPage } from './DrinkPage'


function App() {
  var [data,setData] = useState(cocktails)
  var [searchInput,setSearch] = useState("")
  // valid modes are explore,detailed
  var [focusDrink,setDrink] = useState(null)
  var [mode,setMode] = useState("explore")


  function search(target){
    var results = cocktails.filter((drink)=>{
      return drink.name.toLowerCase().includes(target.toLowerCase())
    })
    setData(results)
  }
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
      id={styles.addButton}>
        Add Cocktail
      </button>

      <Table
       data={data}
       setDrink = {setDrink}
       setMode={setMode}
       />
    </div>
  )
}
else if(mode === 'detailed'){
 return <DrinkPage drinkInfo={focusDrink} setMode={setMode}/>
}

}
export default App
