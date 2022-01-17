// 라이브러리 간의 의존성을 분리할 수 있다.
interface Author {
    first: string;
    last: string;
}

interface DB {
    runQuery: (sql: string) => any[];
}

function getAuthors(database: DB): Author[] {
    const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
    return authorRows.map(row => ({first: row[0], last: row[1]}));
}

test('getAuthors', () => {
    const authors = getAuthors({
        runQuery(sql: string) {
            return [['Toni', 'Morrison'], ['Maya', 'Angelou']];
        }
    });
    expect(authors).toEqual([
        {first: 'Toni', last: 'Morrison'},
        {first: 'Maya', last: 'Angelou'}
    ]);
});