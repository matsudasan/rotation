(() => {
    const items = document.querySelectorAll('.item')
    const upperLeft = document.getElementById('resize-upperLeft') //左上
    const upperRight = document.getElementById('resize-upperRight') //右上
    const lowerLeft = document.getElementById('resize-lowerLeft') //左下
    const lowerRight = document.getElementById('resize-lowerRight') //右下
    const parts = [upperLeft, upperRight, lowerLeft, lowerRight]
    const resizeSize = {
        width: parseFloat(window.getComputedStyle(upperLeft).getPropertyValue("width")),
        height: parseFloat(window.getComputedStyle(upperLeft).getPropertyValue("height")),
    }

    const clickItem = (e) => {
        clickedItem = e.target
        nowDegree = e.target.style.transform ? parseFloat(e.target.style.transform.match(/-?[0-9]+\.?[0-9]*/g)[0]) : 0
        firstPosition = e.target.getBoundingClientRect()
        const size = e.target.getBoundingClientRect()
        itemCenter = {
            x: size.left + size.width / 2,
            y: size.top + size.height / 2
        }
        setPartsStyle(getItemRect(e.target), nowDegree)
    }
    items.forEach(item => item.addEventListener('click', clickItem))

    const setPartsStyle = (rect, rotaion) => {
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        }
        const upperLeftPosition = linearTransformation({ x: rect.left, y: rect.top }, rotaion, center)
        upperLeft.style.top = `${upperLeftPosition.y - resizeSize.height / 2}px`
        upperLeft.style.left = `${upperLeftPosition.x - resizeSize.width / 2}px`
        upperLeft.style.transform = `rotate(${rotaion}deg)`

        const upperRightPosition = linearTransformation({ x: rect.right, y: rect.top }, rotaion, center)
        upperRight.style.top = `${upperRightPosition.y - resizeSize.height / 2}px`
        upperRight.style.left = `${upperRightPosition.x - resizeSize.width / 2}px`
        upperRight.style.transform = `rotate(${rotaion}deg)`

        const lowerLeftPosition = linearTransformation({ x: rect.left, y: rect.bottom }, rotaion, center)
        lowerLeft.style.top = `${lowerLeftPosition.y - resizeSize.height / 2}px`
        lowerLeft.style.left = `${lowerLeftPosition.x - resizeSize.width / 2}px`
        lowerLeft.style.transform = `rotate(${rotaion}deg)`

        const lowerRightPosition = linearTransformation({ x: rect.right, y: rect.bottom }, rotaion, center)
        lowerRight.style.top = `${lowerRightPosition.y - resizeSize.height / 2}px`
        lowerRight.style.left = `${lowerRightPosition.x - resizeSize.width / 2}px`
        lowerRight.style.transform = `rotate(${rotaion}deg)`
    }

    const changeDisplay = (e) => {
        if (e.target.closest('.item')) {
            parts.forEach(part => part.classList.remove('none'))
        } else {
            parts.forEach(part => part.classList.add('none'))
        }
    }
    document.addEventListener('click', changeDisplay)
})()