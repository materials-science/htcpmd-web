<!--
 * @Author: your name
 * @Date: 2021-01-23 11:59:13
 * @LastEditTime: 2021-01-24 12:30:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-admin-kit/src/views/data/calctasks/components/qe/automated-wannier.vue
-->
<template>
	<d2-container class="data-calctasks-upload-qe-pw">
		<el-row type="flex" justify="center">
			<el-col :xl="16"
				><h1>{{ TaskInfo.title }}</h1></el-col
			>
		</el-row>
		<!-- Load Template -->
		<el-row type="flex" justify="center">
			<el-col :xl="16">
				<el-divider content-position="center"
					><el-tag effect="plain"
						><h2>Load Template</h2></el-tag
					></el-divider
				>
			</el-col>
		</el-row>
		<el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16"
					><el-tag><h3>Load Template</h3></el-tag>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16">
					<el-divider content-position="left"
						>Load parameters from a template</el-divider
					>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16">
					<el-select
						v-model="params_templates_selected"
						placeholder="Choose A Template"
						filterable
						default-first-option
						remote
						@change="params_templates_changed"
					>
						<el-option
							v-for="item in params_templates_list"
							:key="item.id"
							:label="`${item.label} - (${item.id})`"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</el-row>
		<!-- Task Settings -->
		<el-row type="flex" justify="center">
			<el-col :xl="16">
				<el-divider content-position="center"
					><el-tag effect="plain"
						><h2>{{ TaskInfo.title }} Task Settings</h2></el-tag
					></el-divider
				>
			</el-col>
		</el-row>
		<div class="form-box">
			<!-- CalcJob Label -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>CalcTask Label</h3></el-tag></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Set a label for your task</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-input
							v-model="calctasks_settings.calctasks_label"
						></el-input>
					</el-col>
				</el-row>
			</el-row>
			<!-- CalcJob Type -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>CalcTask Type</h3></el-tag></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left">
							Select calculations or workchains model you
							want</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-select
							v-model="calctasks_settings.calctasks_type"
							placeholder="Choose A Type"
							default-first-option
							:loading="load_calctasks_types"
							@change="calctasksTypeChange"
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
			</el-row>
			<!-- Computer -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>Computer</h3></el-tag>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Set a computer where your calculations submit
							to</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-select
							v-model="calctasks_settings.computer"
							placeholder="Choose A Computer"
							filterable
							default-first-option
							remote
							:remote-method="getComputersList"
							:loading="loading_computers_list"
						>
							<el-option
								v-for="item in computers_list"
								:key="item.id"
								:label="`${item.label} - (${item.id})`"
								:value="item.id"
							>
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</el-row>
			<!-- code -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>PW Code</h3></el-tag></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Set a code for your calculations
						</el-divider>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<!-- pw code -->
					<el-col :xl="6" :sm="12">
						<el-select
							v-model="calctasks_settings.pw_code"
							placeholder="PW Code"
							filterable
							default-first-option
							remote
							:remote-method="getCodesList"
							:loading="loading_codes_list"
						>
							<el-option
								v-for="item in codes_list"
								:key="item.id"
								:label="`${item.label} - (${item.id})`"
								:value="item.id"
							>
							</el-option>
						</el-select>
					</el-col>
					<!-- pw2wannier90 code -->
					<el-col :xl="6" :sm="12">
						<el-select
							v-model="calctasks_settings.pw2wannier90_code"
							placeholder="pw2wannier90"
							filterable
							default-first-option
							remote
							:remote-method="getCodesList"
							:loading="loading_codes_list"
						>
							<el-option
								v-for="item in codes_list"
								:key="item.id"
								:label="`${item.label} - (${item.id})`"
								:value="item.id"
							>
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center" class="d2-mt">
					<!-- projwfc code -->
					<el-col :xl="6" :sm="12">
						<el-select
							v-model="calctasks_settings.projwfc_code"
							placeholder="projwfc"
							filterable
							default-first-option
							remote
							:remote-method="getCodesList"
							:loading="loading_codes_list"
						>
							<el-option
								v-for="item in codes_list"
								:key="item.id"
								:label="`${item.label} - (${item.id})`"
								:value="item.id"
							>
							</el-option>
						</el-select>
					</el-col>
					<!-- wannier90 code -->
					<el-col :xl="6" :sm="12">
						<el-select
							v-model="calctasks_settings.wannier90_code"
							placeholder="wannier90"
							filterable
							default-first-option
							remote
							:remote-method="getCodesList"
							:loading="loading_codes_list"
						>
							<el-option
								v-for="item in codes_list"
								:key="item.id"
								:label="`${item.label} - (${item.id})`"
								:value="item.id"
							>
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</el-row>
			<!-- protocol -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-tag><h3>Protocol</h3></el-tag>
						<router-link
							to="/data/potentials"
							class="d2-ml color-text-placeholder"
							>Setup (sssp) pseudo_family first</router-link
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Currently available protocols are 'theos-ht-1.0'
							and 'testing'</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-select
							v-model="calctasks_settings.protocol"
							placeholder="Choose the protocol"
							default-first-option
						>
							<el-option
								v-for="item in ['theos-ht-1.0', 'testing']"
								:key="item"
								:label="item"
								:value="item"
							>
							</el-option>
						</el-select>
					</el-col>
				</el-row>
			</el-row>
			<!-- CalcJob Description -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>CalcTask Description</h3></el-tag></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Description of your task</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-input
							type="textarea"
							:autosize="{ minRows: 2 }"
							placeholder=""
							v-model="calctasks_settings.calctasks_description"
							show-word-limit
						>
						</el-input>
					</el-col>
				</el-row>
			</el-row>
			<!-- Structures -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>Structures</h3></el-tag></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Set Structures for your calculations</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-table
							:data="structures"
							v-loading="loading_structures"
							style="width: 100%"
						>
							<el-table-column
								prop="id"
								label="id"
								align="center"
							>
							</el-table-column>
							<el-table-column label="formula" align="center">
								<template slot-scope="props">
									<span
										v-html="props.row.attributes.formula"
									></span>
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
												@click.native.prevent="
													addNewStructure
												"
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
										content="Details of this structure"
										style="margin-right: 8px"
									>
										<el-button
											slot="reference"
											@click.native.prevent="
												viewDetail(scope.row)
											"
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
												deleteRow(
													scope.$index,
													structures
												)
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
			<!-- number of machines -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>num_machines</h3></el-tag></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Set number of machines</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-input-number
							v-model="calctasks_settings.num_machines"
							:min="1"
						></el-input-number>
					</el-col>
				</el-row>
			</el-row>
			<!-- process per machine -->
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag
							><h3>num_mpiprocs_per_machine</h3></el-tag
						></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Set number of mpi process per machine</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-input-number
							v-model="
								calctasks_settings.num_mpiprocs_per_machine
							"
							:min="1"
						></el-input-number>
					</el-col>
				</el-row>
			</el-row>
			<el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16"
						><el-tag><h3>should_run_dft_bands</h3></el-tag></el-col
					>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Whether or not to run dft bands</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-switch
							v-model="calctasks_settings.should_run_dft_bands"
							active-text="True"
							inactive-text="False"
						></el-switch>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-divider content-position="left"
							>Whether or not to plot bands</el-divider
						>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :xl="16">
						<el-switch
							v-model="calctasks_settings.should_plot_bands"
							active-text="True"
							inactive-text="False"
						></el-switch>
					</el-col>
				</el-row>
			</el-row>
		</div>
		<!-- Parameters -->
		<el-row type="flex" justify="center">
			<el-col :xl="16">
				<el-divider content-position="center">
					<el-divider content-position="center"
						><el-tag effect="plain"
							><h2>{{ TaskInfo.title }} Parameters</h2></el-tag
						></el-divider
					>
				</el-divider>
			</el-col>
		</el-row>

		<!-- @todo[1] -->
		<div class="task-parameters form-group">
			<el-row type="flex" justify="center">
				<el-col :xl="16">
					<h5 style="text-transform: uppercase;">
						automated wannier90 workflows params
					</h5>
					<el-form
						:model="inputsForm"
						:rules="inputsForm"
						:label-width="formLabelWidth"
						ref="inputsForm"
						label-position="top"
						size="small"
						class="flex-wrap-row"
					>
						<el-form-item
							label="retrieve_hamiltonian"
							prop="retrieve_hamiltonian"
						>
							<p class="color-text-sub"></p>
							<el-switch
								v-model="inputsForm.retrieve_hamiltonian"
								active-text="True"
								inactive-text="False"
							>
							</el-switch>
						</el-form-item>
						<el-form-item label="only_valence" prop="only_valence">
							<p class="color-text-sub"></p>
							<el-switch
								v-model="inputsForm.only_valence"
								active-text="True"
								inactive-text="False"
							></el-switch>
						</el-form-item>
						<el-form-item
							label="do_disentanglement"
							prop="do_disentanglement"
						>
							<p class="color-text-sub"></p>
							<el-switch
								v-model="inputsForm.do_disentanglement"
								active-text="True"
								inactive-text="False"
							></el-switch>
						</el-form-item>
						<el-form-item label="do_mlwf" prop="do_mlwf">
							<p class="color-text-sub"></p>
							<el-switch
								v-model="inputsForm.do_mlwf"
								active-text="True"
								inactive-text="False"
							></el-switch>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<!-- upload -->
		<el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16">
					<el-divider content-position="center">
						<el-divider content-position="center">
							<el-tag effect="plain">
								<h2>Submit CalcTask</h2>
							</el-tag>
						</el-divider>
					</el-divider>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16">
					<!-- <el-button
						style="margin-left: 10px;"
						type="success"
						plain
						@click="testInputs"
						v-loading.fullscreen.lock="fullscreenLoading"
						>Test Inputs Params</el-button
					> -->
					<el-button
						style="margin-left: 10px;"
						type="success"
						plain
						@click="uploadSubmit"
						v-loading.fullscreen.lock="fullscreenLoading"
						>Submit CalcTask</el-button
					>
				</el-col>
			</el-row>
		</el-row>
	</d2-container>
</template>

<script>
/*******************************************************************************
 * TODO: [1]New approche to support mutiple calculations.
 ******************************************************************************/
import util from "@/libs/util";
import CollapseTransition from "@/components/collapse-transition";
const apiPrefix = "/calctasks/";
export default {
	name: "data-calctasks-upload-qe-pw",
	components: {
		CollapseTransition
	},
	data() {
		return {
			formLabelWidth: "200px",
			fullscreenLoading: false,
			TaskInfo: {
				title: "Automated Wannier"
			},
			calctasks_label: "",
			calctasks_type_selected_id: null,
			calctasks_type_selected: "automated_wannier",
			calctasks_types: [
				{
					label: "automated_wannier",
					value: "automated_wannier"
				}
			],
			load_calctasks_types: true,
			calctasks_description: "",
			should_run_dft_bands: true,
			should_plot_bands: true,
			structures: [],
			loading_structures: true,
			new_structure_id: "",
			// computers
			loading_computers_list: false,
			computers_list: [],
			computers_selected: "",
			// codes
			loading_codes_list: false,
			codes_list: [],
			pw_code_selected: "",
			pw2wannier90_code_selected: "",
			projwfc_code_selected: "",
			wannier90_code_selected: "",
			num_machines: 1,
			num_mpiprocs_per_machine: 1,
			// protocol
			protocol_selected: "testing",
			// parameters
			inputsForm: {
				retrieve_hamiltonian: false,
				do_disentanglement: false,
				only_valence: false,
				do_mlwf: false
			},
			inputsFormRules: {},
			// parameters template
			params_templates_selected: "",
			params_templates_list: [{ label: "default", id: "default" }],
			default_parameters_template: {
				inputs: {
					retrieve_hamiltonian: false,
					do_disentanglement: false,
					only_valence: false,
					do_mlwf: false
				},
				calctasks_settings: {
					withmpi: true,
					num_mpiprocs_per_machine: 1,
					num_machines: 1,
					should_run_dft_bands: true,
					should_plot_bands: true
				}
			},
			formData: {},
			calctasks_settings: {
				calcTask_category: "automated_wannier",
				calctasks_label: "",
				calctasks_type: null,
				calctasks_description: "Automated Wannier",
				computer: null,
				pw_code: null,
				pw2wannier90_code: null,
				projwfc_code: null,
				wannier90_code: null,
				protocol: null,
				structures: [],
				withmpi: true,
				num_machines: 1,
				num_mpiprocs_per_machine: 1,
				should_run_dft_bands: true,
				should_plot_bands: true,
				user: util.cookies.get("uuid")
			}
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
				path: `/data/structures/${id}`
			});
		},
		async loadStructures() {
			const db = await this.$store.dispatch("d2admin/db/database", {
				user: true
			});
			// TODO: Remove selected structures stored in local database
			this.structures = db.get("selectedStructures").value() || [];
			console.log(this.structures);
			// @todo[1]
			if (this.structures.length > 1) {
				this.$message.info(
					"Only support for single calculation of ShengBTE Now. It will use the first structure."
				);
				this.structures = this.structures[0];
			}
			this.loading_structures = false;
		},
		addNewStructure() {
			if (this.new_structure_id == "") {
				return this.$message.error(
					"Please input a valid structure id."
				);
			}
			// @todo[1]
			if (this.structures.length > 0) {
				return this.$message.info(
					`Only support for single calculation of ${this.TaskInfo.title} Now.`
				);
			}
			this.loading_structures = true;
			this.$api
				.GetObj("/structures/", this.new_structure_id)
				.then(resp => {
					this.loading_structures = false;
					try {
						if (resp.code == 0) {
							this.structures.push(resp.data);
							console.log(this.structures);
							this.new_structure_id = "";
							return this.$message.success(
								"Added a new structure."
							);
						}
						return this.$message.error("Structure does not exist.");
					} catch {
						return this.$message.error(
							"Whoops! Something was wrong."
						);
					}
				});
		},
		getComputersList(query) {
			if (query == "") {
				return (this.computers_list = []);
			}
			this.loading_computers_list = true;
			this.$api
				.GetList("/computers/", { label: query, id: query })
				.then(resp => {
					if (resp.code == 0) {
						this.computers_list = resp.data.results;
					} else {
						this.$message.error("Retrivied failed! Please retry.");
					}
					this.loading_computers_list = false;
				});
		},
		getCodesList(query) {
			if (query == "") {
				return (this.codes_list = []);
			}
			if (this.computers_selected == "") {
				return this.$message.info("Please select a computer first!");
			}
			this.loading_codes_list = true;
			this.$api
				.GetList("/codes/", {
					label: query,
					id: query,
					computer: this.computers_selected
				})
				.then(resp => {
					if (resp.code == 0) {
						this.codes_list = resp.data.results;
					} else {
						this.$message.error("Retrivied failed! Please retry.");
					}
					this.loading_codes_list = false;
				});
		},
		// template
		params_templates_changed(val) {
			if (val == "default") {
				this.inputsForm = util.deepcopy(
					this.default_parameters_template.inputs
				);
				this.calctasks_settings = Object.assign(
					this.calctasks_settings,
					util.deepcopy(
						this.default_parameters_template.calctasks_settings
					)
				);
			}
		},
		preUploadCheck(callback) {
			this.fullscreenLoading = true;
			this.calctasks_settings.structures = this.structures;
			try {
				const settings = this.calctasks_settings;
				let failed = false;
				(settings.structures.length == 0 ||
					settings.calctasks_type == "" ||
					settings.computer == "" ||
					settings.calctasks_label == "" ||
					settings.pw_code == "" ||
					settings.pw2wannier90_code == "" ||
					settings.projwfc_code == "" ||
					settings.wannier90_code == "" ||
					settings.protocol == "") &&
					(failed = true);
				if (failed) {
					this.$message.error(
						"Invaid inputs, please check your calctask settings."
					);
					this.fullscreenLoading = false;
					return false;
				}
			} catch (err) {
				this.$message.error("Invaid calctask settings. Please check.");
				this.fullscreenLoading = false;
				return false;
			}
			this.formData.calctasks_settings = this.calctasks_settings;
			this.formData.inputs = this.inputsForm;
			typeof callback === "function" && callback();
		},
		uploadSubmit() {
			this.preUploadCheck(() => {
				this.$api
					.AddObj("/calctasks/qe/AutomatedWannier/", this.formData)
					.then(resp => {
						console.log(resp);
						this.fullscreenLoading = false;
						this.$message.success("Submit successfully!");
					});
			});
		},
		calctasksTypeChange(val) {
			const type = this.calctasks_types.find(item => {
				return item.value == val;
			});
			this.calctasks_type_selected = type.label;
		}
	},
	mounted() {
		this.$api
			.GetList(`/calctask_types/`, { category_name: "automated_wannier" })
			.then(resp => {
				if (resp.code == 0) {
					let data = resp.data;
					let calctasks_types = [];
					data.forEach(item => {
						calctasks_types.push({
							label: item.type_name,
							value: item.id,
							disabled: item.disabled
						});
					});
					this.calctasks_types = calctasks_types;
				} else {
					this.$message.error("No CalcTasks Types Avaliable.");
					setTimeout(() => {
						this.$store.dispatch("d2admin/page/close", {
							tagName: "/data/upload/calctasks"
						});
					}, 1500);
					return;
				}
				this.load_calctasks_types = false;
			});
		this.loadStructures();
	}
};
</script>
