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
      <div class="image" v-for="joke in jokes" :key="joke._id">
        <div class="box">
          <h2>{{joke.description}}</h2>
          <p>-{{joke.title}}</p>
          <div>
            <div>
              <div v-if="punId !== joke._id" class="button" @click="selectJoke(joke)">
                Comments
              </div>
              <div class="comments" v-if="punId === joke._id">
                <div class="input">
                  <div class="comment-button" @click="deselectJoke()">
                    Close Comments
                  </div>
                </div>
                <div class="the-comments">
                  <div v-if="joke.comments.length === 0" class="no-comment">
                    There are no comments.
                  </div>
                  <div class="user-comments" v-for="comment in joke.comments" :key="comment._id">
                    "{{comment}}"
                  </div>
                </div>
                <div class="input">
                  <div class="comment-button" v-if="open && !adding" @click="change()">
                    Add A Comment
                  </div>
                  <div class="adding" v-if="adding">
                    <div class="add-comment">
                      <textarea v-model="userComment" placeholder="Type your comment here"></textarea>
                    </div>
                    <div class="comment-button" @click="addComment(joke)">
                      Save Comment
                    </div>
                  </div>
                </div>
              </div>
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
     jokes: [],
     punId: "",
     comments: [],
     userComment: "",
     open: false,
     adding: false,
     commentsOpen: false,
     createComment: null,
    }
  },
  created() {
    this.getJokes();
  },
  methods: {
    async getJokes() {
      try {
        let response = await axios.get("/api/jokes");
        this.jokes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    change() {
      this.typing = true;
      this.adding = true;
      this.userComment = "";
    },
    async addComment(userJoke) {
      userJoke.comments.push(this.userComment);
      console.log(userJoke.comments)
      let userComments = userJoke.comments;
      let theTitle = userJoke.title;
      let theDescription = userJoke.description;
     try {
       await axios.put("/api/jokes/" + userJoke._id, {
         title: theTitle,
         description: theDescription,
         comments: userComments,
       });
       this.getJokes();
       this.adding = false;
       return true;
     } catch (error) {
       console.log(error);
     }
   },
    selectJoke(userJoke) {
      this.punId = userJoke._id;
      this.open = true;
      console.log("theId: " + this.theId)
    },
    deselectJoke() {
      this.punId = "";
      this.adding = false;
    }
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
.intro p {
  font-size: 30px;
}
.box p {
  font-style: italic;
}
.button {
  width: 230px;
}
.button a {
  color: white;
}
.button a:hover {
  text-decoration: none;
  color: orange;
}
.comment-button a {
  color: white;
}
.comment-button a:hover {
  text-decoration: none;
  color: orange;
}

.comment-button {
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  width: 300px;
  margin: 10px 0;
  border-radius: 3px;
  color: white;
  background-color: orange;
}
.comment-button:hover {
  background-color: white;
  color: orange;
  border: 1px solid orange;
}
.the-comments {
  background-color: white;
  color: black;
  text-align: center;
}
.comments {
  width: 90vw;
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
  justify-content: flex-end;
  width: 100%;
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
