export function Button(tekst, klasa, atributi = {}) {
    const htmlAtributi = Object.entries(atributi)
        .map(([ime, vrijednost]) => `${ime}="${vrijednost}"`)
        .join(" ");

    return `
        <button class="gumb ${klasa}" ${htmlAtributi}>
            ${tekst}
        </button>
    `;
}
