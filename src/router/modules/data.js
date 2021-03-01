/*
 * @Author: your name
 * @Date: 2020-12-22 09:01:16
 * @LastEditTime: 2021-01-23 15:19:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-admin-kit/src/router/modules/data.js
 */
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
				single: true,
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
		// potentials
		{
			path: "potentials",
			name: `${pre}potentials`,
			component: _import("data/potentials"),
			meta: {
				...meta,
				title: "Potentials List"
			}
		},
		// calctask
		{
			path: "calctasks",
			name: `${pre}calctasks`,
			component: _import("data/calctasks/index.vue"),
			meta: {
				...meta,
				cache: true,
				title: "CalcTasks Home"
			}
		},
		{
			path: "upload/calctasks",
			name: `${pre}calctasks-upload-index`,
			component: _import("data/calctasks/upload/index.vue"),
			meta: {
				...meta,
				cache: true,
				title: "Upload CalcTasks Home"
			}
		},
		{
			path: "upload/calctasks/ShengBTE",
			name: `${pre}calctasks-upload-shengbte`,
			component: _import("data/calctasks/upload/components/shengbte"),
			meta: {
				...meta,
				cache: true,
				title: "Upload ShengBTE CalcTasks"
			}
		},
		{
			path: "upload/calctasks/pw",
			name: `${pre}calctasks-upload-qe-pw`,
			component: _import("data/calctasks/upload/components/qe/pw.vue"),
			meta: {
				...meta,
				cache: true,
				title: "Upload QE-PW CalcTasks"
			}
		},
		{
			path: "upload/calctasks/automated_wannier",
			name: `${pre}calctasks-upload-qe-automated_wannier`,
			component: _import(
				"data/calctasks/upload/components/qe/automated-wannier.vue"
			),
			meta: {
				...meta,
				cache: true,
				title: "Upload Automated Wannier CalcTasks"
			}
		}
	])("data-")
};
