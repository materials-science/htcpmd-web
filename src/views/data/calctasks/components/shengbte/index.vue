<template>
	<d2-container better-scroll class="data-calctasks-upload-shengbte-container">
		<el-row>
			<el-col :span="6"><h2>ShengBTE</h2></el-col>
		</el-row>
		<el-row>
			<el-col :span="16">
				<el-divider content-position="center">ShengBTE Task Settings</el-divider>
			</el-col>
		</el-row>
		<div class="form-box">
			<!-- CalcJob Label -->
			<el-row>
				<el-row>
					<el-col :span="8"
						><el-tag><h3>CalcTask Label</h3></el-tag></el-col
					>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-divider content-position="left"
							>Set a label for your task</el-divider
						>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-select
							v-model="calctasks_label_selected"
							placeholder="CalcTask Label"
							allow-create
							filterable
							clearable
						>
							<el-option
								v-for="item in calctasks_labels"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</el-row>
			<!-- CalcJob Type -->
			<el-row>
				<el-col :span="24">
					<el-row>
						<el-col :span="8"
							><el-tag><h3>CalcTask Type</h3></el-tag></el-col
						>
					</el-row>
					<el-row>
						<el-col :span="16">
							<el-divider content-position="left"
								>Select calculations or workchains model you
								want</el-divider
							>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="16">
							<el-select
								v-model="calctasks_type_selected"
								placeholder="Choose A Type"
								filterable
								clearable
								autocomplete
								:loading="load_calctasks_types"
							>
								<el-option
									v-for="item in calctasks_types"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<!-- Structures -->
			<el-row>
				<el-row>
					<el-col :span="8"
						><el-tag><h3>Structures</h3></el-tag></el-col
					>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-divider content-position="left"
							>Set Structures for your calculations</el-divider
						>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="16">
						<el-table
							:data="structures"
							v-loading="loading_structures"
							style="width: 100%"
						>
							<el-table-column prop="id" label="id" align="center">
							</el-table-column>
							<el-table-column label="formula" align="center">
								<template slot-scope="props">
									<span v-html="props.row.attributes.formula"></span>
								</template>
							</el-table-column>
							<el-table-column align="right">
								<template slot="header" slot-scope="scope">
									<el-row
										type="flex"
										justify="space-around"
										style="align-items: center"
									>
										<el-col :span="20">
											<el-input
												v-model="new_structure_id"
												size="mini"
												placeholder="new structure id"
											/>
										</el-col>
										<el-col :span="4">
											<el-button
												icon="el-icon-plus"
												circle
												@click.native.prevent="addNewStructure"
												size="small"
											>
											</el-button
										></el-col>
									</el-row>
								</template>
								<template slot-scope="scope">
									<el-popover
										placement="top-start"
										title="help"
										width="200"
										trigger="hover"
										content="Go to see details of this structure"
										style="margin-right: 8px"
									>
										<el-button
											slot="reference"
											@click.native.prevent="viewDetail(scope.row)"
											icon="el-icon-view"
											size="small"
										></el-button>
									</el-popover>
									<el-popover
										placement="top-start"
										title="help"
										width="200"
										trigger="hover"
										content="Remove this structure"
									>
										<el-button
											slot="reference"
											@click.native.prevent="
												deleteRow(scope.$index, structures)
											"
											icon="el-icon-circle-close"
											size="small"
										></el-button>
									</el-popover>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</el-row>
		</div>
	</d2-container>
</template>

<script>
const apiPrefix = "/calctasks/";
export default {
	name: "data-calctasks-upload-shengbte",
	data() {
		return {
			calctasks_label_selected: "",
			calctasks_labels: [],
			calctasks_type_selected: "",
			calctasks_types: [],
			load_calctasks_types: true,
			structures: [],
			loading_structures: true,
			new_structure_id: "",
		};
	},
	methods: {
		deleteRow(index, rows) {
			rows.splice(index, 1);
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
		async loadStructures() {
			const db = await this.$store.dispatch("d2admin/db/database", { user: true });
			this.structures = db.get("selectedStructures").value() || [];
			this.loading_structures = false;
		},
		addNewStructure() {
			if (this.new_structure_id == "") {
				return this.$message.error("Please input a valid structure id.");
			}
			this.loading_structures = true;
			this.$api.GetObj("/structures/", this.new_structure_id).then((resp) => {
				this.loading_structures = false;
				try {
					if (resp.code == 0) {
						this.structures.push({
							id: this.new_structure_id,
							formula: resp.data.attributes.formula,
						});
						this.new_structure_id = "";
						return this.$message.success("Added a new structure.");
					}
					return this.$message.error("Structure does not exist.");
				} catch {
					return this.$message.error("Whoops! Something was wrong.");
				}
			});
		},
	},
	mounted() {
		// load calctasks type
		this.$api.GetList(`/calctask_types/`).then((resp) => {
			if (resp.code == 0) {
				let data = resp.data;
				let calctasks_types = [];
				data.forEach((item) => {
					calctasks_types.push({
						label: item.type_name,
						value: item.id,
						disabled: item.disabled,
					});
				});
				this.calctasks_types = calctasks_types;
			} else {
				this.$message.error("No CalcTasks Types Avaliable.");
				setTimeout(() => {
					this.$store.dispatch("d2admin/page/close", {
						tagName: "/data/upload/calctasks",
					});
				}, 1500);
				return;
			}
			this.load_calctasks_types = false;
		});
		this.loadStructures();
	},
};
</script>

<style lang="scss">
.data-calctasks-upload-shengbte-container {
	.form-box {
		> .el-row {
			margin: 0 8px 64px;
		}
	}
}
</style>
