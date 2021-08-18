(() => {
    const item = document.getElementById('item')
    const clickItemPosition = { x: 0, y: 0 }
    const mouseDown = (e) => {
        clickItemPosition.x = e.pageX - e.target.offsetLeft;
        clickItemPosition.y = e.pageY - e.target.offsetTop;
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener('mouseup', mouseUp)
    }

    const mouseMove = (e) => {
        item.style.top = e.pageY - clickItemPosition.y + "px";
        item.style.left = e.pageX - clickItemPosition.x + "px";
    }

    const mouseUp=(e)=>{
        document.removeEventListener('mousemove', mouseMove)
    }

    item.addEventListener('mousedown', mouseDown)
})()