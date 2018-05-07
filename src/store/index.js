import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    postList: [],   // 文章列表
    currentPostIndex: -1, 
    postContent: null, // 经过 marked() 处理过的文章内容,
    sitePV: 0, // 网站访问量
    pagePV: 0, // 当前文章访问量
  },

  mutations: {
    setPostList(state, list) {
      state.postList = list
    },

    setCurrentPostIndexBySha(state, sha) {
      state.postList.some((post, index) => {
        if (post.sha === sha) {
          state.currentPostIndex = index
          return true
        }
        return false
      })
    },

    setPostContent(state, content) {
      state.postContent = content
    },

    setSitePV (state, n) {
      state.sitePV = n
    },

    setPagePV (state, n) {
      state.pagePV = n
    }
  },

  getters: {
    currentPost (state) {
      return state.postList[state.currentPostIndex]
    },

    hasNewer (state) {
      return state.currentPostIndex > 0
    },

    hasOlder (state) {
      return  state.currentPostIndex < state.postList.length - 1
    },

    newerPost (state) {
      if (state.currentPostIndex > 0) {
        return state.postList[state.currentPostIndex - 1]
      }
    },

    olderPost (state) {
      if (state.currentPostIndex < state.postList.length - 1) {
        return state.postList[state.currentPostIndex + 1]
      }
    }
  }
})

export default store
