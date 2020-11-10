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
									<el-tag effect="plain"> cell </el-tag>
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
					<el-col :span="12" class="material-viewer-container">
						<div
							id="structure-viewer"
							:style="{
								'background-image': `url(${structure.cover_img}}})`,
							}"
							v-loading="viewerLoading"
						>
							<p
								class="cover-tip"
								@dblclick="showStructureViewer"
							>
								Double click to show
							</p>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="配置管理"></el-tab-pane>
			<el-tab-pane label="角色管理"></el-tab-pane>
			<el-tab-pane label="定时任务补偿"></el-tab-pane>
		</el-tabs>
		<!-- </template> -->
	</d2-container>
</template>

<script>
	import $ from "jquery";
	import $3Dmol from "@/libs/3Dmol-nojquery.js";
	import * as api from "./api";
	let viewer = null;
	const viewer_id = "#structure-viewer";
	const viewer_config = {
		backgroundColor: "white",
	};
	export default {
		name: "data-structure",
		data() {
			return {
				id: "",
				structure: {},
				fullscreenLoading: true,
				numberPrecision: 6,
				DetailSpan: 24,
				viewerLoading: false,
			};
		},
		methods: {
			showStructureViewer() {
                this.viewerLoading = true;
			},
			
		mounted() {
			this.id = this.$route.params.id;
			if (this.id == "") {
				this.$message.error("Whoops! This id has expired.");
				setTimeout(() => {
					this.$router.back();
				}, 1500);
			}
			api.GetObj(this.id).then((resp) => {
				this.structure = resp.data;
				this.attributes = this.structure.attributes;
				this.fullscreenLoading = false;
			});
		},
	};
</script>

<style lang='scss'>
	@import "@/assets/style/public.scss";
	.tab-container {
		.el-tabs__header {
			display: flex;
			justify-content: center;
		}
	}
	.meterial-panel {
		padding: 20px 40px;
	}
	.material-detail {
		text-transform: uppercase;
		.material-detail-title {
			text-align: center;
			font-size: 24px;
			font-weight: bold;
			border-bottom: 1px solid #99a9bf;
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
		padding: 20px;
		height: 50vh;
		#structure-viewer {
			@extend %flex-center-col;
			background-color: rgba($color: #fff, $alpha: 0.1);
			color: #99a9bf;
			.cover-tip {
				background: rgba($color: #000000, $alpha: 0.1);
				padding: 20px;
				border-radius: 5px;
				@extend %unable-select;
			}
		}
	}
</style>