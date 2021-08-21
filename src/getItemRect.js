const getItemRect = (item) => {
    const itemStyle = window.getComputedStyle(item)
    const width = parseFloat(itemStyle.getPropertyValue("width"))
    const height = parseFloat(itemStyle.getPropertyValue("height"))

    const top = parseFloat(itemStyle.getPropertyValue('top').match(/[0-9]*/)[0])
    const left = parseFloat(itemStyle.getPropertyValue('left').match(/[0-9]*/)[0])
    const right = left + width
    const bottom = top + height

    return { left, right, top, bottom, width, height }
}