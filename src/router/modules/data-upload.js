import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}
export default {
  path: '/data-upload',
  name: 'data-upload',
  meta,
  redirect: {
    name: 'data-upload-index'
  },
  component: layoutHeaderAside,
  children: (pre => [{
    path: 'structure',
    name: `${pre}structure`,
    component: _import('data-upload/structure'),
    meta: {
      ...meta,
      title: 'Upload Structure'
    }
  }, ])('data-upload-')
}
