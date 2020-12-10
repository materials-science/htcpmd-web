export default {
  path: "/data",
  title: "Data",
  icon: "bar-chart",
  children: (pre => [
    {
      path: `${pre}structures`,
      title: "Structure",
      icon: "snowflake-o"
    },
    {
      path: `${pre}calctasks`,
      title: "CalcTasks",
      icon: "tasks"
    }
  ])("/data/")
};
