<template>
  <div id="app">
    <div class="header">
      <a href="/" @click.stop.prevent="$router.push({ path: '/' })">{{userName}}</a>
    </div>
    <p class="links">
      <a :href="github" target="_blank" rel="noopener noreferrer nofollow">
        <img src="./assets/github.png">
      </a>
    </p>
  <main>
    <router-view/>
  </main>
  <span id="site_pv">view {{sitePV}} times</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "./API";
import {userName, github} from "./siteConfig"

export default {
  data() {
    return {
      userName,
      github
    }
  },
  computed: {
    ...mapState(['sitePV'])
  },
  methods: {
    ...mapMutations(["setPostList"])
  },
  created() {
    API.getList()
      .then(list => {
        list.sort((a, b) => {
          if (a.date < b.date) {
            return 1
          }
          if (a.date > b.date) {
            return -1
          }
          return 0
        });
        this.setPostList(list);
      })
      .catch(err => {
        Raven.captureException(err)
      });
  }
};
</script>

<style lang="scss">
$font-fmaily: "Roboto", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro", Arial,
  serif;

#app {
  font-family: $font-fmaily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
}

.header,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $font-fmaily;
  font-weight: 400;
  color: #444;
}

a {
  color: #666;
  text-decoration: none;
}

.header {
  letter-spacing: 3px;
  margin: 50px auto 15px;
  text-align: center;

  a {
    font-size: 15px;
    color: #444;
  }
}

#site_pv {
  position: fixed;
  bottom: 5px;
  right: 10px;
  color: #999;
  opacity: 0;
  transition: opacity 2s;

  &:hover {
    opacity: .8;
  }
}

@media screen and (max-width: 420px) {
  .header {
    margin: 40px auto 10px;
  }
}
.links {
  text-align: center;
  font-family: $font-fmaily;
  color: #999;
  font-size: 24px;
  margin: 0;

  a {
    cursor: pointer;
    padding: 2px;
    margin: 0 3px;
  }

  img {
    width: 15px;
    height: 15px;
    border: none;
  }
}

main {
  max-width: 600px;
  margin: 50px auto;
  padding: 0 30px 50px;
  position: relative;
}
@media screen and (max-width: 420px) {
  main {
    margin-top: 32px;
  }
}
</style>
