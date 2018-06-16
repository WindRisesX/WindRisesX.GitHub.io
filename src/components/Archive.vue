<template>
    <div id="post-archive">
        <p class="archive-counter">目前共计 {{postNums}} 篇日志。Keep on going!</p>
        <div class="archive-wrap">
            <template v-for="(item, index) in archive"> 
                <h2 :key="item.year">{{item.year}}</h2>
                <ul class="post-list" :key="item.year + index">
                    <li v-for="(post, i) in item.postList" :key="i">
                        <a @click.prevent="routeToPost(post)">
                            <span class="date">{{post.date | dayFormat}}</span>
                            <span class="title">{{post.title}}</span>
                        </a>
                    </li>
                </ul>
            </template>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(['postNums', 'archive'])
  },
  methods: {
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
#post-archive {
  padding: 30px 0;
  padding-left: 50px;
  padding-left: 100px;
  box-shadow: 0 0 14px #cacbcb;

    .archive-counter {
      color: #333;
    }

  .archive-wrap {
    position: relative;
    border-left: 2px solid #d8e2eb;
    margin-left: 140px;
    padding: 3em 0;
    background: #fff;

    &:before,
    &:after {
      content: "";
      position: absolute;
      left: -6px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #d8e2eb;
    }

    &:before {
      top: 0;
    }

    &:after {
      bottom: 0;
    }

    h2 {
      margin: 0 0 25px -51px;
      font-weight: bold;
      font-size: 24px;
      letter-spacing: -1px;
      background: #d8e2eb;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      color: #5483b1;

      .icon {
        font-size: 16px;
      }
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        margin-bottom: 50px;
        position: relative;
        color: #555;
        a {
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
            -webkit-box-shadow: 0 0 4px #d8e2eb inset;
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
            -webkit-box-shadow: 0 0 3px #d8e2eb inset;
            box-shadow: 0 0 3px #d8e2eb inset;
          }

          .date {
            position: absolute;
            left: -112px;
            width: 100px;
            bottom: 0;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 15px 30px 0 15px;
            border: 1px solid #d8e2eb;
            -webkit-box-shadow: 0 0 4px #d8e2eb inset;
            box-shadow: 0 0 4px #d8e2eb inset;
          }

          .title {
            padding: 0 20px;
            position: relative;
            bottom: -4px;
            display: inline-block;
            border-bottom: 1px solid #d8e2eb;
            line-height: 1.2em;
            padding: 0 30px;
            max-width: 100%;
            box-sizing: border-box;

            &:after {
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
            .date {
              border: 1px solid #5483b1;
              box-shadow: 0 0 4px #5483b1 inset;
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

/**
*   适配移动端
**/
@media screen and (max-width: 580px) {
  #post-archive {
    padding-left: 40px;
    padding-right: 20px;
    .archive-wrap {
      margin-left: 100px;
    }
  }
}

@media screen and (max-width: 420px) {
  #post-archive {
    padding-left: 20px;
    .archive-wrap {
      margin-left: 56px;
      h2 {
        margin: 0 0 25px -41px;
        font-weight: bold;
        font-size: 20px;
        letter-spacing: -1px;
        background: #d8e2eb;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        text-align: center;
        line-height: 80px;
        color: #5483b1;

        .icon {
          font-size: 14px;
        }
      }
      ul {
        li {
          a {
            .date {
              left: -65px;
              width: 60px;
              border-radius: 15px 15px 0 15px;
              font-size: 12px;
            }

            .title {
              padding: 0 15px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>

