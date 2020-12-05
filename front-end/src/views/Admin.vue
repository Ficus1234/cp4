<template>
<div class="admin">
  <h1 class="h1">The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2 class="add-header">Add an Item</h2>
  </div>
  <div class="add">
    <div class="form">
      <div class="input-box">
        <input v-model="title" placeholder="Title">
        <textarea v-model="description" placeholder="Description"></textarea>
      </div>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addItem">
      <div class="upload-box">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
        <p>{{addItem.description}}</p>
      </div>
    </div>
  </div>
  <div class="heading">
    <div class="circle">2</div>
    <h2>Edit/Delete an Item</h2>
  </div>
  <div class="edit">
    <div class="form-2">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="selected">
      <div class="upload-2" v-if="findItem">
        <input v-model="findItem.title">
        <textarea v-model="findItem.description" placeholder="Description"></textarea>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Save Changes</button>
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
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/items', {
            title: this.title,
            description: this.description,
            path: r1.data.path
          });
          this.addItem = r2.data;
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
      async deleteItem(item) {
        try {
          await axios.delete("/api/items/" + item._id);
          this.findItem = null;
          this.getItems();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editItem(item) {
       try {
         await axios.put("/api/items/" + item._id, {
           title: this.findItem.title,
           description: this.findItem.description,
         });
         this.findItem = null;
         this.getItems();
         return true;
       } catch (error) {
         console.log(error);
       }
     },
    }
  }
</script>

<style scoped>
.input-box {
  display: flex;
}
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.h1 {
  width: 200px;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 200px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
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
@media only screen and (max-width: 515px) {
  .input-box {
    flex-direction: column;
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
