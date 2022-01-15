// TypeScript typing
function greet(who: string) {
    console.log('Hello', who);
}

// error: Property does not exist
const states = [
    {name: 'Alabama', capital: 'Montgomery'},
    {name: 'Alaska', capital: 'Juneau'},
    {name: 'Arizona', capital: 'Phoenix'},
];
for (const state of states) {
    console.log(state.capitol);
}

// error: 'capital' is declared here.
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
