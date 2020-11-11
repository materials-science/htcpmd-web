export default {
  path: '/data',
  title: 'Data Viewer',
  icon: 'flask',
  children: (pre => [{
    path: `${pre}structures`,
    title: 'Structure',
    icon: 'spinner'
  }, ])('/data/')
}
