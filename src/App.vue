<template>
  <div id="app">
    <canvas-lines id="canvas"/>
    <div class="header">
      <a class="site-title" href="/" @click.stop.prevent="$router.push({ path: '/' })">Wind Rises X</a>
      <a href="https://github.com/WindRisesX"><img class="site-fork" style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" alt="Fork me on GitHub"></a>
    </div>
    <p class="site-subtitle">
        Be Your Personal Best
    </p>
    <main>
      <router-view/>
    </main>
    <span id="site_pv">{{sitePV}}℃</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "./API";

import CanvasLines from './components/CanvasLines';

export default {
  components: {
    CanvasLines
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
}

html, body {
  height: 100%;
  margin: 0;
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
  padding-top: 50px;
  margin: 0 auto 15px;
  text-align: center;

  .site-title {
    font-size: 20px;
    color: #444;
    font-family: Lato,"PingFang SC","Microsoft YaHei",sans-serif;
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
.site-subtitle {
  margin-bottom: 60px;
  text-align: center;
  font-family: $font-fmaily;
  font-size: 13px;
  color: #999;
  font-family: Lato,"PingFang SC","Microsoft YaHei",sans-serif;
}

main {
  max-width:700px;
  margin: 50px auto;
  padding: 0 30px 50px;
  position: relative;
}

/*
* 适配移动端
*/
@media screen and (max-width: 420px) {
  .header {
    margin: 0 auto 10px;
    padding-top: 40px;

    .site-fork {
      height: 100px;
      width: 100px;
    }
  }
  
  main {
    padding: 0 10px 50px;
  }
}
</style>
