import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}
export default {
  path: '/data',
  name: 'data',
  meta,
  redirect: {
    name: 'data-index'
  },
  component: layoutHeaderAside,
  children: (pre => [{
    path: 'structures',
    name: `${pre}structures`,
    component: _import('data-viewer/structure'),
    meta: {
      ...meta,
      title: 'Structures List'
    }
  }, {
    path: 'structures/:id',
    name: `${pre}structure`,
    component: _import('data-viewer/structure/detail.vue'),
    meta: {
      ...meta,
      cache: true,
      title: 'Structure Data'
    }
  }])('data-')
}
