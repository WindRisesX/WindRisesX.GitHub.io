import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    postList: [],   // 文章列表
    currentPostIndex: -1,
    postContent: null, // 经过 marked() 处理过的文章内容,
    sitePV: 0, // 网站访问量
    siteUV: 0, // 网站访问人数
    pagePV: 0, // 当前文章访问量
    // tagSet: []  // 标签集合
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

    setSitePV(state, n) {
      state.sitePV = n
    },

    setSiteUV(state, n) {
      state.siteUV = n
    },

    setPagePV(state, n) {
      state.pagePV = n
    },

    // addTag (state, tag)  {
    //   state.tagSet.push(tag)
    // }
  },

  getters: {
    currentPost(state) {
      return state.postList[state.currentPostIndex]
    },

    hasNewer(state) {
      return state.currentPostIndex > 0
    },

    hasOlder(state) {
      return state.currentPostIndex < state.postList.length - 1
    },

    newerPost(state) {
      if (state.currentPostIndex > 0) {
        return state.postList[state.currentPostIndex - 1]
      }
    },

    olderPost(state) {
      if (state.currentPostIndex < state.postList.length - 1) {
        return state.postList[state.currentPostIndex + 1]
      }
    },

    tagSet(state) {
      let tagMap = new Map()
      state.postList.map((post) => {
        post.tags.forEach((tag) => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, {
              tag,
              postList: [],
              count: 0
            })
          }
          let { title, sha, date } = post
          tagMap.get(tag).postList.push({ title, sha, date })
          tagMap.get(tag).count++
        });

      })
      return Array.from(tagMap.keys()).sort().map(key => tagMap.get(key))
    },

    postNums (state) {
      return state.postList.length
    },

    archive (state) {
      let yearsMap = new Map()
      state.postList.map((post) => {
        let year = post.date.substr(0, 4)
        if (!yearsMap.has(year)) {
          yearsMap.set(year, {
            year,
            postList: []
          })
        }
        let { title, sha, date } = post
        yearsMap.get(year).postList.push({ title, sha, date })
      })
      return Array.from(yearsMap.keys()).sort().map(key => yearsMap.get(key))
    }
  },
})

export default store
