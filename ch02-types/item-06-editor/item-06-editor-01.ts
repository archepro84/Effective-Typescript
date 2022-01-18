// num의 추론된 타입이 number임을 보여준다.
let num = 10;

// 반환값을 지정하지 않아도 IDE에서 추론된 타입을 보여준다.
function add(a: number, b: number) {
    return a + b;
}

// 조건문 외부에서 message의 타입은 string | null이지만 내부에서는 string이다.
function logMessage(message: string | null) {
    if (message) {
        message
    }
}

// Typescript가 객체 내의 타입을 추론한다.
const foo = {
    x: [1, 2, 3],
    bar: {
        name: 'Fred'
    }
}

// 연속된 Method 호출에서 추론된 제네릭 타입을 조사한다.
function restOfPath(path: string) {
    return path.split('/').slice(1).join('/');
}