export const Mode = {
	BOTH_ENDS: 1,
	ONE_END: 2,
	NO_ENDS: 3
};
	
export function spacing(wallLength, idealSpacing) {
	return [
    {
      label: "Both Ends",
      mode: Mode.BOTH_ENDS,
      ...calculateSpacing(toDecimal(wallLength), toDecimal(idealSpacing), Mode.BOTH_ENDS)
    },
    {
      label: "One End",
      mode: Mode.ONE_END,
      ...calculateSpacing(toDecimal(wallLength), toDecimal(idealSpacing), Mode.ONE_END)
    },
    {
      label: "No Ends",
      mode: Mode.NO_ENDS,
      ...calculateSpacing(toDecimal(wallLength), toDecimal(idealSpacing), Mode.NO_ENDS)
    }
  ];
}
	
function calculateSpacing(decimal, idealSpacing, mode) {
	if (!decimal || !idealSpacing) return { boardCount: null, spacing: null, measurements: [] };

	const BOARD_WIDTH = 2.25;
	const BOARD_THICKNESS = 0.25;

	const distanceFromIdeal = (spacing) => Math.abs(idealSpacing - spacing);

	let best;

	for (let boardCount = mode === Mode.BOTH_ENDS ? 2 : 1; ; boardCount++) {
		let spacing;
		switch (mode) {
			case Mode.BOTH_ENDS:
				spacing = (decimal - boardCount * BOARD_WIDTH) / (boardCount - 1);
				break;
			case Mode.ONE_END:
				spacing =
					(decimal - boardCount * BOARD_WIDTH - BOARD_THICKNESS) / boardCount;
				break;
			case Mode.NO_ENDS:
				spacing =
					(decimal - boardCount * BOARD_WIDTH - 2 * BOARD_THICKNESS) /
					(boardCount + 1);
				break;
			default:
				return null;
		}

		if (spacing < 0) break;

		if (!best || distanceFromIdeal(spacing) < distanceFromIdeal(best.spacing)) {
			best = { boardCount, spacing };
		}
	}

	if (!best) return { boardCount: null, spacing: null, measurements: [] };

	const start = mode === Mode.NO_ENDS ? best.spacing : 0;
	best.measurements = [];
	for (let i = 0; i < best.boardCount; i++) {
		best.measurements.push(start + (best.spacing + BOARD_WIDTH) * i);
	}

	return best;
}

const toNumberHelper = (value) => (value ? parseInt(value, 10) : 0);

export function toDecimal(measurement) {
	const regex = /^\s*(?<whole>\d+)?\s?((?<numerator>\d+)\/(?<denominator>\d+))?\s*$/;
	const match = measurement.match(regex);
	if (!match) return null;

	const {
		groups: { whole, numerator, denominator }
	} = match;

	if (!whole && !numerator) return null;

	const wholeNumber = toNumberHelper(whole);
	const numeratorNumber = toNumberHelper(numerator);
	const denominatorNumber = toNumberHelper(denominator);
	const validDenominators = [0, 2, 4, 8, 16, 32];

	if (
		!validDenominators.includes(denominatorNumber) ||
		numeratorNumber > denominatorNumber
	)
		return null;

	const fraction = numerator ? numeratorNumber / denominatorNumber : 0;

	return wholeNumber + fraction;
}