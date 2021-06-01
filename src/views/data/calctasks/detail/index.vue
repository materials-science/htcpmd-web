<template>
	<d2-container class="data-calctask-container">
		<el-row
			:gutter="20"
			v-loading="loading_nodes_tree"
			style="height: 100%;"
		>
			<el-col
				:xl="10"
				:lg="10"
				:md="10"
				style="height: 100%;"
				class="flex-col"
			>
				<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input>
				<el-tree
					class="nodes-tree d2-mt-16 d2-pr-16 no-bg box-shadow"
					:data="nodes_tree"
					:expand-on-click-node="false"
					@node-click="onClickNode"
					:props="defaultProps"
					default-expand-all
					:filter-node-method="filterNode"
					highlight-current
					ref="tree"
				>
					<el-row slot-scope="{ node, data }" style="flex: 1;">
						<el-col :span="18" class="text-size-16">
							<el-tag effect="plain" size="mini">{{
								data.id
							}}</el-tag>
							{{ node.label }}
						</el-col>
						<el-col :span="6" class="d2-text-end">
							<span class="d2-pr-16">{{
								dayjs(data.ctime).fromNow()
							}}</span>
							<el-tooltip
								class="item"
								effect="dark"
								:content="data.status"
								placement="right"
								:disabled="data.status == null"
							>
								<el-link
									type="primary"
									style="text-transform: capitalize;"
									>{{ data.state }}</el-link
								>
							</el-tooltip>
						</el-col>
					</el-row>
				</el-tree>
			</el-col>
			<el-col
				:xl="14"
				:lg="14"
				:md="14"
				style="height: 100%;"
				v-loading="loading_node_info"
			>
				<el-tabs
					type="border-card"
					class="node-info-tabs no-bg"
					:value="activated_tab"
				>
					<el-tab-pane label="CalcTask" name="CalcTask">
						<el-card shadow="never">
							<div slot="header">
								<span>Info</span>
							</div>
							<el-form
								label-position="top"
								class="data-table-expand--wrap"
								disabled
							>
								<el-form-item label="label">
									<el-input
										disabled
										:value="calctask.label"
									></el-input>
								</el-form-item>
								<el-form-item label="uuid">
									<el-input
										disabled
										:value="calctask.uuid"
									></el-input>
								</el-form-item>
								<el-form-item label="calctask category">
									<el-input
										disabled
										:value="calctask.calctask_category"
									></el-input>
								</el-form-item>
								<el-form-item label="calctask type">
									<el-input
										disabled
										:value="calctask.calctask_type"
									></el-input>
								</el-form-item>
								<el-form-item label="user">
									<el-input
										disabled
										:value="calctask.user.email"
									></el-input>
								</el-form-item>
								<el-form-item
									prop="description"
									label="task description"
								>
									<el-input
										disabled
										type="textarea"
										autosize
										:value="calctask.description"
									></el-input>
								</el-form-item>
								<el-form-item
									prop="status_message"
									label="status message"
								>
									<el-input
										disabled
										type="textarea"
										autosize
										:value="calctask.status_message"
									></el-input>
								</el-form-item>
								<el-form-item label="tags">
									<el-link
										type="primary"
										v-for="(tag, index) in calctask.tags"
										:key="index"
										class="d2-mr-10"
										>{{ tag.name }}</el-link
									>
								</el-form-item>
								<el-form-item label="structure">
									<el-link
										@click.native.prevent="
											goToStructurePage(
												calctask.structure.uuid
											)
										"
										v-html="calctask.structure.formula"
										type="primary"
									>
									</el-link>
								</el-form-item>
								<el-form-item label="created time">
									<el-date-picker
										v-model="calctask.created_time"
										type="datetime"
										placeholder="created time"
										readonly
									>
									</el-date-picker>
								</el-form-item>
							</el-form>
						</el-card>
						<el-card shadow="never" class="d2-mt-16">
							<div slot="header">
								<span>Logs</span>
							</div>
							<d2-highlight
								:code="calctask.logs.join('\n')"
								lang="bash"
							/>
						</el-card>
					</el-tab-pane>
					<el-tab-pane
						label="Info"
						name="Info"
						:disabled="!node_info.info"
					>
						<d2-highlight :code="node_info.info" lang="bash" />
					</el-tab-pane>
					<el-tab-pane
						label="Logs"
						name="Logs"
						:disabled="!node_info.report"
					>
						<el-card shadow="never">
							<d2-highlight
								:code="node_info.report"
								lang="bash"
							/>
						</el-card>
					</el-tab-pane>
					<el-tab-pane
						label="Inputs"
						name="Inputs"
						:disabled="!node_info.inputs"
					>
						<el-card shadow="never">
							<el-row v-for="key in node_info.inputs" :key="key">
								<el-link>{{ key }}</el-link>
							</el-row>
						</el-card>
					</el-tab-pane>
					<el-tab-pane
						label="Outputs"
						name="Outputs"
						:disabled="!node_info.outputs"
					>
						<el-card shadow="never">
							<el-row v-for="key in node_info.outputs" :key="key">
								<el-link>{{ key }}</el-link>
							</el-row>
						</el-card>
					</el-tab-pane>
					<el-tab-pane label="Workdir" name="Workdir" disabled>
					</el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
	</d2-container>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const apiPrefix = "/calctasks/";
export default {
	name: "data-calctask",
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	},

	methods: {
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		getNodeInfo(id) {
			this.$api
				.GetObj(apiPrefix, this.uuid, "/node_info/", { id })
				.then(resp => {
					if (resp.code == 0) {
						console.log(resp.data);
						this.node_info = resp.data;
						this.activated_tab = "Info";
					} else {
						this.$message.error(`${resp.code} | ${resp.msg}`);
					}
					this.loading_node_info = false;
				});
		},
		onClickNode(obj, node, comp) {
			this.loading_node_info = true;
			console.log(obj);
			console.log(node);
			console.log(comp);
			this.getNodeInfo(obj.id);
		},
		goToStructurePage(uuid) {
			if (uuid == "") {
				this.$message.error("Structure UUID is None!");
			}
			this.$router.push({
				path: `/data/structures/${uuid}`
			});
		}
	},

	data() {
		return {
			dayjs,
			uuid: null,
			activated_tab: "CalcTask",
			loading_nodes_tree: true,
			filterText: "",
			calctask: {},
			nodes_tree: [],
			defaultProps: {
				children: "children",
				label: "label"
			},
			node_info: {},
			loading_node_info: false
		};
	},
	mounted() {
		this.uuid = this.$route.params.uuid;
		this.$api.GetObj(apiPrefix, this.uuid).then(resp => {
			if (resp.code == 0) {
				this.calctask = resp.data;
				console.log(this.calctask);
			}
		});
		this.$api.GetObj(apiPrefix, this.uuid, "/nodes_tree/").then(resp => {
			if (resp.code == 0) {
				this.nodes_tree = resp.data;
				this.loading_nodes_tree = false;
			} else {
				this.$message.error(`${resp.code} | ${resp.msg}`);
			}
		});
	}
};
</script>
<style lang="scss">
.data-calctask-container {
	.nodes-tree {
		height: calc(100% - 40px);
		overflow: auto;
		@include scrollBar();
		.el-tree-node__content {
			padding: 16px 0;
		}
	}
	.node-info-tabs {
		height: 100%;
		.el-tabs__content {
			height: calc(100% - 40px);
			overflow: auto;
			@include scrollBar();
		}
	}
}
</style>
