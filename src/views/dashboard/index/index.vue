<template>
	<d2-container type="ghost">
		<template slot="header">Header</template>
		<PeriodicTable class="periodic-table-wrap" />
	</d2-container>
</template>

<script>
	import PeriodicTable from "./components/PeriodicTable";
	export default {
		name: "PeriodicTablePage",
		components: {
			PeriodicTable,
		},
	};
</script>

<style lang="scss">
	.periodic-table-wrap {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		padding: 20px;
		overflow: hidden;
		.periodictable {
			margin: 0 auto;
		}
	}
</style>