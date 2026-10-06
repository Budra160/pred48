import { KarticaProizvoda } from "./components/kartica";
import { Sekcija } from "./components/sekcija";
import { dohvatiProizvode } from "./services/api-service";

const main = document.querySelector("#glavni-sadrzaj");
main.innerHTML = `
    <h1>Trgovina</h1>
    ${Sekcija("Ponuda", `<div id='ponuda' class='kartice'></div>`)}
    ${Sekcija("Košarica", `<div id='kosarica' class='kartice'></div>`)}
`;

const ponuda = document.querySelector("#ponuda");
let proizvodi = [];

async function ucitajProizvode() {
  ponuda.textContent = "Ucitavanje proizvoda...";

  try {
    proizvodi = await dohvatiProizvode();
    prikaziProizvode();
  } catch {
    ponuda.textContent = "Greska prilikom ucitavanja proizvoda.";
  }
}

ucitajProizvode();

function prikaziProizvode() {
  ponuda.innerHTML = proizvodi.length
    ? proizvodi.map((proizvod) => KarticaProizvoda(proizvod, true)).join("")
    : "Nema proizvoda za prikaz.";
}
