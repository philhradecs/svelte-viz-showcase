<script lang="ts">
	import Chart from '$components/chart/Chart.svelte';

	import headerImage from '$assets/images/data-story-header.jpg';
	import { generateScatterplotData } from '../showcase/scatter-plot/+page.svelte';
	import DataStorySection from '$components/data-story/DataStorySection.svelte';
	import DataStoryWrapper from '$components/data-story/DataStoryWrapper.svelte';
	import ScatterPlot from '$visualizations/scatter-plot/ScatterPlot.svelte';

	const stepConfigs = [
		{ name: 'section-1', data: generateScatterplotData('poisson', 200), pointRadius: 2 },
		{
			name: 'section-2',
			data: generateScatterplotData('bates', 200),
			pointRadius: 5
		},
		{
			name: 'section-3',
			data: generateScatterplotData('normal', 200),
			pointRadius: 1
		},
		{
			name: 'section-4',
			hidden: true,
			data: generateScatterplotData('poisson', 200),
			pointRadius: 8
		},
		{
			name: 'section-5',
			data: generateScatterplotData('poisson', 100),
			pointRadius: 15
		},
		{
			name: 'section-6',
			data: generateScatterplotData('normal', 200),
			pointRadius: 8
		},
		{
			name: 'section-7',
			data: generateScatterplotData('poisson', 400),
			pointRadius: 1
		}
	];

	let activeConfig: (typeof stepConfigs)[number];
</script>

<div class="mt-8 mb-8">
	<div class="container mx-auto max-w-4xl px-5 leading-relaxed md:text-lg">
		<DataStoryWrapper {stepConfigs} bind:activeConfig>
			<div slot="chart">
				<div class={`h-[40vh] mt-[5vh] transition-all w-[100vw] lg:w-[80vw] xl:w-[60vw]`}>
					<Chart
						mt={20}
						mr={40}
						mb={30}
						ml={40}
						chart={ScatterPlot}
						data={activeConfig.data || []}
						extraConfig={{
							xDomain: [0, 100],
							yDomain: [0, 100],
							pointRadius: activeConfig.pointRadius
						}}
					/>
				</div>
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

			<DataStorySection name="section-1" class="mb-[60vh]">
				<h2>Section 1</h2>
				The call was a hoarse, urgent whisper, and the youngster bounded to the open window. Slim wasn't
				his real name, but the new friend he had met the day before had needed only one look at his slight
				figure to say, "You're Slim." He added, "I'm Red." Red wasn't his real name, either, but its
				appropriateness was obvious. They were friends instantly with the quick unquestioning friendship
				of young ones not yet quite in adolescence, before even the first stains of adulthood began to
				make their appearance.
			</DataStorySection>

			<DataStorySection name="section-2" class="mb-[60vh]">
				<div>
					<h2>Section 2</h2>
					Slim cried, "Hi, Red!" and waved cheerfully, still blinking the sleep out of himself. Red kept
					to his croaking whisper, "Quiet! You want to wake somebody?" Slim noticed all at once that
					the sun scarcely topped the low hills in the east, that the shadows were long and soft, and
					that the grass was wet. Slim said, more softly, "What's the matter?"
				</div>
			</DataStorySection>
			<DataStorySection name="section-3" class="mb-[60vh]">
				<div>
					<h2>Section 3</h2>
					Red only waved for him to come out. Slim dressed quickly, gladly confining his morning wash
					to the momentary sprinkle of a little lukewarm water. He let the air dry the exposed portions
					of his body as he ran out, while bare skin grew wet against the dewy grass. Red said, "You've
					got to be quiet. If Mom wakes up or Dad or your Dad or even any of the hands then it'll be
					'Come on in or you'll catch your death of cold.'"
				</div>
			</DataStorySection>
			<DataStorySection name="section-4" class="mb-[60vh]">
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
