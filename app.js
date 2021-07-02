const item=document.getElementById('item')
const parts1=document.getElementById('my-parts1') //左上
const parts2=document.getElementById('my-parts2') //右上
const parts3=document.getElementById('my-parts3') //左下
const parts4=document.getElementById('my-parts4') //右下
const partsArray=[parts1,parts2,parts3,parts4]
let firstDegree //クリック時の角度
let itemCenter={}　//アイテムの中心座標
let nowDegree=0　//現在の角度
let degree　//現在動かしている角度
item.onclick=(e)=>{
    const size=e.target.getBoundingClientRect()
    itemCenter={
        x:size.left+size.width/2,
        y:size.top+size.height/2
    }
    parts1.style.top=`${size.top-100}px`
    parts1.style.left=`${size.left-100}px`

    parts2.style.top=`${size.top-100}px`
    parts2.style.left=`${size.right}px`

    parts3.style.top=`${size.bottom}px`
    parts3.style.left=`${size.left-100}px`

    parts4.style.top=`${size.bottom}px`
    parts4.style.left=`${size.right}px`
}

partsArray.forEach(parts=>{
    parts.addEventListener('mousedown',(e)=>{
        firstDegree = Math.atan2(e.pageX - itemCenter.x, - (e.pageY - itemCenter.y) )*(180/Math.PI); 
        document.addEventListener('mousemove',mouseMove)
        document.addEventListener('mouseup',mouseUp)
    })
    parts.addEventListener('mouseup',()=>{
        document.removeEventListener('mousemove',mouseMove)
    })
})

const mouseUp=()=>{
    document.removeEventListener('mousemove',mouseMove)
    nowDegree+=(degree-firstDegree)
    document.removeEventListener('mouseup',mouseUp)
}

const mouseMove=(e)=>{
    const size=e.target.getBoundingClientRect()
    degree = Math.atan2(e.pageX - itemCenter.x, - (e.pageY - itemCenter.y) )*(180/Math.PI); 
    item.style.transform=`rotate(${nowDegree+(degree-firstDegree)}deg)`
    parts1.style.transform=`rotate(${nowDegree+(degree-firstDegree)}deg)`
    parts2.style.transform=`rotate(${nowDegree+(degree-firstDegree)}deg)`
    parts3.style.transform=`rotate(${nowDegree+(degree-firstDegree)}deg)`
    parts4.style.transform=`rotate(${nowDegree+(degree-firstDegree)}deg)`
    setPartsStyle(item.getBoundingClientRect())
}


const setPartsStyle=(size)=>{
    console.log(size)
    parts1.style.top=`${size.top-100}px`
    parts1.style.left=`${size.left-100}px`

    parts2.style.top=`${size.top-100}px`
    parts2.style.left=`${size.right}px`

    parts3.style.top=`${size.bottom}px`
    parts3.style.left=`${size.left-100}px`

    parts4.style.top=`${size.bottom}px`
    parts4.style.left=`${size.right}px`
}
document.onclick=(e)=>{
    if(e.target.closest('#item')) {
        item.classList.add('border')
        parts1.classList.remove('none')
        parts2.classList.remove('none')
        parts3.classList.remove('none')
        parts4.classList.remove('none')
    }else{
        item.classList.remove('border')
        parts1.classList.add('none')
        parts2.classList.add('none')
        parts3.classList.add('none')
        parts4.classList.add('none')
    }
}