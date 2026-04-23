import { useState } from 'react'
import styles from './styles.module.css'


export function DrinkForm({ defaultValue ,onCancel }) {
  const [formData, setFormData] = useState(defaultValue?{
    name: defaultValue.name,
    category: defaultValue.category,
    instructions: defaultValue.method,
    ingredients: defaultValue.ingredients,
  }:{
    name: '',
    category: '',
    instructions: '',
    ingredients: [{quantity: '', ingredient: ''}],
  })



  const onSubmit = async (e)=>{
    e.preventDefault()
    const formattedIngredients = formData.ingredients.map(ing => ({
      unit: "ml",
      quantity: ing.quantity,
      direction: `${ing.quantity} ml ${ing.ingredient}`,
      ingredient: ing.ingredient
    }))
    const dataToSend = {
      ...formData,
      ingredients: formattedIngredients
    }

    if (defaultValue){dataToSend.id = defaultValue.id}
    var url = defaultValue?import.meta.env.VITE_API_URL+"/editDrink":import.meta.env.VITE_API_URL+"/addDrink"
    const response = await fetch(url,
    {method:"POST",
      headers: {
      "Content-Type": "application/json", // Tells the server to expect JSON
    },
      body:JSON.stringify(dataToSend)
    })
    var responseData =await response.json() 
    alert(responseData.message)
    
    if (responseData.success) {
      window.location.reload()
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }))
  }

  const addIngredientField = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, {quantity: '', ingredient: ''}]
    }))
  }

  const removeIngredientField = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }))
    }
  }

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2>Create New Cocktail</h2>
          <p className={styles.formSubtitle}>Add a delicious new drink to our collection</p>
        </div>

        <form className={styles.form}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Cocktail Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Margarita"
              className={styles.formInput}
              required
            />
          </div>


          {/* Ingredients Section */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Ingredients *</label>
            <div className={styles.ingredientsList}>
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className={styles.ingredientRow}>
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    placeholder="Quantity (e.g., 45)"
                    className={styles.formInput}
                  />
                  <input
                    type="text"
                    value={ingredient.ingredient}
                    onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                    placeholder="Ingredient (e.g., Tequila)"
                    className={styles.formInput}
                  />
                  {formData.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientField(index)}
                      className={styles.removeButton}
                      title="Remove ingredient"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addIngredientField}
              className={styles.addIngredientButton}
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions Field */}
          <div className={styles.formGroup}>
            <label htmlFor="instructions" className={styles.label}>Instructions *</label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Describe how to prepare this cocktail..."
              className={styles.formTextarea}
              rows="5"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              onClick={onSubmit}
            >
              {defaultValue?"Submit Changes":"Create Cocktail"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
