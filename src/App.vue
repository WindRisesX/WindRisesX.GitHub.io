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
    <nav class="site-nav">
      <ul id="menu">
        <li class="menu-item menu-item-home">
          <a @click.prevent="$router.push({name: 'PostList'})">
            <i class="menu-item-icon icon-home"></i>
            <br>
            首页
          </a>
        </li>
        <!-- <li class="menu-item menu-item-categories">
          <a @click.prevent="$router.push({name: 'Categories'})">
            <i class="menu-item-icon icon-th"></i>
            <br>
            分类
          </a>
        </li> -->
        <li class="menu-item menu-item-tags">
          <a @click.prevent="$router.push({name: 'Tags'})">
            <i class="menu-item-icon icon-tags"></i>
            <br>
            标签
          </a>
        </li>
        <li class="menu-item menu-item-archive">
          <a @click.prevent="$router.push({name: 'Archive'})">
            <i class="menu-item-icon icon-box"></i>
            <br>
            归档
          </a>
        </li>
        <li class="menu-item menu-item-about">
          <a @click.prevent="$router.push({name: 'About'})">
            <i class="menu-item-icon icon-user"></i>
            <br>
            关于
          </a>
        </li>
        <!-- <li class="menu-item menu-item-images">
          <a @click.prevent="$router.push({name: 'Images'})">
            <i class="menu-item-icon icon-images"></i>
            <br>
            摄影
          </a>
        </li> -->
      </ul>
    </nav>
    <main>
      <router-view/>
    </main>
    <span id="site_pv">{{siteUV}}°F / {{sitePV}}℃</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "./API";

import CanvasLines from "./components/CanvasLines";

export default {
  components: {
    CanvasLines
  },
  computed: {
    ...mapState(["sitePV", "siteUV"])
  },
  methods: {
    ...mapMutations(["setPostList" , "setSitePV", "setSiteUV"]), 
    busuanziCallBack(err, data) {
      if (err) {
        Raven.captureException(err);
      } else {
        this.setSitePV(data.site_pv);
        this.setSiteUV(data.site_uv);
      }
    }
  },
  created() {
    API.getList()
      .then(list => {
        list.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          if (a.date > b.date) {
            return -1;
          }
          return 0;
        });
        this.setPostList(list);
      })
      .catch(err => {
        Raven.captureException(err);
      });
    API.busuanzi(this.busuanziCallBack)
  }
};
</script>

<style lang="scss">
@import "./style/icon.css";


$font-fmaily: "Roboto", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro", Arial,
  serif;

#app {
  font-family: $font-fmaily;
}

html,
body {
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
    font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
  }
}

#menu {
  padding: 20px 0;
  text-align: center;

  .menu-item {
    display: inline-block;
    margin: 0 12px;
    list-style: none;

    a {
      display: block;
      color: #555;
      font-size: 13px;
      line-height: inherit;
      border-bottom: 1px solid transparent;
      transition-property: border-color;
    }
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
    opacity: 0.8;
  }
}
.site-subtitle {
  margin-bottom: 10px;
  text-align: center;
  font-family: $font-fmaily;
  font-size: 13px;
  color: #999;
  font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
}

main {
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 50px;
  padding: 50px 30px 50px;
  position: relative;
}

.icon-home:before {
  font-size: 14px;
}
.icon-tags:before {
  font-size: 16px;
}

.icon-user:before {
  font-size: 16px;
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

  // #menu {
  //   display: none;
  // }

  main {
    padding: 50px 10px 50px;
  }
}
</style>