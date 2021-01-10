<template>
	<d2-container>
		<template slot="header">
			<el-row>
				<el-button
					class="add-new-button"
					plain
					type="primary"
					@click="addNewStructures"
					>Add New Structures</el-button
				>
				<el-button
					class="add-new-button"
					plain
					type="primary"
					@click="addNewTasks"
					>Add New Tasks</el-button
				>
			</el-row>
		</template>
		<el-table
			v-loading="tableLoading"
			:data="tableData"
			style="width: 100%"
			:default-sort="{ prop: 'id', order: 'descending' }"
			@row-click="viewDetail"
			@selection-change="handleSelectionChange"
			class="structure-table"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="structure-table-expand">
						<el-form-item label="ID">
							<span>{{ props.row.id }}</span>
						</el-form-item>
						<el-form-item label="center of mass">
							<span>{{ props.row.attributes.center_of_mass }}</span>
						</el-form-item>
						<el-form-item label="cell"> </el-form-item>
						<div class="inline-display-block">
							<el-row>
								<el-col :span="12">
									<el-row
										:gutter="20"
										v-for="row of props.row.attributes.cell"
										:key="row"
									>
										<el-col
											:span="8"
											v-for="(it, idx) in row"
											:key="idx"
											>{{ it }}</el-col
										>
									</el-row>
								</el-col>
							</el-row>
						</div>
						<el-form-item label="reciprocal cell"> </el-form-item>
						<div class="inline-display-block">
							<el-row>
								<el-col :span="12">
									<el-row
										:gutter="10"
										v-for="row of props.row.attributes
											.reciprocal_cell"
										:key="row"
									>
										<el-col
											:span="8"
											v-for="(it, idx) of row"
											:key="idx"
											>{{ it }}</el-col
										>
									</el-row>
								</el-col>
							</el-row>
						</div>
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
						<el-form-item label="last modified">
							<el-date-picker
								v-model="props.row.last_modified_time"
								type="datetime"
								placeholder="last modified"
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
			<el-table-column label="formula" align="center">
				<template slot-scope="props">
					<span v-html="props.row.attributes.formula"></span>
				</template>
			</el-table-column>
			<el-table-column
				label="volume"
				prop="attributes.volume"
				sortable
				align="center"
			>
				<template slot-scope="props">
					<el-input-number
						v-model="props.row.attributes.volume"
						label="volume"
						:precision="4"
						:controls="false"
						disabled
						class="volume-input"
					></el-input-number>
				</template>
			</el-table-column>
			<el-table-column
				prop="attributes.spacegroup"
				label="spacegroup"
				sortable
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="attributes.number_of_atoms"
				label="number of atoms"
				sortable
				align="center"
			>
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
		</template>
	</d2-container>
</template>

<script>
import * as api from "./api";
import setting from "@/setting.js";
export default {
	name: "data-structures",
	data() {
		return {
			tableData: [
				{
					id: "1325121640423690200",
					attributes: {
						formula: "C<sub>4</sub>Si<sub>4</sub>",
						number_of_atoms: 8,
						spacegroup: 216,
						volume: 84.0024,
					},
				},
				{
					id: "1325121640423690200",
					attributes: {
						formula: "C<sub>4</sub>Si<sub>4</sub>",
						number_of_atoms: 8,
						spacegroup: 216,
						volume: 84.0024,
					},
				},
				{
					id: "1325121640423690200",
					attributes: {
						formula: "C<sub>4</sub>Si<sub>4</sub>",
						number_of_atoms: 8,
						spacegroup: 216,
						volume: 84.0024,
					},
				},
			],
			tableLoading: true,
			currentPage: 1,
			totalCount: 0,
			pageSize: 2,
			queryForm: {},
			multipleSelection: [],
		};
	},
	methods: {
		pageRequest(
			page = this.currentPage,
			size = this.pageSize,
			options = this.queryForm
		) {
			return api.GetList(Object.assign({ page, size }, options));
		},
		handleCurrentPageChange(page) {
			this.tableLoading = true;
			this.pageRequest(page).then((resp) => {
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
			this.pageRequest().then((resp) => {
				let data = resp.data;
				this.tableData = data.results;
				this.totalCount = data.count;
				this.tableLoading = false;
			});
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		viewDetail(row, column, event) {
			let id = row.id;
			if (id == "") {
				return this.$message.error("ID is None!");
			}
			this.$router.push({
				path: `/data/structures/${id}`,
			});
		},
		async addNewTasks() {
			if (this.multipleSelection.length == 0) {
				return this.$message.error("You must choose one at least.");
			} else if (
				this.multipleSelection.length >= setting.calcjobs.max_structures_once
			) {
				return this.$message.error(
					`Only support ${setting.calcjobs.max_structures_once} structures once currently.`
				);
			}
			const db = await this.$store.dispatch("d2admin/db/database", {
				user: true,
			});
			db.set("selectedStructures", this.multipleSelection).write();

			this.$router.push({
				path: `/data/upload/calctasks`,
			});
		},
		addNewStructures() {
			this.$router.push({
				path: `/data/upload/structures`,
			});
		},
	},
	mounted() {
		if (!this.$route.query.elements || !this.$route.query.mode) {
			return;
		}
		this.queryForm = this.$route.query;
		this.pageRequest().then((resp) => {
			let data = resp.data;
			this.tableData = data.results;
			this.totalCount = data.count;
			this.tableLoading = false;
		});
	},
	beforeCreate() {
		if (!this.$route.query.elements || !this.$route.query.mode) {
			this.$message.warning("Please go to Home Page for searching!");
			setTimeout(() => {
				this.$store.dispatch("d2admin/page/close", {
					tagName: "/data/structures",
				});
			}, 1500);
		}
	},
};
</script>

<style lang="scss">
.add-tasks-button {
	position: absolute;
	right: 16px;
	bottom: 16px;
}
.volume-input input {
	background: none !important;
	border: none !important;
	color: inherit !important;
	cursor: default !important;
}
.structure-date-picker input {
	border: none !important;
}
.structure-table-expand {
	font-size: 0;
}
.structure-table-expand label {
	width: 20%;
	color: #99a9bf;
	font-size: 16px;
	font-weight: bold;
}
.structure-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 100%;
}
.inline-display-block {
	text-align: center;
	> .el-row > .el-col {
		border-bottom: 1px solid #99a9bf;
		border-top: 1px solid #99a9bf;
	}
	.el-col {
		font-size: 14px;
		padding: 8px;
	}
}
</style>
