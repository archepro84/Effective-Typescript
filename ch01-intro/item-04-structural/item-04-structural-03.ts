interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function calculateLengthL1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        const coord = v[axis];
        // 'string'은 'Vector3D'의 인덱스로 사용할 수 없기에 Element는 암시적으로 'any' 타입이다.
        length += Math.abs(coord);
    }
    return length;
}