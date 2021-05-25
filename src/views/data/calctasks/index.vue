<template>
	<d2-container class="upload-calctasks-container">
		<el-table
			v-loading="tableLoading"
			:data="tableData"
			style="width: 100%"
			:default-sort="{ prop: 'uuid', order: 'descending' }"
			@sort-change="sortChange"
			@row-click="viewDetail"
			class="data-table"
		>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form
						label-position="left"
						inline
						class="structure-table-expand"
					>
						<el-form-item label="UUID">
							<span>{{ props.row.uuid }}</span>
						</el-form-item>
						<el-form-item label="calc task label">
							<span>{{ props.row.label }}</span>
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
			<el-table-column prop="uuid" label="uuid" sortable align="center">
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
							goToStructurePage(props.row.structure.uuid)
						"
						type="text"
						size="small"
						v-html="props.row.structure.formula"
					>
					</el-button>
				</template>
			</el-table-column>
			<el-table-column
				sortable="custom"
				label="created time"
				prop="created_time"
				align="center"
			>
				<template slot-scope="props">
					<el-date-picker
						v-model="props.row.created_time"
						type="datetime"
						placeholder="created time"
						readonly
						class="structure-date-picker"
					>
					</el-date-picker>
				</template>
			</el-table-column>
			<el-table-column
				prop="supports"
				sortable
				label="supports"
				align="center"
			>
			</el-table-column>
			<el-table-column prop="status" label="status" align="center">
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
	name: "data-calctasks",
	data() {
		return {
			tableData: [
				{
					uuid: "1325121640423690200",
					structure: { uuid: "1325121640423690200", formula: "Si" },
					calc_jobs_type: "ShengBTE",
					calc_jobs_label: "ShengBTEWorkChain",
					user: "IAS",
					supports: 0,
					status: "running"
				},
				{
					uuid: "1325121640423690200",
					celery_id: "e96741e4-f36a-448c-affa-4d7a1bcb70ef",
					structure: { uuid: "1325121640423690200", formula: "Si" },
					user: { uuid: "1325121640423690200", name: "ias" },
					code: {},
					calc_jobs_type: "ShengBTE",
					calc_jobs_label: "ShengBTEWorkChain",
					supports: 1,
					status: "failed"
				},
				{
					uuid: "1325121640423690200",
					structure: { uuid: "1325121640423690200", formula: "Si" },
					calc_jobs_type: "ShengBTE",
					calc_jobs_label: "ShengBTEWorkChain",
					user: "IAS",
					supports: 2,
					status: "created"
				}
			],
			tableLoading: true,
			currentPage: 1,
			totalCount: 0,
			pageSize: 10,
			queryForm: {}
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
			let uuid = row.uuid;
			if (uuid == "") {
				this.$message.error("UUID is None!");
			}
			this.$router.push({
				path: `/data/calctasks/${uuid}`
			});
		},
		goToStructurePage(uuid) {
			if (uuid == "") {
				this.$message.error("Structure UUID is None!");
			}
			this.$router.push({
				path: `/data/structures/${uuid}`
			});
		},
		addNewTasks() {
			this.$router.replace({
				path: `/data/upload/calctasks`
			});
		},
		sortChange(column) {
			console.log(column);
			if (column.order == null) return;
			if (column.prop == "created_time") {
				this.queryForm = {
					ordering: `${
						column.order == "descending" ? "-" : ""
					}created_time`
				};
				this.handleCurrentPageChange(this.currentPage);
			}
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

<style lang="scss" scoped>
.add-tasks-button {
	position: absolute;
	right: 16px;
	bottom: 16px;
}
</style>
<style lang="scss">
.upload-calctasks-container {
	.data-table {
		.el-table__body-wrapper {
			@include scrollBar();
		}
	}
}
</style>
