// 런타임에는 타입 체크가 불가능합니다.
interface Square {
    width: number;
}

interface Rectangle extends Square {
    height: number;
}

type Shape = Square | Rectangle;


function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
        // Rectangle은 형식만 참조하지만, 여기서는 값으로 사용되고 있다.
        return shape.width * shape.height;
        // Shape Interface에, 'height' 속성이 없습니다.
    } else {
        return shape.width * shape.width;
    }
}