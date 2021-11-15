<script>
	export let decimalValue;
	
	let whole;
	let numerator;
	let denominator;
	
	$: if (decimalValue !== null) {
		whole = Math.floor(decimalValue);
		
		const fraction = decimalValue - whole;
		let thirtySeconds = Math.round(fraction * 32);
		if (thirtySeconds === 32) {
			whole++;
			thirtySeconds = 0;
		}
		numerator = thirtySeconds;
		denominator = 32;
		while (numerator !== 0 && numerator / 2 === Math.floor(numerator / 2)) {
			numerator /= 2;
			denominator /= 2;
		}
	}
</script>

{#if decimalValue !== null}
	{#if whole === 0 && numerator === 0}
		0″
	{:else}
		{#if whole}{whole}{/if}{whole && numerator ? " " : ""}{#if numerator}{numerator}⁄{denominator}{/if}″
	{/if}
{/if}
