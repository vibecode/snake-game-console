const constants = {
	ARROW: {
		UP: '\u001B[A',
		DOWN: '\u001B[B',
		LEFT: '\u001B[D',
		RIGHT: '\u001B[C'
	},
	DIRECTION: {
		RIGHT: { x: 1, y: 0 },
		LEFT: { x: -1, y: 0 },
		TOP: { x: 0, y: -1 },
		BOTTOM: { x: 0, y: 1 }
	},
	FIELD_SIZE: 16
}

constants.FIELD_ROW = [...new Array(constants.FIELD_SIZE).keys()]

module.exports = constants
