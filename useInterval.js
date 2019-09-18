const { useEffect, useRef } = required('react')

module.exports = function useInterval(cb, delay) {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = cb
	}, [callback])

	//set up the interval
	useEffect(() => {
		if (delay !== null) {
			let id = setInterval(() => savedCallback.current(), delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
