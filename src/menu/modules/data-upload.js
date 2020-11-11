export default {
  path: '/data-upload',
  title: 'Data Upload',
  icon: 'cloud-upload',
  children: (pre => [
    //   { path: `${pre}index`, title: '功能', icon: 'home' },
    {
      path: `${pre}structure`,
      title: 'Structure',
      icon: 'spinner'
    },
  ])('/data-upload/')
}
