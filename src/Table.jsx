import styles from './styles.module.css'
import { DrinkCard } from './DrinkCard'

export function Table({data,setDrink,setMode}){
  

    return(

    <div className={styles.grid}>
        {data.map((instance, idx) => (
            <DrinkCard 
            key={idx + instance.name} 
            info={instance} 
            setMode={setMode}
            setDrink={setDrink}
            />
        ))}
    </div>
    )
}