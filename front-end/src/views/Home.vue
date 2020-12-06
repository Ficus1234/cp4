<template>
  <div class="home">
    <div class="intro">
      <p>
        You have entered the emporium of horrible puns and jokes; peruse at your own risk.
        Please do add your driest and most wretched puns to our collection.
      </p>
      <div class="button">
        <router-link to="/submit">Add to the Wretchedness</router-link>
      </div>
    </div>
    <section class="image-gallery">
      <div class="image" v-for="item in items" :key="item.id">
        <div class="box">
          <h2>{{item.description}}</h2>
          <p>-{{item.title}}</p>
          <div class="input">
            <div class="rating">
              rating
            </div>
            <div class="comments">
              comments
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.home {
  margin-bottom: 75px;
}

.intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 3px;
}
.box p {
  font-style: italic;
}

.button a {
  color: white;
}
.button a:hover {
  text-decoration: none;
  color: orange;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.box {
  padding: 10px 0;
  color: white;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
}
.box h2 {
  text-align: center;
}
.input {
  display: flex;
  justify-content: space-between;
  width: 50%;
}


/* Masonry on large screens */
@media only screen and (min-width: 1024px) {

}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {

}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {

}
</style>
