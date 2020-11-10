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
    {
      title: 'svg icon',
      iconSvg: 'd2-admin',
      children: [{
          title: 'add',
          iconSvg: 'add'
        },
        {
          title: 'alarm',
          iconSvg: 'alarm'
        },
        {
          title: 'camera',
          iconSvg: 'camera'
        },
        {
          title: 'history',
          iconSvg: 'history'
        },
        {
          title: 'like',
          iconSvg: 'like'
        },
        {
          title: 'love',
          iconSvg: 'love'
        },
        {
          title: 'message',
          iconSvg: 'message'
        },
        {
          title: 'notice',
          iconSvg: 'notice'
        },
        {
          title: 'search',
          iconSvg: 'search'
        },
        {
          title: 'share',
          iconSvg: 'share'
        },
        {
          title: 'star',
          iconSvg: 'star'
        },
        {
          title: 'user',
          iconSvg: 'user'
        }
      ]
    },
  ])('/data-upload/')
}
