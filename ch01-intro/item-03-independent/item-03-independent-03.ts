// 타입을 Interface -> class로 변경
class Square {
    constructor(public width: number) {
    }
}

class Rectangle extends Square {
    constructor(public width: number, public height: number) {
        super(width);
    }
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
        shape;  // 타입이 Rectangle
        return shape.width * shape.height;
    } else {
        shape;  // 타입이 Square
        return shape.width * shape.width;  // 정상
    }
}