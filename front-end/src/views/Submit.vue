<template>
  <div class="add">
    <h3>Add A Pun To Our Collection:</h3>
    <div class="form">
      <div class="input-box">
        <textarea v-model="description" placeholder="Your Pun or Joke Here"></textarea>
        <input v-model="title" placeholder="Username">
      </div>
      <div class="upload-2" v-if="findJoke">
        <input v-model="findJoke.title">
        <textarea v-model="findJoke.description" placeholder="Description"></textarea>
        <img :src="findJoke.path" />
      </div>
      <div class="button" @click="upload">Upload</div>
    </div>
    <div class="upload" v-if="addTheJoke">
      <div class="upload-box">
        <p>Upload Successful!</p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'Submit',
    data() {
      return {
        title: "",
        description: "",
        addTheJoke: null,
        findJoke: null,
      }
    },
    methods: {
      async upload() {
        try {
          let joke = await axios.post('/api/jokes', {
            title: this.title,
            description: this.description,
          });
          this.addTheJoke = joke.data;
        } catch (error) {
          console.log(error);
        }
      },
    }
  }
</script>
<style>
  h3 {
    background-color: orange;
    padding-top: 200px;
    margin-bottom: 200px;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 70px;
    height: 20vh;
  }
  .input-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90vw;
  }
  .button {
    display: flex;
    justify-content: center;
    padding: 10px 20px;
    width: 120px;
    border-radius: 3px;
    color: white;
    background-color: orange;
  }
  .button:hover {
    background-color: white;
    color: orange;
    border: 1px solid orange;
  }
</style>
