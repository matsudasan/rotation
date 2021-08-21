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