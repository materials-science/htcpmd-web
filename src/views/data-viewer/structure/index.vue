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
						<el-form-item label="center of mass">
							<span>{{
								props.row.attributes.center_of_mass
							}}</span>
						</el-form-item>
						<el-form-item label="cell">
							<!-- <span>{{ props.row.attributes.cell }}</span> -->
						</el-form-item>
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
						<el-form-item label="reciprocal cell">
							<!-- <span>{{
								props.row.attributes.reciprocal_cell
							}}</span> -->
						</el-form-item>
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
			viewDetail(row, column, event) {
				let id = row.id;
				if (id == "") {
					this.$message.error("ID is None!");
				}
				this.$router.push({
					path: `/data/structures/${id}`,
				});
			},
		},
		mounted() {
			if (
				!this.$route.params.queryForm ||
				!this.$route.params.queryForm.elements
			) {
				return;
			}
			this.queryForm = this.$route.params.queryForm;
			this.pageRequest().then((resp) => {
				let data = resp.data;
				this.tableData = data.results;
				this.totalCount = data.count;
				this.tableLoading = false;
			});
		},
		beforeCreate() {
			if (
				!this.$route.params.queryForm ||
				!this.$route.params.queryForm.elements
			) {
				this.$message.warning("Please go to Home Page for searching!");
				setTimeout(() => {
					this.$router.replace("/index");
				}, 1500);
			}
		},
	};
</script>

<style lang='scss'>
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