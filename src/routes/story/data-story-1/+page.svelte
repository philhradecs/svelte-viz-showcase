<script lang="ts">
	import { format } from 'd3-format';
	import ChartAligner from '$components/data-story/ChartAligner.svelte';
	import Chart from '$components/chart/ChartRoot.svelte';

	import headerImage from '$assets/images/data-story-header.jpg';
	import DataStorySection from '$components/data-story/DataStorySection.svelte';
	import DataStoryWrapper from '$components/data-story/DataStoryWrapper.svelte';
	import ScatterPlotSvelte from './ScatterPlot.svelte';
	import DotPlotChart from './DotPlotChart.svelte';
	import type { ChartStepConfig, PulitzerScatterPoint } from './+page.server';
	import NavMenuSidebar from '$components/NavMenuSidebar.svelte';

	export let data;

	let activeStep: string | undefined;
	let activeConfig: ChartStepConfig | undefined;

	const step = (id: (typeof data.stepsConfig)[number]['id']) => id;

	const getScatterTooltipContent = (point: PulitzerScatterPoint) =>
		`<strong>${point.z}</strong><br>Daily Circulation (${
			point.meta.circulationYear
		}): <strong>${format('d')(point.x)}
	</strong><br>Pulitzer Finalists (${point.meta.pulitzerPeriod}): <strong>${format('d')(
			point.y
		)}</strong>`;

	$: {
		if (activeStep && activeStep !== activeConfig?.id) {
			activeConfig = data.stepsConfig.find((d) => d.id === activeStep);
		}
	}

	let pointRadiusInput: number = 8;
</script>

<div class="mt-8 mb-8">
	<div class="container mx-auto max-w-4xl px-5 leading-relaxed md:text-lg">
		<NavMenuSidebar
			activeId={activeConfig?.id}
			collapsed={!activeConfig?.fullSize}
			steps={data.stepsConfig}
		/>
		<DataStoryWrapper bind:activeStep>
			<div slot="chart">
				{#if activeConfig?.chartType === 'scatter'}
					{@const { vizOptions, data, interactivePointRadius, chartTitle } = activeConfig}
					<ChartAligner>
						<figure class="h-full relative">
							{#if chartTitle}
								<figcaption
									class="absolute bottom-[100%] w-full text-center text-gray-300 font-mono"
								>
									{@html chartTitle}
								</figcaption>
							{/if}
							<Chart
								{data}
								chart={ScatterPlotSvelte}
								vizOptions={interactivePointRadius
									? {
											...vizOptions,
											pointRadius: pointRadiusInput,
											getTooltipContent: getScatterTooltipContent
									  }
									: vizOptions}
								mt={20}
								mr={40}
								mb={50}
								ml={40}
							/>
						</figure>
					</ChartAligner>
				{/if}
				{#if activeConfig?.chartType === 'dotPlot'}
					{@const { fullSize, data, vizOptions } = activeConfig}
					<ChartAligner {fullSize}>
						<Chart mt={100} mr={40} mb={60} ml={40} chart={DotPlotChart} {data} {vizOptions} />
					</ChartAligner>
				{/if}
			</div>

			<DataStorySection id="intro" class="mb-[20vh]">
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

			<DataStorySection id={step('scatter1')} class="mb-[80vh]">
				<h2>Section 1</h2>
				The call was a hoarse, urgent whisper, and the youngster bounded to the open window. Slim wasn't
				his real name, but the new friend he had met the day before had needed only one look at his slight
				figure to say, "You're Slim." He added, "I'm Red." Red wasn't his real name, either, but its
				appropriateness was obvious. They were friends instantly with the quick unquestioning friendship
				of young ones not yet quite in adolescence, before even the first stains of adulthood began to
				make their appearance.
			</DataStorySection>

			<DataStorySection id={step('scatter2')} class="mb-[80vh]">
				<div>
					<h2>Section 2</h2>
					Slim cried, "Hi, Red!" and waved cheerfully, still blinking the sleep out of himself. Red kept
					to his croaking whisper, "Quiet! You want to wake somebody?" Slim noticed all at once that
					the sun scarcely topped the low hills in the east, that the shadows were long and soft, and
					that the grass was wet. Slim said, more softly, "What's the matter?"
				</div>
			</DataStorySection>
			<DataStorySection id={step('scatterZoom2')} class="mb-[80vh]">
				<div>
					<h2>Section 5</h2>
					powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
					showcaseization components and a data-driven approach to DOM manipulation. powerful showcaseization
					components and a data-driven approach to DOM manipulation. powerful showcaseization components
					and a data-driven approach to DOM manipulation.
				</div>
			</DataStorySection>
			<DataStorySection id={step('scatterZoom1')} class="mb-[80vh]">
				<div>
					<h2>Section 5</h2>
					powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
					showcaseization components and a data-driven approach to DOM manipulation. powerful showcaseization
					components and a data-driven approach to DOM manipulation. powerful showcaseization components
					and a data-driven approach to DOM manipulation.
				</div>
			</DataStorySection>
			<DataStorySection id={step('dotPlotAge1')} class="mb-[120vh]">
				<div>
					<h2>Section 3</h2>
					Red only waved for him to come out. Slim dressed quickly, gladly confining his morning wash
					to the momentary sprinkle of a little lukewarm water. He let the air dry the exposed portions
					of his body as he ran out, while bare skin grew wet against the dewy grass. Red said, "You've
					got to be quiet. If Mom wakes up or Dad or your Dad or even any of the hands then it'll be
					'Come on in or you'll catch your death of cold.'"
				</div>
			</DataStorySection>
			<DataStorySection id={step('dotPlotAge4')} class="mb-[120vh]">
				<div>
					<h2>Section 4</h2>
					powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
					showcaseization components and a data-driven approach to DOM manipulation. powerful showcaseization
					components and a data-driven approach to DOM manipulation. powerful showcaseization components
					and a data-driven approach to DOM manipulation.
				</div>
			</DataStorySection>
			<DataStorySection id={step('dotPlotAge6')} class="mb-[120vh]">
				<div>
					<h2>Section 4</h2>
					powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
					showcaseization components and a data-driven approach to DOM manipulation. powerful showcaseization
					components and a data-driven approach to DOM manipulation. powerful showcaseization components
					and a data-driven approach to DOM manipulation.
				</div>
			</DataStorySection>
			<DataStorySection id={step('scatter3')} class="mb-[80vh]">
				<div>
					<h2>Section 5</h2>
					powerful showcaseization components and a data-driven approach to DOM manipulation. powerful
					showcaseization components and a data-driven approach to DOM manipulation. powerful showcaseization
					components and a data-driven approach to DOM manipulation. powerful showcaseization components
					and a data-driven approach to DOM manipulation.
					<label>
						<input type="range" bind:value={pointRadiusInput} min={1} max={50} />
						{pointRadiusInput}
					</label>
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
