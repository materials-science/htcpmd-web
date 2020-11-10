export default {
  path: '/data',
  title: 'Data Viewer',
  icon: 'flask',
  children: (pre => [{
    path: `${pre}structure`,
    title: 'Structure',
    icon: 'spinner'
  }, ])('/data/')
}
