<template>
	<d2-container type="full" v-loading.fullscreen.lock="fullscreenLoading">
		<el-tabs
			tab-position="top"
			class="tab-container"
			type="border-card"
			@tab-click="handleTabSwitch($event)"
		>
			<el-tab-pane label="Material Detail" class="panel material-panel">
				<el-row type="flex" :gutter="20">
					<el-col :xl="12" class="material-detail">
						<el-row>
							<el-col :span="DetailSpan">
								<p class="material-detail-title">
									Material Detail
								</p>
							</el-col>
						</el-row>
						<!-- ID -->
						<el-row :gutter="20" type="flex" align="middle">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain"> ID </el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									{{ structure.id }}
								</div>
							</el-col>
						</el-row>
						<!-- formula -->
						<el-row :gutter="20" type="flex" align="middle">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain"> Formula </el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div
									class="content"
									v-html="attributes.formula"
								></div>
							</el-col>
						</el-row>
						<!-- cell -->
						<el-row :gutter="20">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain"> cell </el-tag>
								</div>
							</el-col>
							<!-- <el-col :span="(DetailSpan * 2) / 3"> -->
							<div class="content">
								<number-table
									:span="(DetailSpan * 2) / 3"
									:data="attributes.cell"
									:precision="6"
									disabled
								></number-table>
							</div>
						</el-row>
						<!-- reciprocal_cell -->
						<el-row :gutter="20">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain">
										reciprocal cell
									</el-tag>
								</div>
							</el-col>
							<number-table
								:span="(DetailSpan * 2) / 3"
								:data="attributes.reciprocal_cell"
								:precision="6"
								disabled
							></number-table>
						</el-row>
						<!-- volume -->
						<el-row :gutter="20" type="flex" align="middle">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain"> volume </el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									{{ attributes.volume }}
								</div>
							</el-col>
						</el-row>
						<!-- spacegroup -->
						<el-row :gutter="20" type="flex" align="middle">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain"> spacegroup </el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									{{ attributes.spacegroup }}
								</div>
							</el-col>
						</el-row>
						<!-- center_of_mass -->
						<el-row :gutter="20" type="flex" align="middle">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain">
										center_of_mass
									</el-tag>
								</div>
							</el-col>
							<number-table
								:span="(DetailSpan * 2) / 3"
								:data="attributes.center_of_mass"
								:precision="6"
								disabled
							></number-table>
						</el-row>
						<!-- created_time -->
						<el-row :gutter="20" type="flex" align="middle">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain">
										created time
									</el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									<el-date-picker
										v-model="structure.created_time"
										type="datetime"
										readonly
										class="detail-date-picker"
									>
									</el-date-picker>
								</div>
							</el-col>
						</el-row>
						<!-- last_modified_time -->
						<el-row :gutter="20" type="flex" align="middle">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain">
										last modified
									</el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									<el-date-picker
										v-model="structure.last_modified_time"
										type="datetime"
										readonly
										class="detail-date-picker"
									>
									</el-date-picker>
								</div>
							</el-col>
						</el-row>
					</el-col>
					<el-col
						:xl="12"
						class="material-viewer-container hidden-sm-and-down"
						v-loading="viewerLoading"
					>
						<el-row>
							<el-col :span="DetailSpan">
								<p class="viewer-title">Crystal Structure</p>
							</el-col>
						</el-row>
						<div
							class="structure-viewer"
							:id="`detail-viewer-${id}`"
						>
							<div
								class="structure-viewer-cover"
								v-if="viewerCoverTip"
								:style="{
									'background-image': structure.cover_img
										? `url('${structure.cover_img}')`
										: '',
									'background-position': 'center',
									'background-blend-mode': 'darken'
								}"
							></div>
							<p
								class="cover-tip"
								v-if="viewerCoverTip"
								@dblclick="displayViewer"
							>
								Double click to show
							</p>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="Band Structure" class="panel band-panel">
				<el-row :gutter="20" justify="space-around">
					<el-col class="chart-box" :xl="16" :md="16">
						<v-chart
							v-if="
								bandChartOption &&
									currentTab == 'Band Structure'
							"
							class="chart"
							:option="bandChartOption"
							ref="bandChart"
						/>
						<el-row
							v-if="!bandChartOption"
							class="cover flex-center-col"
						>
							<img src="@/assets/images/phonon_bg.png" />
							<p class="cover-tip">
								No Data
							</p>
						</el-row>
					</el-col>
					<el-col class="button-box" :xl="8" :md="8">
						<el-row class="data-info" v-if="attributes.band.data">
							<!-- Update Date -->
							<el-row :gutter="20" type="flex" align="middle">
								<el-col :span="DetailSpan / 3">
									<div class="label">
										<el-tag effect="plain">
											Update Date
										</el-tag>
									</div>
								</el-col>
								<el-col :span="(DetailSpan * 2) / 3">
									<div class="content">
										{{ attributes.band.date }}
									</div>
								</el-col>
							</el-row>
							<!-- Update By -->
							<el-row :gutter="20" type="flex" align="middle">
								<el-col :span="DetailSpan / 3">
									<div class="label">
										<el-tag effect="plain">
											Update By
										</el-tag>
									</div>
								</el-col>
								<el-col :span="(DetailSpan * 2) / 3">
									<div class="content">
										<router-link to="/users">
											<el-link type="primary"
												>ID
												{{
													attributes.band.user
												}}</el-link
											>
										</router-link>
									</div>
								</el-col>
							</el-row>
						</el-row>
						<el-row>
							<el-button
								type="primary"
								plain
								@click="exportChartData('band', 'image')"
								>Export Image</el-button
							>
							<el-button
								type="primary"
								plain
								@click="exportChartData('band', 'file')"
								>Download Data</el-button
							>
						</el-row>
						<el-row class="cover">
							<el-upload
								class="upload-box"
								action=""
								drag
								ref="uploadBand"
								:auto-upload="false"
								:file-list="bandFileList"
								:on-preview="bandPreview"
								:on-change="bandFileChange"
								:multiple="false"
								:limit="1"
							>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">
									Drag here, or <em>click to upload</em>
								</div>
								<div class="el-upload__tip" slot="tip">
									Mind the format of your file, tap file name
									to preview.
								</div>
							</el-upload>
						</el-row>
						<el-row>
							<el-button
								type="success"
								plain
								@click="submitBandUpload"
								>Upload</el-button
							>
						</el-row>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="Phonon Dispersion" class="panel phonon-panel">
				<el-row :gutter="20" justify="space-around">
					<el-col class="chart-box" :xl="16" :md="16">
						<v-chart
							v-if="
								phononChartOption &&
									currentTab == 'Phonon Dispersion'
							"
							class="chart"
							:option="phononChartOption"
							ref="phononChart"
						/>
						<el-row
							v-if="!phononChartOption"
							class="cover flex-center-col"
						>
							<img src="@/assets/images/phonon_bg.png" />
							<p class="cover-tip">
								No Data
							</p>
						</el-row>
					</el-col>
					<el-col class="button-box" :xl="8" :md="8">
						<el-row class="data-info" v-if="attributes.phonon.data">
							<!-- Update Date -->
							<el-row :gutter="20" type="flex" align="middle">
								<el-col :span="DetailSpan / 3">
									<div class="label">
										<el-tag effect="plain">
											Update Date
										</el-tag>
									</div>
								</el-col>
								<el-col :span="(DetailSpan * 2) / 3">
									<div class="content">
										{{ attributes.phonon.date }}
									</div>
								</el-col>
							</el-row>
							<!-- Update By -->
							<el-row :gutter="20" type="flex" align="middle">
								<el-col :span="DetailSpan / 3">
									<div class="label">
										<el-tag effect="plain">
											Update By
										</el-tag>
									</div>
								</el-col>
								<el-col :span="(DetailSpan * 2) / 3">
									<div class="content">
										<router-link to="/users">
											<el-link type="primary"
												>ID
												{{
													attributes.phonon.user
												}}</el-link
											>
										</router-link>
									</div>
								</el-col>
							</el-row>
						</el-row>
						<el-row>
							<el-button
								type="primary"
								plain
								@click="exportChartData('phonon', 'image')"
								>Export Image</el-button
							>
							<el-button
								type="primary"
								plain
								@click="exportChartData('phonon', 'file')"
								>Download Data</el-button
							>
						</el-row>
						<el-row class="cover">
							<el-upload
								class="upload-box"
								action=""
								drag
								ref="uploadPhonon"
								:auto-upload="false"
								:file-list="phononFileList"
								:on-preview="phononPreview"
								:on-change="phononFileChange"
								:multiple="false"
								:limit="1"
							>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">
									Drag here, or <em>click to upload</em>
								</div>
								<div class="el-upload__tip" slot="tip">
									Mind the format of your file, tap file name
									to preview.
								</div>
							</el-upload>
						</el-row>
						<el-row>
							<el-button
								type="success"
								plain
								@click="submitPhononUpload"
								>Upload</el-button
							>
						</el-row>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="Conductivity"></el-tab-pane>
		</el-tabs>
	</d2-container>
</template>

<script>
import $ from "jquery";
import $3Dmol from "@/libs/3Dmol-nojquery.js";
// echart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	DataZoomComponent
} from "echarts/components";
import { default as VChart, THEME_KEY } from "vue-echarts";
import * as api from "./api";
import NumberTable from "@/components/number-table";
import util from "@/libs/util";
let viewer = null;
let viewer_id = null;
const viewer_config = {
	// backgroundColor: "#73757C",
	backgroundColor: "white"
};
use([
	CanvasRenderer,
	LineChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	DataZoomComponent
]);
// TODO: hidden charts that donot need to show
export default {
	name: "data-structure",
	components: {
		VChart,
		NumberTable
	},
	provide: {
		// [THEME_KEY]: "dark"
	},
	data() {
		return {
			id: "",
			structure: {
				attributes: {
					cell: [],
					reciprocal_cell: [],
					center_of_mass: [],
					phonon: { data: null, user: null, date: null },
					band: { data: null, user: null, date: null }
				}
			},
			fullscreenLoading: true,
			currentTab: "Material Detail",
			numberPrecision: 6,
			DetailSpan: 24,
			viewerLoading: false,
			viewerCoverTip: true,
			phononFileList: [],
			bandFileList: [],
			phononChartOption: null,
			bandChartOption: null
		};
	},
	computed: {
		attributes() {
			// phonon, band should at least be an object
			return Object.assign(
				{
					cell: [],
					reciprocal_cell: [],
					center_of_mass: [],
					phonon: { data: null, user: null, date: null },
					band: { data: null, user: null, date: null }
				},
				this.structure.attributes
			);
		}
	},
	methods: {
		handleTabSwitch(event) {
			if (this.currentTab == event.label) {
				return;
			} else {
				this.currentTab = event.label;
			}
			this.loadTabData();
		},
		loadTabData() {
			if (this.currentTab == "Phonon Dispersion") {
				if (this.attributes.phonon && this.attributes.phonon.data) {
					let [
						phononFileString,
						phononFileOption
					] = this.loadPhononData(this.attributes.phonon.data);
					this.phononFileString = phononFileString;
					this.phononFileOption = phononFileOption;
					!!this.$refs.phononChart && this.$refs.phononChart.clear();
					this.phononChartOption = phononFileOption;
				}
			} else if (this.currentTab == "Band Structure") {
				if (this.attributes.band && this.attributes.band.data) {
					let [fileString, fileOption] = this.loadBandData(
						this.attributes.band.data
					);
					this.bandFileString = fileString;
					this.bandFileOption = fileOption;
					!!this.$refs.bandChart && this.$refs.bandChart.clear();
					this.bandChartOption = fileOption;
				}
			}
		},
		displayViewer() {
			this.viewerLoading = true;
			api.GetFileStream(this.id).then(resp => {
				this.structureFileData = resp.data;
				this.showStructureViewer(this.structureFileData);
				this.viewerLoading = false;
				this.viewerCoverTip = false;
			});
		},
		showStructureViewer(fileString, ext_name = "cif") {
			if (viewer) {
				viewer.clear();
			}
			viewer_id = $(`#detail-viewer-${this.id}`);
			viewer_id.children("canvas").remove();
			viewer = $3Dmol.createViewer(viewer_id, viewer_config);
			viewer.setBackgroundColor(0xffffffff, 0);
			let m = viewer.addModel(fileString, ext_name, {
				duplicateAssemblyAtoms: true,
				doAssembly: true
			});
			viewer.setHoverable(
				{},
				true,
				function(atom, viewer, event, container) {
					if (!atom.label) {
						atom.label = viewer.addLabel(atom.elem, {
							position: atom,
							backgroundColor: "darkgreen",
							backgroundOpacity: 0.5,
							fontColor: "white"
						});
					}
				},
				function(atom) {
					if (atom.label) {
						viewer.removeLabel(atom.label);
						delete atom.label;
					}
				}
			);
			viewer.setStyle({
				stick: {
					radius: 0.1,
					colorscheme: "Jmol",
					opacity: 0.9,
					singleBonds: true
				},
				sphere: { radius: 0.6, colorscheme: "Jmol", opacity: 1 }
			});
			viewer.addUnitCell(m, {
				box: { color: "purple" }
			});
			viewer.replicateUnitCell(2, 2, 2);
			viewer.zoomTo();
			viewer.render();
		},
		clearPageContent(to, from, next) {
			if (viewer) {
				viewer.clear();
			}
			if (viewer_id) viewer_id.children("canvas").remove();
			this.viewerCoverTip = true;
			next();
		},
		uploadPhononPlotData() {},
		phononFileChange(file, fileList) {
			this.fullscreenLoading = true;
			const reader = new FileReader();
			reader.readAsText(file.raw, "UTF-8");
			reader.onload = event => {
				try {
					let [
						phononFileString,
						phononFileOption
					] = this.loadPhononData(event.target.result.trim());
					this.phononFileString = phononFileString;
					this.phononFileOption = phononFileOption;
					this.phononFileList = fileList;
				} catch (err) {
					return (this.fullscreenLoading =
						false &&
						this.$message.error(`Unsupport file format. ${err}`));
				}
				this.fullscreenLoading = false;
			};
		},
		bandFileChange(file, fileList) {
			this.fullscreenLoading = true;
			const reader = new FileReader();
			reader.readAsText(file.raw, "UTF-8");
			reader.onload = event => {
				try {
					let [bandFileString, bandFileOption] = this.loadBandData(
						event.target.result.trim()
					);
					this.bandFileString = bandFileString;
					this.bandFileOption = bandFileOption;
					this.bandFileList = fileList;
				} catch (err) {
					return (this.fullscreenLoading =
						false &&
						this.$message.error(`Unsupport file format. ${err}`));
				}
				this.fullscreenLoading = false;
			};
		},
		loadPhononData(fileString) {
			let option = {
				grid: {
					show: true,
					borderWidth: 0.5,
					shadowColor: "rgba(0, 0, 0, 0.5)",
					shadowBlur: 10
				},
				title: {
					text: `Phonon Dispersion`,
					left: "center"
				},
				tooltip: {
					trigger: "axis"
				},
				xAxis: {
					name: "Wave Vector",
					nameLocation: "center",
					nameTextStyle: {
						lineHeight: 56,
						fontWeight: "bold",
						fontSize: 16
					},
					splitLine: {
						show: true,
						lineStyle: {
							width: 0.5,
							opacity: 0.5
						}
					}
				},
				yAxis: {
					name: "Frequency",
					nameLocation: "center",
					nameTextStyle: {
						lineHeight: 56,
						fontWeight: "bold",
						fontSize: 16
					},
					type: "value",
					splitLine: {
						show: true,
						lineStyle: {
							width: 0.5,
							opacity: 0.5
						}
					}
				},
				series: []
			};

			let phononFileString = "";
			let bands = fileString.split(/\n\s*\n/g);
			bands.forEach(bandstr => {
				let band_y = {
					type: "line",
					smooth: true,
					showSymbol: false
				};
				let band = bandstr.split(/\n/g);
				let xdata = [];
				let ydata = [];
				band.forEach(pos => {
					let [x, y] = pos.trim().split(/\s+/g);
					xdata.push(parseFloat(x));
					ydata.push(parseFloat(y));
					phononFileString += pos.trim() + "\n";
				});
				if (!option.xAxis.hasOwnProperty("data"))
					option.xAxis.data = xdata;
				band_y.data = ydata;
				option.series.push(band_y);
				phononFileString += "\n";
			});
			return [phononFileString, option];
		},
		loadBandData(fileString) {
			let option = {
				grid: {
					show: true,
					borderWidth: 0.5,
					shadowColor: "rgba(0, 0, 0, 0.5)",
					shadowBlur: 10
				},
				title: {
					text: `Band Structure`,
					left: "center"
				},
				tooltip: {},
				dataZoom: [
					{
						id: "dataZoomX",
						show: true,
						type: "slider",
						filterMode: "none",
						xAxisIndex: [0]
					},
					{
						id: "dataZoomY",
						show: true,
						type: "inside",
						filterMode: "none",
						yAxisIndex: [0],
						startValue: -10,
						endValue: 10
					}
				],
				xAxis: {
					splitLine: {
						show: true,
						lineStyle: {
							width: 0.5,
							opacity: 0.5
						}
					},
					minorTick: {
						show: true
					},
					min: "dataMin",
					max: "dataMax"
				},
				yAxis: {
					type: "value",
					splitLine: {
						show: true,
						lineStyle: {
							width: 0.5,
							opacity: 0.5
						}
					},
					minorTick: {
						show: true
					},
					min: "dataMin",
					max: "dataMax"
				},
				series: []
			};

			let bandFileString = "";
			let bands = fileString.split(/\n\s*\n/g);
			bands.forEach(bandstr => {
				let band_y = {
					type: "line",
					smooth: true,
					showSymbol: false
				};
				let band = bandstr.split(/\n/g);
				let xdata = [];
				let ydata = [];
				band.forEach(pos => {
					let [x, y] = pos.trim().split(/\s+/g);
					xdata.push(parseFloat(x));
					ydata.push(parseFloat(y));
					bandFileString += pos.trim() + "\n";
				});
				if (!option.xAxis.hasOwnProperty("data"))
					option.xAxis.data = xdata;
				band_y.data = ydata;
				option.series.push(band_y);
				bandFileString += "\n";
			});
			return [bandFileString, option];
		},
		phononPreview(file) {
			this.phononChartOption = this.phononFileOption;
		},
		bandPreview(file) {
			this.bandChartOption = this.bandFileOption;
		},
		submitPhononUpload() {
			if (this.phononFileList.length == 0) {
				return this.$notify.info("You have to choose a file.");
			}
			this.fullscreenLoading = true;
			let callback = () => {
				this.$api
					.AddObj("/structures/phonon/", {
						id: this.structure.id,
						user: util.cookies.get("uuid"),
						data: this.phononFileString
					})
					.then(resp => {
						if (resp.code == 0) {
							this.structure = resp.data;
							this.loadTabData();
							this.phononFileList = [];
							this.fullscreenLoading = false;
							this.$message.success("Submit successfully!");
						} else {
							this.$message.error(resp.code);
						}
					});
			};
			if (this.attributes.phonon && this.attributes.phonon.data) {
				this.$confirm(
					"This operation will overide current phonon dispersion data, continue?",
					"Attention",
					{
						confirmButtonText: "sure",
						cancelButtonText: "cancel",
						type: "warning"
					}
				)
					.then(() => {
						callback();
					})
					.catch(() => {
						this.fullscreenLoading = false;
					});
			} else {
				callback();
			}
		},
		submitBandUpload() {
			if (this.bandFileList.length == 0) {
				return this.$notify.info("You have to choose a file.");
			}
			this.fullscreenLoading = true;
			let callback = () => {
				this.$api
					.AddObj("/structures/band/", {
						id: this.structure.id,
						user: util.cookies.get("uuid"),
						data: this.bandFileString
					})
					.then(resp => {
						if (resp.code == 0) {
							this.structure = resp.data;
							this.loadTabData();
							this.bandFileList = [];
							this.fullscreenLoading = false;
							this.$message.success("Submit successfully!");
						} else {
							this.$message.error(resp.code);
						}
					});
			};
			if (this.attributes.band && this.attributes.band.data) {
				this.$confirm(
					"This operation will overide current band structure data, continue?",
					"Attention",
					{
						confirmButtonText: "sure",
						cancelButtonText: "cancel",
						type: "warning"
					}
				)
					.then(() => {
						callback();
					})
					.catch(() => {
						this.fullscreenLoading = false;
					});
			} else {
				callback();
			}
		},
		exportChartData(chart, type) {
			let data = null;
			if (type == "image") {
				if (chart == "phonon") {
					data = this.$refs.phononChart;
				} else if (chart == "band") {
					data = this.$refs.bandChart;
				}
				if (!data) return this.$notify.info("No chart data currently.");
				let img = {
					src: data.getDataURL({
						pixelRatio: window.devicePixelRatio || 2
					}),
					width: data.getWidth(),
					height: data.getHeight()
				};
				const element = document.createElement("a");
				element.setAttribute("href", img.src);
				element.setAttribute("download", chart + ".png");
				element.style.display = "none";
				element.click();
			} else if (type == "file") {
				if (chart == "phonon") {
					data = this.phononFileString;
				} else if (chart == "band") {
					data = this.bandFileString;
				}
				if (!data) return this.$notify.info("No chart data currently.");
				const element = document.createElement("a");
				element.setAttribute(
					"href",
					"data:text/plain;charset=utf-8," + encodeURIComponent(data)
				);
				element.setAttribute("download", chart + ".data");
				element.style.display = "none";
				element.click();
			}
		}
	},
	mounted() {
		this.id = this.$route.params.id;
		if (this.id == "") {
			this.$message.error("Whoops! This id has expired.");
			setTimeout(() => {
				this.$router.back();
			}, 1500);
		}
		api.GetObj(this.id).then(resp => {
			this.structure = resp.data;
			this.fullscreenLoading = false;

			this.$store.dispatch("d2admin/page/update", {
				tagName: this.$route.fullPath,
				title: `${this.attributes.formula.replace(/<[^<>]+>/g, "")}`
			});
		});
		viewer_config.id = `detail-viewer-canvas-${this.id}`;
	},
	beforeRouteUpdate(to, from, next) {
		this.clearPageContent(to, from, next);
	},
	beforeRouteLeave(to, from, next) {
		this.clearPageContent(to, from, next);
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/public.scss";
.panel {
	padding: 24px 40px;
	width: 100%;
	// height: 100%;
	.cover {
		width: 100%;
		height: 100%;
		@extend %flex-col;
	}
	> .el-row {
		width: 100%;
		height: 100%;
	}
	.phonon-panel {
		text-align: center;
	}
}
.chart-box {
	padding: 16px;
	height: 75vh;
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	position: relative;
	.cover {
		@extend %unable-select;
		img {
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0.1;
			filter: blur(1px);
		}
		&::after {
			content: "";
			width: 100%;
			height: 100%;
			position: absolute;
			opacity: 0;
			top: 0;
			left: 0;
		}
	}
	.chart {
		// max-width: 720px;
		// max-height: 600px;
		margin: 16px auto;
	}
}
.button-box {
	.el-row + .el-row {
		margin-top: 16px;
	}
}

@mixin detail-title() {
	text-align: center;
	font-size: 24px;
	font-weight: bold;
	border-bottom: 1px solid #99a9bf;
	padding-bottom: 16px;
}
.material-detail {
	text-transform: uppercase;
	.material-detail-title {
		@include detail-title();
	}
	.label {
		// color: #99a9bf;
		// font-size: 16px;
		// font-weight: bold;
	}
	> .el-row {
		padding: 8px 0;
	}
}
.material-viewer-container {
	// height: 100%;
	> .el-row {
		padding: 8px 0;
	}
	.viewer-title {
		@include detail-title();
	}
	.structure-viewer {
		@extend %flex-center-col;
		background-color: rgba($color: #fff, $alpha: 0.1);
		color: #99a9bf;
		padding: 12px;
		border: 1px dashed #d9d9d9;
		width: 100%;
		height: 100%;
		max-height: 720px;
		position: relative;
		.structure-viewer-cover {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			opacity: 0.2;
		}
		.cover-tip {
			z-index: 99;
			background: rgba($color: #000000, $alpha: 0.1);
			padding: 24px;
			border-radius: 5px;
			@extend %unable-select;
			transition: background-color 0.3s;
		}
		.cover-tip:hover {
			background: rgba($color: #868686, $alpha: 0.5);
			color: #fff;
		}
	}
}
</style>
<style lang="scss">
.tab-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
	&.el-tabs--border-card {
		background-color: transparent;
	}
	.el-tabs__content {
		overflow-y: auto;
		@include scrollBar(6px);
	}
	.el-tabs__header {
		background: rgba($color: #fff, $alpha: 0.8);
		border-radius: 5px;
	}
	.el-tabs__active-bar.is-bottom {
		transform: translateX(5px);
	}
	.el-tabs__content {
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}
}
.detail-date-picker input {
	border: none !important;
}
.material-viewer-container {
	canvas {
		padding: 8px !important;
	}
}
</style>
