import styles from './styles.module.css'

export function DrinkCard (props){

    async function deleteDrink(){
    var dataToSend = {id:props.info.id}
    var url ="http://localhost:3001/deleteDrink"
    const response = await fetch(url,
    {method:"POST",
      headers: {
      "Content-Type": "application/json", // Tells the server to expect JSON
    },
      body:JSON.stringify(dataToSend)
    })

    var responseData = await response.json()
    alert(responseData.message)
    
    if (responseData.success) {
      window.location.reload()
    }
  }

    return (
    <div 
    className={styles.card}
    onClick={
      ()=>{
        props.setMode('detailed')
        props.setDrink(props.info)
      }
    }
    >
      {props.info.category === "User Submitted" && (
        <div className={styles.buttonContainer}>
          <button 
            className={styles.editButton}
            onClick={(e) => {
              e.stopPropagation()
              props.setMode('add')
              props.setDrink(props.info)
            }}
          >
            ✏️
          </button>
          <button 
            className={styles.deleteButton}
            onClick={(e) => {
              e.stopPropagation()
              deleteDrink()
              console.log('Delete clicked for:', props.info.name)
            }}
          >
            🗑️
          </button>
        </div>
      )}

      
      <span className={styles.category}>{props.info.category}</span>
      <h2 className={styles.title}>{props.info.name}</h2>

      {/* <ul className={styles.ingredients}>
        {info.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul> */}
      <p className={styles.instructions}>{props.info.instructions}</p>
    </div>
  )
}