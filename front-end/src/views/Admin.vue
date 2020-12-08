<template>
<div class="admin">
  <div class="heading">
    <h2>Was the joke that bad? Change or delete it here.</h2>
  </div>

  <div class="image" v-for="joke in jokes" :key="joke.id">
    <div class="box-edit">
      <div class="information">
        <p>{{joke.description}}</p>
        <p>submitted by: {{joke.title}}</p>
      </div>
      <div class="pun-edit" v-if="theId === joke._id">
        <textarea v-model="findJoke.description" placeholder="Pun Here"></textarea>
        <input v-model="findJoke.title" placeholder="Name Here">
      </div>
      <div class="options">
        <div class="button-1" @click="deleteJoke(joke)">
          Delete
        </div>
        <div v-if="theId !== joke._id" class="button-1" @click="selectJoke(joke)">
          Edit
        </div>
        <div v-if="theId === joke._id" class="button-1" @click="editJoke(findJoke)">
          Save
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Admin',
    data() {
      return {
        title: "",
        description: "",
        addTheJoke: null,
        jokes: [],
        comments: [],
        findJoke: null,
        theId: "",
        editing: true,
      }
    },
    created() {
      this.getJokes();
    },
    methods: {
      async upload() {
        try {
          let pun = await axios.post('/api/jokes', {
            title: this.title,
            description: this.description,
          });
          this.addTheJoke = pun.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getJokes() {
        try {
          let response = await axios.get("/api/jokes");
          this.jokes = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      selectJoke(userJoke) {
        this.findJoke = userJoke;
        this.theId = userJoke._id;
        console.log("theId: " + this.theId)
      },
      async deleteJoke(userJoke) {
        try {
          await axios.delete("/api/jokes/" + userJoke._id);
          this.findJoke = null;
          this.getJokes();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editJoke(userJoke) {
       try {
         await axios.put("/api/jokes/" + userJoke._id, {
           title: this.findJoke.title,
           description: this.findJoke.description,
         });
         this.findJoke = null;
         this.getJokes();
         this.theId = "";
         return true;
       } catch (error) {
         console.log(error);
       }
     },
    }
  }
</script>

<style scoped>
.pun-edit {
  display: flex;
  align-items: center;
}
.information {
  display: flex;
  flex-direction: column;
}
.button-1 {
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  width: 120px;
  border-radius: 3px;
  color: white;
  background-color: orange;
}
.button-1:hover {
  background-color: white;
  color: orange;
  border: 1px solid orange;
}
.button-1 {
  margin: 5px 10px;
}
.button-1 a {
  color: white;
}
.button-1 a:hover {
  text-decoration: none;
  color: orange;
}
.box-edit {
  margin: 30px 0 75px 20px;
}
.options {
  display: flex;
}
.input-box {
  display: flex;
}

.h1 {
  width: 200px;
}

.heading {
  display: flex;
  margin: 20px;
  max-width: 90vw;
}

.add-header {
  font-size: 20px;

}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}
input,
button,
textarea {
  margin: 10px;
}
input {
  height: 25px;
}

.form {
  padding: 10px;
  background-color: grey;

}

.form-2 {
  margin-right: 10px;
  padding: 10px;
  background-color: grey;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.upload-2 h2 {
  margin: 0px;
}

.upload-2 img {
  max-width: 210px;
}

.selected {
  display: flex;
  flex-direction: column;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
@media only screen and (max-width: 470px) {
  .pun-edit {
    flex-direction: column;
  }
  .options {
    justify-content: center;
  }
  .information {
    align-items: center;
    text-align: center;
  }
  .heading h2 {
    text-align: center;
  }
  .edit {
    flex-direction: column;
  }
  .form {
    width: 90vw;
  }
}
@media only screen and (max-width: 695px) {
  .upload-2 {
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (min-width: 696px) {
  .upload-2 {
    display: flex;
    flex-direction: column;
  }
}
</style>
