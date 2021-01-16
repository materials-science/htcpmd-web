<template>
	<d2-container v-loading.fullscreen.lock="fullscreenLoading">
		<template slot="header">
			<el-page-header @back="goBack">
				<template slot="content"
					><span v-html="attributes.formula"></span> -
					{{ structure.id }}</template
				>
			</el-page-header>
		</template>
		<!-- <template slot="footer"> -->
		<el-tabs tab-position="bottom" class="tab-container">
			<el-tab-pane label="Material Detail" class="meterial-panel">
				<el-row :gutter="20">
					<el-col :span="12" class="material-detail">
						<el-row>
							<el-col :span="DetailSpan">
								<p class="material-detail-title">
									Material Detail
								</p>
							</el-col>
						</el-row>
						<!-- cell -->
						<el-row :gutter="20">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain"> cell </el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									<el-table
										:data="attributes.cell"
										:show-header="false"
										border
									>
										<el-table-column align="center">
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[0]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
										<el-table-column align="center">
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[1]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
										<el-table-column align="center">
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[2]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
						</el-row>
						<!-- reciprocal_cell -->
						<el-row :gutter="20">
							<el-col :span="DetailSpan / 3">
								<div class="label">
									<el-tag effect="plain">
										reciprocal_cell cell
									</el-tag>
								</div>
							</el-col>
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									<el-table
										:data="attributes.reciprocal_cell"
										:show-header="false"
										border
									>
										<el-table-column align="center">
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[0]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
										<el-table-column align="center">
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[1]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
										<el-table-column align="center">
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[2]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
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
							<el-col :span="(DetailSpan * 2) / 3">
								<div class="content">
									<el-table
										:data="[attributes.center_of_mass]"
										:show-header="false"
										border
										size="mini"
									>
										<el-table-column>
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[0]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
										<el-table-column>
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[1]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
										<el-table-column>
											<template slot-scope="scope">
												<el-input-number
													v-model="scope.row[2]"
													:precision="numberPrecision"
													:controls="false"
													disabled
													class="detail-number"
												></el-input-number>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</el-col>
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
						:span="12"
						class="material-viewer-container"
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
			<el-tab-pane label="Band Structure"></el-tab-pane>
			<el-tab-pane label="Phonon Dispersion"></el-tab-pane>
			<el-tab-pane label="Conductivity"></el-tab-pane>
		</el-tabs>
		<!-- </template> -->
	</d2-container>
</template>

<script>
import $ from "jquery";
import $3Dmol from "@/libs/3Dmol-nojquery.js";
import * as api from "./api";
let viewer = null;
let viewer_id = null;
const viewer_config = {
	// backgroundColor: "#73757C",
	backgroundColor: "white"
};
export default {
	name: "data-structure",
	data() {
		return {
			id: "",
			structure: {},
			attributes: {},
			fullscreenLoading: true,
			numberPrecision: 6,
			DetailSpan: 24,
			viewerLoading: false,
			viewerCoverTip: true
		};
	},
	methods: {
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
			let m = viewer.addModel(fileString, ext_name);
			viewer.addUnitCell(m, {
				box: { color: "purple" }
			});
			viewer.addUnitCell(m);
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
				stick: { radius: 0.15, opacity: 0.7, singleBonds: true },
				sphere: { scale: 0.4 }
			});
			viewer.zoomTo();
			viewer.render();
		},
		goBack() {
			this.$router.back();
		},
		clearPageContent(to, from, next) {
			if (viewer) {
				viewer.clear();
			}
			if (viewer_id) viewer_id.children("canvas").remove();
			this.viewerCoverTip = true;
			next();
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
			this.attributes = this.structure.attributes;
			this.fullscreenLoading = false;

			this.$store.dispatch("d2admin/page/update", {
				tagName: this.$route.fullPath,
				title: `structure-${this.attributes.formula}`
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

<style lang="scss">
@import "@/assets/style/public.scss";
.tab-container {
	.el-tabs__content {
		margin-bottom: 100px;
	}
	.el-tabs__header {
		display: flex;
		justify-content: center;
		position: fixed;
		width: 50%;
		left: 25%;
		bottom: 20px;
		padding: 10px;
		height: 80px;
		background: rgba($color: #fff, $alpha: 0.8);
		transform: scale(1.2);
		border-radius: 5px;
	}
	.el-tabs__active-bar.is-bottom {
		transform: translateX(5px);
	}
}
.meterial-panel {
	padding: 20px 40px;
}
@mixin detail-title() {
	text-align: center;
	font-size: 24px;
	font-weight: bold;
	border-bottom: 1px solid #99a9bf;
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
.detail-date-picker input {
	border: none !important;
}
.detail-number {
	width: 100%;
	input {
		border: none !important;
		background: none !important;
		padding: initial !important;
		cursor: default !important;
		color: black !important;
	}
}

.material-viewer-container {
	height: 50vh;
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
		border: none;
		padding: 10px;
		border: 1px dashed #d9d9d9;
		width: 100%;
		height: 100%;
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
			padding: 20px;
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
