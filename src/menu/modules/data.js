export default {
	path: "/data",
	title: "Data",
	icon: "bar-chart",
	children: (pre => [
		{
			path: `${pre}upload/structures`,
			title: "Structures",
			icon: "cubes"
		},
		{
			path: `${pre}potentials`,
			title: "Potentials",
			icon: "cubes"
		},
		{
			path: `${pre}calctasks`,
			title: "CalcTasks",
			icon: "tasks"
		}
	])("/data/")
};
