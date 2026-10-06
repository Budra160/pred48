import { Sekcija } from "./components/sekcija"

const main = document.querySelector("#glavni-sadrzaj")

main.innerHTML = `
    <h1>Trgovina</h1>
    ${Sekcija("Ponuda", `<div id='ponuda' class='kartice'></div>`)}
    ${Sekcija("Košarica", `<div id='kosarica' class='kartice'></div>`)}
`