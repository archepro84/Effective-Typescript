// NamedVector의 구조가 Vector2D와 호환되기 때문에 calculateLength 호출이 가능하다.
//  즉, 이것이 구조적 타이핑(structural typing)이다.
interface Vector2D {
    x: number;
    y: number;
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

const v: NamedVector = {x: 3, y: 4, name: 'Zee'};
calculateLength(v);

