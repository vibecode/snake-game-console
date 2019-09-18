'use strict'
const React = require('react')
const { useState } = require('react')
const PropTypes = require('prop-types')
const { Text, Color, Box } = require('ink')

const FIELD_SIZE = 16
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()]

let foodItem = {
	x: Math.floor(Math.random() * FIELD_SIZE),
	y: Math.floor(Math.random() * FIELD_SIZE)
}

const App = () => {
	const [snakeSegments, setSnakeSegments] = useState([
		{
			x: 8,
			y: 8
		},
		{
			x: 8,
			y: 7
		},
		{
			x: 8,
			y: 6
		}
	])

	const getItem = (x, y, snakeSegments) => {
		if (foodItem.x === x && foodItem.y === y) {
			return <Color red>  </Color>
		}

		for (const segment of snakeSegments) {
			if (segment.x === x && segment.y === y) {
				return <Color green> ■ </Color>
			}
		}
	}

	return (
		<Box flexDirection="column" alignItems="center">
			<Text>
				<Color green>Snake</Color> game
			</Text>
			<Box flexDirection="column">
				{FIELD_ROW.map(y => (
					<Box key={y}>
						{FIELD_ROW.map(x => (
							<Box key={x}> {getItem(x, y, snakeSegments) || ' . '} </Box>
						))}
					</Box>
				))}
			</Box>
		</Box>
	)
}

module.exports = App
