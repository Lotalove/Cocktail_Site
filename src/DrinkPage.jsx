import styles from './styles.module.css'

export function DrinkPage({drinkInfo, setMode,resetFocus}){
    return(
        <div className={styles.drinkPageContainer}>
            <button 
                className={styles.backButton}
                onClick={() => {
                                setMode("explore")
                                resetFocus()
                            }}
            >
                ← Back
            </button>
            
            <div className={styles.drinkPageContent}>
                <div className={styles.drinkHeader}>
                    <span className={styles.drinkCategory}>{drinkInfo.category}</span>
                    <h1 className={styles.drinkName}>{drinkInfo.name}</h1>
                </div>

                <div className={styles.drinkSection}>
                    <h2 className={styles.sectionTitle}>Ingredients</h2>
                    <ul className={styles.ingredientsList}>
                        {drinkInfo.ingredients.map((item, index) => (
                            <li key={index} className={styles.ingredientItem}>
                                <span className={styles.ingredientName}>{item.ingredient}</span>
                                <span className={styles.ingredientAmount}>
                                    {item.quantity} {item.unit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {drinkInfo.garnish && (
                    <div className={styles.drinkSection}>
                        <h2 className={styles.sectionTitle}>Garnish</h2>
                        <p className={styles.garnishText}>{drinkInfo.garnish}</p>
                    </div>
                )}

                <div className={styles.drinkSection}>
                    <h2 className={styles.sectionTitle}>Method</h2>
                    <p className={styles.methodText}>{drinkInfo.method}</p>
                </div>
            </div>
        </div>
    )
}