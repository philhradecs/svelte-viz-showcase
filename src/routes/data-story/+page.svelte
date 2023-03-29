<script lang="ts">
	import ChartAligner from '$components/data-story/ChartAligner.svelte';
	import Chart, { type ChartProps } from '$components/chart/ChartRoot.svelte';

	import headerImage from '$assets/images/data-story-header.jpg';
	import { generateScatterplotData } from '../showcase/scatter-plot/+page.svelte';
	import DataStorySection from '$components/data-story/DataStorySection.svelte';
	import DataStoryWrapper from '$components/data-story/DataStoryWrapper.svelte';
	import ScatterPlot from '$visualizations/scatter-plot/ScatterPlot.svelte';
	import { _fetchContoursData } from '../showcase/density-contours/+page';
	import ContourChart from '$visualizations/contour/ContourChart.svelte';
	import { fade } from 'svelte/transition';

	const scatterPlotDefaultProps = {
		mt: 20,
		mr: 40,
		mb: 30,
		ml: 40,
		chartType: 'scatter',
		extraConfig: {
			xDomain: [0, 100] as number[],
			yDomain: [0, 100] as number[]
		}
	} as const;

	const stepsConfig = {
		step1: {
			...scatterPlotDefaultProps,
			data: generateScatterplotData('poisson', 200),
			pointRadius: 2
		},
		step2: {
			...scatterPlotDefaultProps,
			data: generateScatterplotData('bates', 200),
			pointRadius: 5
		},
		step3: {
			chartType: 'contour',
			fullSize: true,
			mt: 20,
			ml: 40,
			mb: 60,
			data: _fetchContoursData()
		},
		step4: {
			...scatterPlotDefaultProps,
			hidden: true,
			data: generateScatterplotData('poisson', 200),
			pointRadius: 8
		},
		step5: {
			...scatterPlotDefaultProps,
			data: generateScatterplotData('poisson', 100),
			pointRadius: 15
		},
		step6: {
			...scatterPlotDefaultProps,
			data: generateScatterplotData('normal', 200),
			pointRadius: 8
		},
		step7: {
			...scatterPlotDefaultProps,
			data: generateScatterplotData('poisson', 400),
			pointRadius: 1
		}
	} as const;

	let activeStep: keyof typeof stepsConfig | undefined;
	let activeConfig: (typeof stepsConfig)[keyof typeof stepsConfig] | undefined;

	$: {
		if (activeStep) {
			activeConfig = stepsConfig[activeStep];
		}
	}
</script>

<div class="mt-8 mb-8">
	<div class="container mx-auto max-w-4xl px-5 leading-relaxed md:text-lg">
		<DataStoryWrapper bind:activeStep>
			<div slot="chart">
				{#if activeConfig?.chartType === 'scatter'}
					<ChartAligner>
						<Chart chart={ScatterPlot} {...activeConfig} />
					</ChartAligner>
				{/if}
				{#if activeConfig?.chartType === 'contour'}
					<ChartAligner fullSize={activeConfig?.fullSize}>
						<Chart chart={ContourChart} {...activeConfig} />
					</ChartAligner>
				{/if}
			</div>
			<DataStorySection name="intro">
				<div>
					<img
						src={headerImage}
						alt="header-abstract"
						class="aspect-video md:aspect-auto md:h-[320px] object-cover"
						height={320}
					/>
					<h1 class="mt-3 mb-6 tracking-wide">Data Story Test Heading</h1>
				</div>

				<div>
					<h2>Intro</h2>
					Red and Slim found the two strange little animals the morning after they heard the thunder
					sounds. They knew that they could never show their new pets to their parents. There was a spatter
					of pebbles against the window and the youngster stirred in his sleep. Another, and he was awake.
					He sat up stiffly in bed. Seconds passed while he interpreted his strange surroundings. He
					wasn't in his own home, of course. This was out in the country. It was colder than it should
					be and there was green at the window. "Slim!"
					<br /><br />
					you bring D3.js is a JavaScript library for manipulating documents based on data. D3 helps
					you bring D3.js is a JavaScript library for manipulating documents based on data. D3 helps
					you bring D3.js is a JavaScript library for manipulating documents based on data.
				</div>
			</DataStorySection>

			<DataStorySection name="step1" class="mb-[60vh]">
				<h2>Section 1</h2>
				The call was a hoarse, urgent whisper, and the youngster bounded to the open window. Slim wasn't
				his real name, but the new friend he had met the day before had needed only one look at his slight
				figure to say, "You're Slim." He added, "I'm Red." Red wasn't his real name, either, but its
				appropriateness was obvious. They were friends instantly with the quick unquestioning friendship
				of young ones not yet quite in adolescence, before even the first stains of adulthood began to
				make their appearance.
			</DataStorySection>

			<DataStorySection name="step2" class="mb-[60vh]">
				<div>
					<h2>Section 2</h2>
					Slim cried, "Hi, Red!" and waved cheerfully, still blinking the sleep out of himself. Red kept
					to his croaking whisper, "Quiet! You want to wake somebody?" Slim noticed all at once that
					the sun scarcely topped the low hills in the east, that the shadows were long and soft, and
					that the grass was wet. Slim said, more softly, "What's the matter?"
				</div>
			</DataStorySection>
			<DataStorySection name="step3" class="mb-[60vh]">
				<div>
					<h2>Section 3</h2>
					Red only waved for him to come out. Slim dressed quickly, gladly confining his morning wash
					to the momentary sprinkle of a little lukewarm water. He let the air dry the exposed portions
					of his body as he ran out, while bare skin grew wet against the dewy grass. Red said, "You've
					got to be quiet. If Mom wakes up or Dad or your Dad or even any of the hands then it'll be
					'Come on in or you'll catch your death of cold.'"
				</div>
			</DataStorySection>
			<DataStorySection name="step4" class="mb-[60vh]">
				<div>
					<h2>Section 4</h2>
					powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
					showcaseization components and a data-driven approach to DOM manipulation. powerful showcaseization
					components and a data-driven approach to DOM manipulation. powerful showcaseization components
					and a data-driven approach to DOM manipulation.
				</div>
			</DataStorySection>

			<div>
				<h2>The End</h2>
			</div>
		</DataStoryWrapper>
	</div>
</div>

<style>
	h2 {
		margin-bottom: 10px;
	}
</style>
