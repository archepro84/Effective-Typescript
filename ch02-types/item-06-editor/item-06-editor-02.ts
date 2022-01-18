function getElement(elOrId: string | HTMLElement | null): HTMLElement {
    if (typeof elOrId === 'object') {
        return elOrId;
        // ~~~~~~~~~~~~~~ 'HTMLElement | null' 형식은 'HTMLElement' 형식에 할당할 수 없다.
    } else if (elOrId === null) {
        return document.body;
    } else {
        const el = document.getElementById(elOrId);
        return el;
        // ~~~~~~ 'HTMLElement | null' 형식은 'HTMLElement' 형식에 할당할 수 없다.
    }
}