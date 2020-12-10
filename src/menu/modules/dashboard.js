export default {
  path: "/dashboard",
  title: "Dashboard",
  icon: "tachometer",
  children: (pre => [
    {
      path: `${pre}calctasks`,
      title: "CalcTasks",
      icon: "tasks"
    }
  ])("/dashboard/")
};
