export default (value) => {
    if (!value) return ''
    const text = value.toString()
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
