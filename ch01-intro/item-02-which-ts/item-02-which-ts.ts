// error: implicitly has an 'any' type.
function addError(a, b) {
    return a + b;
}

function add(a: number, b: number) {
    return a + b;
}

// Optional(number)
const x: number | null = null;

// error: Type '"Ready"' is not assignable to type 'null'.
const el = {'textContent': null};
el.textContent = 'Ready';

if (el) {
    el.textContent = 'Ready';
}
el!.textContent = 'Ready';
