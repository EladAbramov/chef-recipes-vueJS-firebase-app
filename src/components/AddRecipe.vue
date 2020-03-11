<template>
  <div class="add-recipe container">
    <h2 class="center-align indigo-text">Add New Chef Recipe</h2>
    <form @submit.prevent="addRecipe">
      <div class="field title">
        <label for="title">Recipe Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="message" class="red-text">{{ message }}</p>
        <button class="btn pink">Add Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddRecipe',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      message: null,
      slug: null
    }
  },
  methods: {
    addRecipe(){
      if(this.title){
        this.message = null
        // Create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('recipes').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
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
        this.ingredients.push(this.another)
        this.another = null
        this.message = null
      }else{
        this.message = 'You must enter a value to add ingredient'
      }
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }// methods
}// export
</script>

<style>
  .add-recipe {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }
  .add-recipe h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .add-recipe .field {
    margin: 20px auto;
    position: relative;
  }
  .add-recipe .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>
