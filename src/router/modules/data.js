import layoutHeaderAside from "@/layout/header-aside";

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

const meta = {
	auth: true
};
export default {
	path: "/data",
	name: "data",
	meta,
	redirect: {
		name: "data-index"
	},
	component: layoutHeaderAside,
	children: (pre => [
		// structure
		{
			path: "structures",
			name: `${pre}structures`,
			component: _import("data/structures"),
			meta: {
				...meta,
				title: "Structures List"
			}
		},
		{
			path: "structures/:id",
			name: `${pre}structure-detail`,
			component: _import("data/structures/detail.vue"),
			meta: {
				...meta,
				cache: true,
				title: "Structure Details"
			}
		},
		{
			path: "upload/structures",
			name: `${pre}structures-upload`,
			component: _import("data/structures/upload.vue"),
			meta: {
				...meta,
				title: "Upload Structure"
			}
		},
		// calctask
		{
			path: "upload/calctasks",
			name: `${pre}calctasks-upload-index`,
			component: _import("data/calctasks/index.vue"),
			meta: {
				...meta,
				title: "Upload CalcTasks Home"
			}
		},
		{
			path: "upload/calctasks/ShengBTE",
			name: `${pre}calctasks-upload-shengbte`,
			component: _import("data/calctasks/components/shengbte"),
			meta: {
				...meta,
				title: "Upload ShengBTE CalcTasks"
			}
		}
	])("data-")
};
