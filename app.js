const item = document.getElementById('item')
const parts1 = document.getElementById('my-parts1') //左上
const parts2 = document.getElementById('my-parts2') //右上
const parts3 = document.getElementById('my-parts3') //左下
const parts4 = document.getElementById('my-parts4') //右下
const partsArray = [parts1, parts2, parts3, parts4]
let firstDegree //クリック時の角度
let itemCenter = {}　//アイテムの中心座標
let nowDegree = 0　//現在の角度
let degree　//現在動かしている角度
const firstPosition = item.getBoundingClientRect() //itemの最初の座標
item.onclick = (e) => {
    const size = e.target.getBoundingClientRect()
    itemCenter = {
        x: size.left + size.width / 2,
        y: size.top + size.height / 2
    }
    setPartsStyle(getItemRect(item), nowDegree)
}

partsArray.forEach(parts => {
    parts.addEventListener('mousedown', (e) => {
        firstDegree = Math.atan2(e.pageX - itemCenter.x, - (e.pageY - itemCenter.y)) * (180 / Math.PI); //クリック時の角度を取得
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    })
    parts.addEventListener('mouseup', () => {
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
    item.style.transform = `rotate(${rotaion % 360}deg)`

    setPartsStyle(getItemRect(item), rotaion % 360)

}

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

const linearTransformation = (target, degree, basicPoint) => {
    const radian = degree * (Math.PI / 180)
    const firstTransformation = {
        x: (target.x - basicPoint.x) * Math.cos(radian) + (target.y - basicPoint.y) * -Math.sin(radian),
        y: (target.x - basicPoint.x) * Math.sin(radian) + (target.y - basicPoint.y) * Math.cos(radian),
    }
    return {
        x: firstTransformation.x + basicPoint.x,
        y: firstTransformation.y + basicPoint.y
    }
}


const setPartsStyle = (rect, rotaion) => {
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    }
    const part1Position = linearTransformation({ x: rect.left - 50, y: rect.top - 50 }, rotaion, center) 
    /*
    xの-50は回転エリアの横幅/2
    yは縦
     */
    parts1.style.top = `${part1Position.y - 50}px`　//線形変形は中心座標で計算したため、縦幅/2を引く
    parts1.style.left = `${part1Position.x - 50}px` //上に同じく
    parts1.style.transform = `rotate(${rotaion}deg)`

    const part2Position = linearTransformation({ x: rect.right + 50, y: rect.top - 50 }, rotaion, center)
    parts2.style.top = `${part2Position.y - 50}px`
    parts2.style.left = `${part2Position.x - 50}px`
    parts2.style.transform = `rotate(${rotaion}deg)`

    const part3Position = linearTransformation({ x: rect.left - 50, y: rect.bottom + 50 }, rotaion, center)
    parts3.style.top = `${part3Position.y-50}px`
    parts3.style.left = `${part3Position.x-50}px`
    parts3.style.transform = `rotate(${rotaion}deg)`

    const part4Position = linearTransformation({ x: rect.right + 50, y: rect.bottom + 50 }, rotaion, center)
    parts4.style.top = `${part4Position.y-50}px`
    parts4.style.left = `${part4Position.x-50}px`
    parts4.style.transform = `rotate(${rotaion}deg)`
}

document.onclick = (e) => {
    if (e.target.closest('#item')) {
        item.classList.add('border')
        partsArray.forEach(part=>part.classList.remove('none'))
    } else {
        item.classList.remove('border')
        partsArray.forEach(part=>part.classList.add('none'))
    }
}