<template>
  <div id="tag-cloud">
    <div class="tag-cloud-tags">
      <a class="tag" :class="[tagLevel(tag)]" v-for="(tag, i) in tagSet" :key="tag.tag + i" @click="showList(tag)">{{tag.tag}}</a>
    </div>
  <div v-show="activeTag" class="tag-post-list" >
    <h3>正在查看 <i class="icon">{{activeTag}}</i>下的文章</h3>
      <div class="post-list-wrap">
        <ul>
          <li v-for="post in postList" :key="post.title">
            <a @click.prevent="routeToPost(post)">
              <span class="title">{{post.title}}</span>
            </a>
          </li>
        </ul>
      </div>
   </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeTag: null,
      postList: []
    };
  },
  computed: {
    ...mapGetters(["tagSet"])
  },
  watch: {
    tagSet: {
      handler: 'tagSetHandler',
      immediate: true
    }
  },
  methods: {
    tagLevel(tag) {
      let level = "tag-level-1";
      if (tag.count >= 10) {
        level = "tag-level-5";
      } else if (tag.count >= 7) {
        level = "tag-level-4";
      } else if (tag.count >= 5) {
        level = "tag-level-3";
      } else if (tag.count >= 2) {
        level = "tag-level-2";
      }
      return level;
    },
    showList(tag) {
      this.activeTag = tag.tag;
      this.postList = tag.postList;
    },
    tagSetHandler() {
      if (this.tagSet && this.tagSet.length) {
        this.showList(this.tagSet[0]);
      }
    },
    routeToPost(post) {
      this.$router.push({
        name: "Post",
        params: { date: post.date, title: post.title, sha: post.sha }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#tag-cloud {
  box-shadow: 0 0 4px #cacbcb;
  .tag-cloud-tags {
    text-align: center;
    padding:30px 0;
    border-bottom: 1px dashed #cacbcb;
    // box-shadow: 0 0 4px #cacbcb;
    .tag {
      display: inline-block;
      padding: 8px 10px;
      color: #ccc;
      font-size: 12px;
      cursor: pointer;
      border: 2px dashed transparent;

      &:hover {
        border: 2px dashed #ccc;
      }

      &.tag-level-2 {
        font-size: 16.5px;
        color: #9d9d9d;
      }
      &.tag-level-3 {
        font-size: 21px;
        color: #6f6f6f;
      }
      &.tag-level-4 {
        font-size: 25.5px;
        color: #404040;
      }
      &.tag-level-5 {
        font-size: 30px;
        color: #111;
      }
    }
  }

  .tag-post-list {
    // margin: 10px 0;
    padding: 20px;
    background: #fff;
    // box-shadow: 0 0 4px #cacbcb;

    h3 {
      .icon {
        margin-right: 5px;
        padding: 0 15px;
        display: inline-block;
        background: #f2f7fb;
        font-size: 20px;
        font-style: normal;
        color: #5483b1;
        border-radius: 40px 0 0 10px;
      }
    }

    .post-list-wrap {
      position: relative;
      margin-left: 60px;
      border-left: 2px solid #d8e2eb;
      &:after,
      &:before {
        content: "";
        position: absolute;
        left: -6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #d8e2eb;
      }
      &::after {
        bottom: 0;
      }

      ul {
        margin: 0;
        padding: 50px 0;
        padding-bottom: 30px;
        list-style: none;
        li {
          position: relative;
          margin-bottom: 50px;
          a {
            color: #333;
            cursor: pointer;
            &::before {
              content: "";
              position: absolute;
              z-index: 1;
              left: -11px;
              bottom: -10px;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #fff;
              border: 1px solid #d8e2eb;
              box-shadow: 0 0 4px #d8e2eb inset;
            }

            &::after {
              content: "";
              position: absolute;
              z-index: 2;
              left: -5px;
              bottom: -4px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #d8e2eb;
              box-shadow: 0 0 3px #d8e2eb inset;
            }

            .title {
              position: relative;
              display: inline-block;
              font-size: 14px;
              border-bottom: 1px solid #d8e2eb;
              padding: 0 30px;
              box-sizing: border-box;

              &::after {
                content: "";
                position: absolute;
                right: 0;
                bottom: -4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #d8e2eb;
              }
            }
          }

          &:hover {
            a {
              color: #5483b1;

              &::before {
                border: 1px solid #5483b1;
                box-shadow: 0 0 4px #5483b1 inset;
              }
              &::after {
                background: #5483b1;
                box-shadow: 0 0 3px #5483b1 inset;
              }
              .title {
                border-bottom: 1px solid #5483b1;

                &:after {
                  background: #5483b1;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>



