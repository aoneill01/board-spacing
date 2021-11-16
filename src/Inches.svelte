<script>
	export let decimalValue;

	$: inches = calculateInches(decimalValue);

	function calculateInches(decimalValue) {
		const fractions = {
			'1/2': '½',
			'1/4': '¼',
			'3/4': '¾',
			'1/8': '⅛',
			'3/8': '⅜',
			'5/8': '⅝',
			'7/8': '⅞',
			'1/16': '¹⁄₁₆',
			'3/16': '³⁄₁₆',
			'5/16': '⁵⁄₁₆',
			'7/16': '⁷⁄₁₆',
			'9/16': '⁹⁄₁₆',
			'11/16': '¹¹⁄₁₆',
			'13/16': '¹³⁄₁₆',
			'15/16': '¹⁵⁄₁₆',
			'1/32': '¹⁄₃₂',
			'3/32': '³⁄₃₂',
			'5/32': '⁵⁄₃₂',
			'7/32': '⁷⁄₃₂',
			'9/32': '⁹⁄₃₂',
			'11/32': '¹¹⁄₃₂',
			'13/32': '¹³⁄₃₂',
			'15/32': '¹⁵⁄₃₂',
			'17/32': '¹⁷⁄₃₂',
			'19/32': '¹⁹⁄₃₂',
			'21/32': '²¹⁄₃₂',
			'23/32': '²³⁄₃₂',
			'25/32': '²⁵⁄₃₂',
			'27/32': '²⁷⁄₃₂',
			'29/32': '²⁹⁄₃₂',
			'31/32': '³¹⁄₃₂'
		};
	
		if (decimalValue === null || decimalValue === undefined) return "";

		let whole = Math.floor(decimalValue);
		
		const fraction = decimalValue - whole;
		let thirtySeconds = Math.round(fraction * 32);
		if (thirtySeconds === 32) {
			whole++;
			thirtySeconds = 0;
		}
		let numerator = thirtySeconds;
		let denominator = 32;
		while (numerator !== 0 && numerator / 2 === Math.floor(numerator / 2)) {
			numerator /= 2;
			denominator /= 2;
		}

		return [(whole || !numerator) ? `${whole}` : null, numerator ? fractions[`${numerator}/${denominator}`] : null]
			.filter(Boolean).join(' ') + '″'
	}
</script>

{inches}