<template>
  <ul>
    <li v-for="(post, i) in postList" :key="i">
      <h3>{{post.date | DateFormat}}</h3>
      <h2>
        <a href="#" @click.stop.prevent="routeToPost(post)">{{post.title}}</a>
      </h2>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "../API";
import fm from "front-matter";

export default {
  computed: {
    ...mapState(["postList"])
  },
  methods: {
    ...mapMutations(["setCurrentPost", "setPostContent"]),
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
main ul {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li:first-child {
    // margin-top: -30px;
  }

  li {
    position: relative;
    display: list-item;
    margin-bottom: 20px;
    padding: 30px 25px 30px;
    background: #fff;
    border-bottom: 1px dashed #e6e6e6;
    border-right: 1px dashed #e6e6e6;
    box-shadow: 0 0 4px #cacbcb;
  }

  h2,
  h3 {
    letter-spacing: 1px;
    margin: 0;
    text-transform: uppercase;
  }

  h3 {
    position: absolute;
    left: 25px;
    top: 38px;
    font-size: 13px;
    color: #999;
  }

  h2 {
    font-size: 20px;
    letter-spacing: 1px;
    margin-left: 120px;

    a {
      color: #444;
      transition: color 0.2s ease, border-color 0.2s ease;

      &:hover {
        color: #f33;
      }
    }
  }
}

@media screen and (max-width: 420px) {
  main ul {
    li:first-child {
      margin-top: -35px;
    }

    h3 {
      font-size: 11px;
      position: static;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 16px;
      margin-left: 0;
    }

    li {
      padding: 18px 15px 20px;
    }
  }
}
</style>



