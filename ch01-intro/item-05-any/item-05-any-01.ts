let age: number;
// age = '12'
// error: 'string' 형식은 'number' 형식에 할당할 수 없습니다.
age = '12' as any;
console.log(age);