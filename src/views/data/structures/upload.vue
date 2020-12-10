<template>
	<d2-container>
		<!-- <template slot="header">区域划分</template> -->
		<div class="split-wrap">
			<SplitPane :min-percent="30" :default-percent="40" split="vertical">
				<template slot="paneL">
					<!-- action="https://jsonplaceholder.typicode.com/posts/" -->
					<SplitPane split="horizontal" :default-percent="100">
						<template slot="paneL">
							<el-upload
								class="upload-box"
								drag
								multiple
								ref="structureUpload"
								:action="uploadUrl"
								:headers="uploadHeaders"
								:on-preview="handleFilePreview"
								:on-change="handleFileChange"
								:on-remove="handleFileRemove"
								:file-list="fileList"
								:auto-upload="false"
								:on-error="uploadError"
								:on-exceed="replaceCurrentFile"
							>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">
									Drag crystal structure file to here or<em>
										Click mouse</em
									>
								</div>
								<div class="el-upload__tip" slot="tip">
									Support <strong>POSCAR</strong>,
									<strong>CIF</strong> etc.
								</div>
							</el-upload>
						</template>
						<!-- <template slot="paneR"> </template> -->
					</SplitPane>
				</template>
				<template slot="paneR">
					<SplitPane split="horizontal" :default-percent="80">
						<template slot="paneL">
							<div class="upload-box">
								<div class="structure-viewer"></div>
								<div class="tip"></div>
							</div>
						</template>
						<template slot="paneR">
							<div
								style="
									width: 100%;
									height: 100%;
									display: flex;
									align-items: center;
									justify-content: space-around;
									padding: 0 20px;
								"
							>
								<el-button
									type="warning"
									plain
									style="width: 100%"
									@click="clearFileList"
									>Clear Current Files List</el-button
								>
								<el-button
									type="primary"
									plain
									style="width: 100%"
									@click="uploadSubmit"
									>Submit To Server</el-button
								>
							</div>
						</template>
					</SplitPane>
				</template>
			</SplitPane>
		</div>
	</d2-container>
</template>

<script>
import SplitPane from "vue-splitpane";
import $ from "jquery";
import $3Dmol from "@/libs/3Dmol-nojquery.js";
import util from "@/libs/util";
// import "@/libs/3Dmol-nojquery.js";
let viewer = null;
let viewer_id = ".upload-box .structure-viewer";
const viewer_config = {
	backgroundColor: "white",
	id: "upload-viewer-canvas",
};
export default {
	name: "data-structures-upload",
	components: {
		SplitPane,
	},
	data() {
		return {
			fileList: null,
			uploadUrl: "/api/structures/files/",
			uploadHeaders: {
				Authorization: `Token ${util.cookies.get("token")}`,
			},
		};
	},
	mounted() {
		viewer_id = $(viewer_id);
		// 加载完成后显示提示
		if ($3Dmol) {
			this.showInfo("Tip", "3Dmol loaded!");
			viewer = $3Dmol.createViewer(viewer_id, viewer_config);
		}
	},
	methods: {
		// 显示提示
		showInfo(title, message) {
			this.$notify({
				title: title,
				message: message,
			});
		},
		replaceCurrentFile(files, fileList) {},
		handleFileChange(file, fileList) {
			// this.showStructureViewer(file);
		},
		showStructureViewer(file) {
			viewer.clear();
			const reader = new FileReader();
			// const viewer = this.viewer;
			reader.readAsText(file.raw, "UTF-8");
			reader.onload = (event) => {
				// There is a plugin to guess type of file
				let name = file.name.toLowerCase();
				let ext_name = "";
				if (name.indexOf(".") != -1) {
					ext_name = name.split(".").pop();
				} else {
					switch (name) {
						case "poscar": {
							ext_name = "vasp";
							break;
						}
					}
				}
				let fileString = event.target.result;
				let m = viewer.addModel(fileString, ext_name);
				viewer.addUnitCell(m, {
					box: { color: "purple" },
				});
				// viewer.addUnitCell(m);
				viewer.setHoverable(
					{},
					true,
					function (atom, viewer, event, container) {
						if (!atom.label) {
							atom.label = viewer.addLabel(atom.elem, {
								position: atom,
								backgroundColor: "darkgreen",
								backgroundOpacity: 0.5,
								fontColor: "white",
							});
						}
					},
					function (atom) {
						if (atom.label) {
							viewer.removeLabel(atom.label);
							delete atom.label;
						}
					}
				);

				viewer.setStyle({
					stick: { scale: 0.1 },
					sphere: { scale: 0.5 },
				});
				viewer.zoomTo();
				viewer.render();
				// viewer.zoom(1.2, 500);
			};
		},
		handleFileRemove(file, fileList) {
			// viewer.clear();
		},
		handleFilePreview(file) {
			this.showStructureViewer(file);
		},
		triggerSubmit(e) {
			$("#btn-submit").trigger("click");
		},
		uploadSubmit(e) {
			this.$refs.structureUpload.submit();
			viewer.clear();
		},
		clearFileList() {
			this.$refs.structureUpload.clearFiles();
			viewer.clear();
		},
		uploadError(err) {
			this.$message.error(`Uploading failed! ${err}`);
		},
	},
};
</script>

<style lang="scss">
.split-wrap {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	.splitter-pane-resizer {
		display: none;
	}
}
.upload-box {
	height: 100%;
	padding: 20px;
	text-align: center;
	.el-upload.el-upload--text {
		width: 100%;
		flex: 1;
		height: 40%;
		.el-upload-dragger {
			width: initial;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	.el-upload-list.el-upload-list--text {
		max-height: 50%;
		overflow: auto;
		text-align: left;
		li {
			background-color: rgba(33, 33, 33, 0.1);
			cursor: pointer;
			transition: background-color 0.3s;
		}
		li:hover {
			background-color: rgba(33, 33, 33, 0.3);
		}
	}
	.structure-viewer {
		width: 100%;
		height: 100%;
		position: relative;
		border: 1px dashed #d9d9d9;
	}
}
</style>
