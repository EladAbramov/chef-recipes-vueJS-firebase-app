<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2>Edit {{ recipe.title }} Recipe:</h2>
    <form @submit.prevent="editRecipe">
      <div class="field title">
        <label for="title">Recipe Title:</label>
        <input type="text" name="title" v-model="recipe.title">
      </div>
      <div v-for="(ing, index) in recipe.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="recipe.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="message" class="red-text">{{ message }}</p>
        <button class="btn pink">Update Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditRecipe',
  data(){
    return{
      recipe: null,
      another: null,
      message: null
    }
  },
  methods: {
    editRecipe(){
      if(this.recipe.title){
        this.message = null
        // Create a slug
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('recipes').doc(this.recipe.id).update({
          title: this.recipe.title,
          ingredients: this.recipe.ingredients,
          slug: this.recipe.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      }else{
        this.message = 'You must enter a chef recipe title'
      }
    },
    addIng(){
      if(this.another){
        this.recipe.ingredients.push(this.another)
        this.another = null
        this.message = null
      }else{
        this.message = 'You must enter a value to add ingredient'
      }
    },
    deleteIng(ing){
      this.recipe.ingredients = this.recipe.ingredients.filter(ingred => {
        return ingred != ing
      })
    }
  },
  created(){
    let ref = db.collection('recipes').where('slug', '==', this.$route.params.recipe_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data()
        this.recipe.id = doc.id
      })
    })
  }
}
</script>

<style>
  .edit-recipe {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }
  .edit-recipe h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .edit-recipe .field {
    margin: 20px auto;
    position: relative;
  }
  .edit-recipe .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
