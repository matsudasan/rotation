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
    let clickedPosition
    let clickedPartName
    let clickItem
    let originalIitemRect
    let nowDegree

    const clickResizePart = (e) => {
        nowDegree = e.target.style.transform ? parseFloat(e.target.style.transform.match(/-?[0-9]+\.?[0-9]*/g)[0]) : 0
        originalIitemRect = getItemRect(e.target)
        clickItem = e.target
        setPartsStyle(originalIitemRect, nowDegree)
    }
    items.forEach(item => item.addEventListener('click', clickResizePart))

    const resize = (e) => {
        if (clickedPartName === "resize-upperLeft") {
            const width = originalIitemRect.width - (e.pageX - clickedPosition.x)
            const height = originalIitemRect.height - (e.pageY - clickedPosition.y)
            const left = originalIitemRect.left + (e.pageX - clickedPosition.x)
            const top = originalIitemRect.top + (e.pageY - clickedPosition.y)

            clickItem.style.width = width + 'px'
            clickItem.style.left = left + 'px'
            clickItem.style.height = height + 'px'
            clickItem.style.top = top + 'px'

            setPartsStyle({ width, left, height, top }, nowDegree)
        }
    }

    const stopResize = () => document.removeEventListener('mousemove', resize)

    parts.forEach(part => {
        part.addEventListener('mousedown', (e) => {
            clickedPartName = e.target.id
            clickedPosition = {
                x: e.pageX,
                y: e.pageY
            }
            document.addEventListener('mousemove', resize)
            document.addEventListener('mouseup', stopResize)
        })
        part.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', resize)
        })
    })

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