<script lang="ts">
	export let cx = 0;
	export let cy = 0;
	export let r = 7;
	export let fill = 'steelblue';
	export let fillOpacity = 0.4;
	export let stroke = 'rgba(0,0,0,0.5)';
	export let strokeWidth = 1.5;
</script>

<circle {r} {cx} {cy} {fill} fill-opacity={fillOpacity} {stroke} stroke-width={strokeWidth} />
