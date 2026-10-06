export function Sekcija(naslov, sadrzaj) {
    return `
        <section class="section">
            <h2>${naslov}</h2>
            ${sadrzaj}
        </section>
    `;
}
