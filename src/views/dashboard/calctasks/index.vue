<template>
	<d2-container>
		<el-table
			v-loading="tableLoading"
			:data="tableData"
			style="width: 100%"
			:default-sort="{ prop: 'id', order: 'descending' }"
			@row-click="viewDetail"
			class="structure-table"
		>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form
						label-position="left"
						inline
						class="structure-table-expand"
					>
						<el-form-item label="ID">
							<span>{{ props.row.id }}</span>
						</el-form-item>
						<el-form-item label="calc task label">
							<span>{{ props.row.calctask_label }}</span>
						</el-form-item>
						<el-form-item label="created time">
							<el-date-picker
								v-model="props.row.created_time"
								type="datetime"
								placeholder="created time"
								readonly
								class="structure-date-picker"
							>
							</el-date-picker>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="id" sortable align="center">
			</el-table-column>
			<!-- TODO: Filter -->
			<el-table-column
				prop="calctask_type"
				label="calc task type"
				align="center"
			>
			</el-table-column>
			<el-table-column label="structure" align="center">
				<template slot-scope="props">
					<el-button
						@click.native.prevent="
							goToStructurePage(props.row.structure.id)
						"
						type="text"
						size="small"
						v-html="props.row.structure.formula"
					>
					</el-button>
				</template>
			</el-table-column>
			<el-table-column
				prop="supports"
				sortable
				label="supports"
				align="center"
			>
			</el-table-column>
			<el-table-column label="status" align="center">
				<template slot-scope="props">
					<i
						class="el-icon-warning-outline"
						v-if="props.row.status == 'failed'"
					></i>
					<i
						class="el-icon-loading"
						v-else-if="
							[
								'running',
								'submitted',
								'created',
								'creating'
							].includes(props.row.status)
						"
					></i>
					<i
						class="el-icon-circle-close"
						v-else-if="props.row.status == 'deleted'"
					></i>
					<i
						class="el-icon-check"
						v-else-if="props.row.status == 'completed'"
					></i>
					<i class="el-icon-question" v-else></i>
					<span>{{ props.row.status }}</span>
				</template>
			</el-table-column>
		</el-table>
		<template slot="footer">
			<el-pagination
				background
				@size-change="handlePageSizeChange"
				@current-change="handleCurrentPageChange"
				:current-page="currentPage"
				:page-sizes="[2, 10, 20, 30, 40]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next"
				:total="totalCount"
			></el-pagination>
			<el-button
				class="add-tasks-button"
				plain
				type="primary"
				@click="addNewTasks"
				>Add New Tasks</el-button
			>
		</template>
	</d2-container>
</template>

<script>
const apiPrefix = "/calctasks/";
export default {
	name: "dashboard-calctasks",
	data() {
		return {
			tableData: [
				{
					id: "1325121640423690200",
					celery_id: "e96741e4-f36a-448c-affa-4d7a1bcb70ef",
					structure: { id: "1325121640423690200", formula: "Si" },
					user: { id: "1325121640423690200", name: "ias" },
					code: {},
					calc_jobs_type: "ShengBTE",
					calc_jobs_label: "ShengBTEWorkChain",
					supports: 1,
					status: "failed"
				},
				{
					id: "1325121640423690200",
					structure: { id: "1325121640423690200", formula: "Si" },
					calc_jobs_type: "ShengBTE",
					calc_jobs_label: "ShengBTEWorkChain",
					user: "IAS",
					supports: 2,
					status: "created"
				},
				{
					id: "1325121640423690200",
					structure: { id: "1325121640423690200", formula: "Si" },
					calc_jobs_type: "ShengBTE",
					calc_jobs_label: "ShengBTEWorkChain",
					user: "IAS",
					supports: 0,
					status: "running"
				}
			],
			tableLoading: true,
			currentPage: 1,
			totalCount: 0,
			pageSize: 10,
			queryForm: { status_exclude: "failed,completed,deleted" }
		};
	},
	methods: {
		pageRequest(
			page = this.currentPage,
			size = this.pageSize,
			options = this.queryForm
		) {
			return this.$api.GetList(
				apiPrefix,
				Object.assign({ page, size }, options)
			);
		},
		handleCurrentPageChange(page) {
			this.tableLoading = true;
			this.pageRequest(page).then(resp => {
				let data = resp.data;
				this.tableData = data.results;
				this.totalCount = data.count;
				this.currentPage = page;
				this.tableLoading = false;
			});
		},
		handlePageSizeChange(size) {
			this.tableLoading = true;
			this.pageSize = size;
			this.pageRequest().then(resp => {
				let data = resp.data;
				this.tableData = data.results;
				this.totalCount = data.count;
				this.tableLoading = false;
			});
		},
		viewDetail(row, column, event) {
			let id = row.id;
			if (id == "") {
				this.$message.error("ID is None!");
			}
			this.$router.push({
				path: `/data/calctasks/${id}`
			});
		},
		goToStructurePage(id) {
			if (id == "") {
				this.$message.error("Structure ID is None!");
			}
			this.$router.push({
				path: `/data/structures/${id}`
			});
		},
		addNewTasks() {
			this.$router.replace({
				path: `/data/upload/calctasks`
			});
		}
	},
	mounted() {
		this.pageRequest().then(resp => {
			let data = resp.data;
			this.tableData = data.results;
			this.totalCount = data.count;
			this.tableLoading = false;
		});
	}
};
</script>

<style lang="scss">
.add-tasks-button {
	position: absolute;
	right: 16px;
	bottom: 16px;
}
</style>
