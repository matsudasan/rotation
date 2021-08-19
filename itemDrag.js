(() => {
    const items = document.querySelectorAll('.item')
    const clickItemPosition = { x: 0, y: 0 }
    const mouseDown = (e) => {
        clickItemPosition.x = e.pageX - e.target.offsetLeft;
        clickItemPosition.y = e.pageY - e.target.offsetTop;
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener('mouseup', mouseUp)
    }

    const mouseMove = (e) => {
        e.target.style.top = e.pageY - clickItemPosition.y + "px";
        e.target.style.left = e.pageX - clickItemPosition.x + "px";
    }

    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove)
    }

    items.forEach(item => item.addEventListener('mousedown', mouseDown))
})()