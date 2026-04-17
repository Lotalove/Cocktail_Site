import styles from './styles.module.css'

export function DrinkCard (props){
  
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