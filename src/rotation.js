(() => {
    const items = document.querySelectorAll('.item')
    const upperLeft = document.getElementById('rotation-upperLeft') //左上
    const upperRight = document.getElementById('rotation-upperRight') //右上
    const lowerLeft = document.getElementById('rotation-lowerLeft') //左下
    const lowerRight = document.getElementById('rotation-lowerRight') //右下
    const parts = [upperLeft, upperRight, lowerLeft, lowerRight]
    let firstDegree //クリック時の角度
    let itemCenter = {}　//アイテムの中心座標
    let nowDegree = 0　//現在の角度
    let degree　//現在動かしている角度
    let firstPosition  //itemの最初の座標
    let clickedItem
    const rotationSize = {
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

    parts.forEach(part => {
        part.addEventListener('mousedown', (e) => {
            firstDegree = Math.atan2(e.pageX - itemCenter.x, - (e.pageY - itemCenter.y)) * (180 / Math.PI); //クリック時の角度を取得
            document.addEventListener('mousemove', mouseMove)
            document.addEventListener('mouseup', mouseUp)
        })
        part.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', mouseMove)
        })
    })

    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove)
        nowDegree += (degree - firstDegree)　//現在の角度を更新
        //今の方法だとクリック時に角度がいくらか付いているので、firstDegree分引かなければならない
        document.removeEventListener('mouseup', mouseUp)
    }

    const mouseMove = (e) => {
        degree = Math.atan2(e.pageX - itemCenter.x, - (e.pageY - itemCenter.y)) * (180 / Math.PI);
        let rotaion = nowDegree + (degree - firstDegree)
        if (rotaion < 0) rotaion += 360;
        clickedItem.style.transform = `rotate(${rotaion % 360}deg)`
        setPartsStyle(getItemRect(clickedItem), rotaion % 360)

    }

    const setPartsStyle = (rect, rotaion) => {
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        }
        const margin = 7
        const upperLeftPosition = linearTransformation({ x: rect.left - rotationSize.width / 2 - margin, y: rect.top - rotationSize.height / 2 - margin }, rotaion, center)
        /*
        xの-50は回転エリアの横幅/2
        yは縦
         */
        upperLeft.style.top = `${upperLeftPosition.y - rotationSize.height / 2}px`　//線形変形は中心座標で計算したため、縦幅/2を引く
        upperLeft.style.left = `${upperLeftPosition.x - rotationSize.width / 2}px` //上に同じく 横幅/2
        upperLeft.style.transform = `rotate(${rotaion}deg)`

        const upperRightPosition = linearTransformation({ x: rect.right + rotationSize.width / 2 + margin, y: rect.top - rotationSize.height / 2 - margin }, rotaion, center)
        upperRight.style.top = `${upperRightPosition.y - rotationSize.height / 2}px`
        upperRight.style.left = `${upperRightPosition.x - rotationSize.width / 2}px`
        upperRight.style.transform = `rotate(${rotaion}deg)`

        const lowerLeftPosition = linearTransformation({ x: rect.left - rotationSize.width / 2 - margin, y: rect.bottom + rotationSize.height / 2 + margin }, rotaion, center)
        lowerLeft.style.top = `${lowerLeftPosition.y - rotationSize.height / 2}px`
        lowerLeft.style.left = `${lowerLeftPosition.x - rotationSize.width / 2}px`
        lowerLeft.style.transform = `rotate(${rotaion}deg)`

        const lowerRightPosition = linearTransformation({ x: rect.right + rotationSize.width / 2 + margin, y: rect.bottom + rotationSize.height / 2 + margin }, rotaion, center)
        lowerRight.style.top = `${lowerRightPosition.y - rotationSize.height / 2}px`
        lowerRight.style.left = `${lowerRightPosition.x - rotationSize.width / 2}px`
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