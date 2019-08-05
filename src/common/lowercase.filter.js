export default value => {
	if (!value) return ''
	const text = value.toString()
	return text.toLowerCase()
}
