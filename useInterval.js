const { useEffect, useRef } = require('react')

module.exports = function useInterval(cb, delay) {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = cb
	}, [cb])

	//set up the interval
	useEffect(() => {
		if (delay !== null) {
			let id = setInterval(() => savedCallback.current(), delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
