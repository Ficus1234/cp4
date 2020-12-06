<template>
<div class="admin">
  <div class="heading">
    <h2>Was the joke that bad? Change or delete it here.</h2>
  </div>

  <div class="image" v-for="item in items" :key="item.id">
    <div class="box-edit">
      <div class="information">
        <p>{{item.description}}</p>
        <p>submitted by: {{item.title}}</p>
      </div>
      <div class="pun-edit" v-if="theId === item._id">
        <textarea v-model="findJoke.description" placeholder="Pun Here"></textarea>
        <input v-model="findJoke.title" placeholder="Name Here">
      </div>
      <div class="options">
        <div class="button-1" @click="deleteItem(item)">
          Delete
        </div>
        <div v-if="theId !== item._id" class="button-1" @click="selectJoke(item)">
          Edit
        </div>
        <div v-if="theId === item._id" class="button-1" @click="editItem(findJoke)">
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
        file: null,
        addItem: null,
        items: [],
        findTitle: "",
        findItem: null,
        //new
        findJoke: null,
        theId: "",
        editing: true,
      }
    },
    computed: {
      suggestions() {
        let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
        return items.sort((a, b) => a.title > b.title);
      }
    },
    created() {
      this.getItems();
    },
    methods: {
      fileChanged(event) {
        this.file = event.target.files[0]
      },
      async upload() {
        try {
          //const formData = new FormData();
          //formData.append('photo', this.file, this.file.name)
          //let r1 = await axios.post('/api/photos', formData);
          let kkkk = await axios.post('/api/items', {
            title: this.title,
            description: this.description,
            //path: r1.data.path
          });
          this.addItem = kkkk.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getItems() {
        try {
          let response = await axios.get("/api/items");
          this.items = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      selectItem(item) {
        this.findTitle = "";
        this.findItem = item;
      },
      //New
      selectJoke(item) {
        this.findJoke = item;
        this.theId = item._id;
        console.log("theId: " + this.theId)
      },
      async deleteItem(item) {
        try {
          await axios.delete("/api/items/" + item._id);
          this.findJoke = null;
          this.getItems();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editItem(item) {
       try {
         await axios.put("/api/items/" + item._id, {
           title: this.findJoke.title,
           description: this.findJoke.description,
         });
         this.findJoke = null;
         this.getItems();
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
