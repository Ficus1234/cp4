<template>
<div id="app">
    <b-navbar style="background-color: white" toggleable>
      <b-navbar-brand>

        <router-link id= header style="color: orange" to="/">
          <div id="header">
            <div class="logo">
              <img src="/orange.jpg">
            </div>
            <h1 class="title">Orange You Glad?</h1>
          </div>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/admin">Admin</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/submit">Submit a Pun</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <a href="https://github.com/BYU-CS-260-Winter-2020/lab-4-museum-of-ordinary-objects-Ficus1234">GitHub</a>
    </div>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

.logo {
  max-width: 50px;
}
.logo img {
  width: 100%;
  display: block;
}

/* Header */
#header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.navbar-brand a:hover{
  text-decoration: none;
}
.nav-link a {
  color: grey;
}
.nav-link a:hover{
  color: black;
  text-decoration: none;
}
.title{
  font-size: 30px;
}

.content {
  padding: 10px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
}

.footer a {
  color: #000;
  margin: 0 10px;
}

h1 {
  font-size: 20px;
  margin-left: 12px;
}

h2 {
  font-size: 14px;
}

@media only screen and (max-width: 350px) {
  #header {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  .logo {
    order: 2;
  }
  .title {
    order: 1;
  }
}
</style>
