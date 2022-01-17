// 구조적 타이핑으로 인해 타입 체커가 오류를 발생시키지 않음
interface Vector2D {
    x: number;
    y: number;
}

interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

function normalize(v: Vector3D) {
    const length = calculateLength(v);
    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length,
    }
}

normalize({x: 3, y: 4, z: 5})

