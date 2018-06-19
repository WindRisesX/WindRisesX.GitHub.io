<template>
  <div id="post_container">
    <div class="post">
    <h3 class="date">{{date | DateFormat}} <span id="page_pv">{{pagePV}}℃</span></h3>
    <h1>{{title}}</h1>
    <div class="content"
      v-if="postContent"
      v-html="postContent" />
    <a v-if="hasNewer" href="/" id="newer" class="blog-nav" @click.stop.prevent="push(newerPost)"><&nbsp;NEWER</a>
    <a v-if="hasOlder" href="/" id="older" class="blog-nav" @click.stop.prevent="push(olderPost)">OLDER&nbsp;></a>
    <!-- <span id="page_pv">{{pagePV}}℃</span> -->
  </div>
  <div id="container"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Raven from "raven-js";
import config from "../gitmentConfig";
import fm from "front-matter";
import API from "../API";
import marked from "../utils/render.js";

export default {
  data() {
    return {
      title: "",
      date: "",
      sha: ""
    };
  },
  computed: {
    ...mapState(["postList", "postContent", "pagePV"]),
    ...mapGetters(["hasNewer", "hasOlder", "newerPost", "olderPost"])
  },
  methods: {
    ...mapMutations([
      "setPostContent",
      "setCurrentPostIndexBySha",
      "setPagePV",
      "setSiteUV",
      "setSitePV"
    ]),
    push(post) {
      this.$router.replace({ path: `/${post.date}/${post.title}/${post.sha}` });
    },
    gitmentRender() {
      const gitment = new Gitment({
        id: this.title,
        title: this.title,
        owner: config.owner,
        repo: config.repo,
        // labels: [this.title],
        oauth: {
          client_id: config.oauth.client_id,
          client_secret: config.oauth.client_secret
        }
      });
      gitment.render("container");
    },
    busuanziCallBack(err, data) {
      if (err) {
        Raven.captureException(err);
      } else {
        this.setSitePV(data.site_pv);
        this.setSiteUV(data.site_uv);
        this.setPagePV(data.page_pv);
      }
    }
  },
  watch: {
    postList() {
      this.setCurrentPostIndexBySha(this.sha);
    }
  },
  beforeRouteEnter(to, from, next) {
    window.document.title = `${to.params.title}`;
    API.getDetail(to.params.sha)
      .then(text => {
        return marked(fm(text).body);
      })
      .then(postContent => {
        next(vm => {
          vm.setCurrentPostIndexBySha(to.params.sha);
          vm.setPostContent(postContent);
          vm.title = to.params.title;
          vm.date = to.params.date;
          vm.sha = to.params.sha;
          vm.gitmentRender();
          API.busuanzi(vm.busuanziCallBack);
        });
      })
      .catch(err => {
        Raven.captureException(err);
      });
  },
  beforeRouteUpdate(to, from, next) {
    window.document.title = `${to.params.title}`;
    API.busuanzi(this.busuanziCallBack);
    API.getDetail(to.params.sha)
      .then(text => {
        this.setPostContent(marked(fm(text).body));
        this.setCurrentPostIndexBySha(to.params.sha);
        this.title = to.params.title;
        this.date = to.params.date;
        this.sha = to.params.sha;
        this.gitmentRender();
        next();
      })
      .catch(err => {
        Raven.captureException(err);
        next();
      });
  }
};
</script>



<style lang="scss" scoped>
#post_container {
  position: relative;
  // background: #fff;
}

.post {
  position: relative;
  padding: 25px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 0 14px #cacbcb;
  background: #fff;

  .date {
    font-size: 13px;
    color: #999;
    margin: 0 0 30px;
    letter-spacing: 1px;
  }

  h1 {
    font-size: 32px;
    margin: 0 0 45px;
    letter-spacing: 1px;
  }

  h1,
  h2 {
    text-transform: uppercase;
  }

  h3 {
    margin: 30px 0 15px;
  }

  .content {
    text-align: left;
    line-height: 1.8em;
  }

  #newer {
    left: 50px;
  }

  #older {
    right: 40px;
  }

  .blog-nav {
    position: fixed;
    bottom: 20px;
    height: 20px;
    line-height: 20px;
    font-family: "Montserrat", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro",
      Arial, sans-serif;
    font-size: 15px;
    color: #999;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 1px;
    border-bottom: 3px solid transparent;
  }

  .blog-nav:hover {
    color: #333;
    border-bottom-color: #333;
  }

  #page_pv {
    // position: absolute;
    display: line-block;
    padding-left: 10px;
    bottom: 2px;
    right: 2px;
    color: #999;
    font-size: 12px;
    opacity: 0.8;
    // opacity: 0;
    // transition: opacity 2s;

    // &:hover {
    //   opacity: .8;
    // }
  }
}

#container {
  padding: 25px;
  box-shadow: 0 0 14px #cacbcb;
  // background: #fff;
}

@media screen and (max-width: 900px) {
  .post {
    padding-bottom: 80px;

    #newer {
      left: 25px;
    }

    #older {
      right: 25px;
    }

    .blog-nav {
      position: absolute;
      bottom: 30px;
    }
  }
}

@media screen and (max-width: 420px) {
  .post {
    .date {
      font-size: 12px;
      margin: 0 0 20px;
    }
    h1 {
      font-family: "Montserrat", "Helvetica Neue", "Hiragino Sans GB",
        "LiHei Pro", Arial, sans-serif;
      font-size: 24px;
      margin: 0 0 30px;
    }

    h3 {
      font-size: 16px;
      line-height: 1.3em;
    }
  }
}
</style>


<style lang="scss">
@import "prismjs/themes/prism-solarizedlight.css";

.post {
  color: #555;

  h1,
  h2 {
    text-transform: uppercase;
  }

  h2 {
    font-size: 24px;
    margin: 60px 0 30px;
    position: relative;

    &:before {
      content: "";
      border-left: 5px solid #f66;
      position: absolute;
      left: -15px;
      height: 75%;
      top: 12%;
    }
  }

  h3 {
    margin: 30px 0 15px;
  }

  p,
  ol,
  ul {
    margin: 1em 0 1.5em;
  }

  pre {
    background: #f7f7f7 !important;
    padding: 16px;
    overflow-x: auto;
    white-space: pre;
  }

  blockquote {
    margin: 2em 0;
    padding-left: 30px;
    border-left: 5px solid #e6e6e6;

    p {
      font-size: 17px;
      font-style: italic;
      line-height: 1.8em;
      color: #999;
    }
  }
  a {
    color: #f66;
    overflow-wrap: break-word;
    word-break: break-all;
    border-bottom: 2px solid transparent;

    &:hover {
      color: #f33;
      border-bottom-color: #f33;
    }
  }

  ul {
    padding-left: 15px;
    list-style-type: none;

    li {
      display: list-item;
      text-align: -webkit-match-parent;

      &:before {
        position: absolute;
        font-weight: 600;
        content: " · ";
        margin: 0;
        left: 0;
      }
    }
  }

  img {
    display: block;
    max-width: 100%;
    border: none;
  }

  code {
    font-family: "Roboto Mono", "Menlo", "Consolas", monospace;
    font-size: 13px;
    background-color: #f6f6f6;
    padding: 3px 5px;
    margin: 0 5px;
    border-radius: 2px;
  }

  pre {
    code {
      padding: 0;
      margin: 0;
    }
  }

  strong {
    font-weight: 600;
    color: #444;
  }
}

#container {
  .gitment-editor-main,
  .gitment-comment-main {
    background: #fff;
  }
}
</style>
