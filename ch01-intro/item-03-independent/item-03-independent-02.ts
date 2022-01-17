// 런타임에 접근 가능한 타입 정보를 명시적으로 저장하는 '태그'기법
interface Square {
    kind: 'square';
    width: number;
}

interface Rectangle {
    kind: 'rectangle';
    height: number;
    width: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape.kind === 'rectangle') {
        shape;  // 타입이 Rectangle
        return shape.width * shape.height;
    } else {
        shape;  // 타입이 Square
        return shape.width * shape.width;
    }
}