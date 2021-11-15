<script>
	import Measurement from './Measurement.svelte';
	import { Mode, spacing, toDecimal } from './spacing';
	
	let wallLength = '';
	let idealSpacing = '9';
	let selected = Mode.BOTH_ENDS;
	
	$: results = spacing(wallLength, idealSpacing);
	
	$: measurements = results
		.find(({ mode }) => mode === selected)
		?.measurements?.map((measurement) => measurement);
</script>

<div class="App">
	<input bind:value={wallLength} placeholder="Wall Length (in.)">
	<input bind:value={idealSpacing} placeholder="Ideal Spacing (in.)">
	<div>
		<div>
			<em>Wall Length</em>: <Measurement decimalValue={toDecimal(wallLength)} />
		</div>
		<div>
			<em>Ideal Spacing</em>: <Measurement decimalValue={toDecimal(idealSpacing)} />
		</div>
	</div>
	<table>
		<thead>
			<tr>
				<th></th>
				<th>Boards</th>
				<th>Spacing</th>
			</tr>
		</thead>
		<tbody>
			{#each results as {label, boardCount, spacing, mode}}
			<tr>
				<td class={selected === mode ? "selected" : ""} on:click={() => selected = mode}>{label}</td>
				<td>{boardCount ?? ''}</td>
				<td><Measurement decimalValue={spacing} /></td>
			</tr>
			{/each}
		</tbody>
	</table>
	<ul>
		{#each measurements as measurement}
			<li><Measurement decimalValue={measurement} /></li>
		{/each}
	</ul>
</div>

<style>
	.App {
		font-family: sans-serif;
		font-size: 18px;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	* {
		box-sizing: border-box;
	}
	
	input {
		width: 100%;
		font-size: 18px;
	}
	
	em {
		font-weight: bold;
		font-style: normal;
	}
	
	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid #333;
		padding: 0.5em;
	}

	th {
		background-color: #333;
		color: white;
		font-weight: normal;
	}

	td:not(:first-child) {
		text-align: center;
	}

	td:first-child {
		background-color: #333;
		color: white;
		cursor: pointer;
	}

	td.selected {
		text-decoration: underline;
	}

	th:first-child {
		background-color: white;
		border: 1px solid white;
	}

	th:not(:last-child) {
		border-right: 1px solid white;
	}

	tr:not(:last-child) td:first-child {
		border-bottom: 1px solid white;
	}
</style>