import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList'
import Post from '@/components/Post'
import Archive from '@/components/Archive'
import PostTags from '@/components/PostTags'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/:date/:title/:sha',
      name: 'Post',
      component: Post
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive
    },
    {
      path: '/tags',
      name: 'Tags',
      component: PostTags
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
