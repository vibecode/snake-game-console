'use strict'
const React = require('react')
const { useState, useContext, useEffect } = require('react')
const { Text, Color, Box, StdinContext } = require('ink')
const importJsx = require('import-jsx')
const useInterval = require('./useInterval')
const EndScreen = importJsx('./EndScreen')

const { FIELD_SIZE, FIELD_ROW, ARROW, DIRECTION } = require('./constants')

const limitByField = x => {
	if (x >= FIELD_SIZE) {
		return 0
	}
	if (x < 0) {
		return FIELD_SIZE - 1
	}
	return x
}

const getFoodItem = () => ({
	x: Math.floor(Math.random() * FIELD_SIZE),
	y: Math.floor(Math.random() * FIELD_SIZE)
})

let foodItem = getFoodItem()

const collidesWithFood = (head, foodItem) => {
	return foodItem.x === head.x && foodItem.y === head.y
}

const newSnakePosition = (segments, direction) => {
	const [head] = segments
	const newHead = {
		x: limitByField(head.x + direction.x),
		y: limitByField(head.y + direction.y)
	}
	if (collidesWithFood(newHead, foodItem)) {
		foodItem = getFoodItem()

		return [newHead, ...segments]
	} else {
		return [newHead, ...segments.slice(0, -1)]
	}
}

const getItem = (x, y, snakeSegments) => {
	if (foodItem.x === x && foodItem.y === y) {
		return <Color red></Color>
	}

	for (let i = 0; i < snakeSegments.length; i++) {
		if (snakeSegments[i].x === x && snakeSegments[i].y === y) {
			if (i === 0) {
				return <Color yellow>■</Color>
			}
			return <Color green>■</Color>
		}
	}
}

const App = () => {
	const [direction, setDirection] = useState(DIRECTION.LEFT)
	const { stdin, setRawMode } = useContext(StdinContext)

	const [snakeSegments, setSnakeSegments] = useState([
		{ x: 8, y: 8 },
		{ x: 8, y: 7 },
		{ x: 8, y: 6 }
	])

	useEffect(() => {
		setRawMode(true)
		stdin.on('data', data => {
			const value = data.toString()
			if (value == ARROW.UP) {
				setDirection(DIRECTION.TOP)
			}
			if (value == ARROW.DOWN) {
				setDirection(DIRECTION.BOTTOM)
			}
			if (value == ARROW.LEFT) {
				setDirection(DIRECTION.LEFT)
			}
			if (value == ARROW.RIGHT) {
				setDirection(DIRECTION.RIGHT)
			}
		})
	}, [])

	const [head, ...tail] = snakeSegments
	const intersectsWithItself = tail.some(
		segment => segment.x === head.x && segment.y === head.y
	)

	useInterval(
		() => {
			setSnakeSegments(segments => newSnakePosition(segments, direction))
		},
		intersectsWithItself ? null : 200
	)

	return (
		<Box flexDirection="column" alignItems="center">
			<Text>
				<Color green>Snake</Color> game
			</Text>
			{intersectsWithItself ? (
				<EndScreen size={FIELD_SIZE} />
			) : (
				<Box flexDirection="column">
					{FIELD_ROW.map(y => (
						<Box key={y}>
							{FIELD_ROW.map(x => (
								<Box key={x}> {getItem(x, y, snakeSegments) || '.'} </Box>
							))}
						</Box>
					))}
				</Box>
			)}
		</Box>
	)
}

module.exports = App
