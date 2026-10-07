import { KarticaProizvoda, kosaricaProizvod } from "./components/kartica.js";
import { Sekcija } from "./components/sekcija.js";
import { dohvatiProizvode } from "./services/api-service.js";

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
    ? proizvodi
        .map((proizvod) =>
          KarticaProizvoda(proizvod, kosarica.includes(proizvod)),
        )
        .join("")
    : "Nema proizvoda za prikaz.";
}

//Dodavanje u kosaricu
let kosarica = [];
const kosaricaWrapper = document.getElementById("kosarica");

ponuda.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation;

  if (!e.target.closest(".gumb")) return;

  const gumb = e.target.closest(".gumb");
  let proizvod = proizvodi.find(
    (item) => item.id === Number(gumb.dataset.idProizvoda),
  );

  if (!gumb) alert("Nešto je pošlo po zlu");

  if (gumb.dataset.id === "dodaj") {
    if (!proizvod.kosarica) addProperty(proizvod);

    if (!kosarica.includes(proizvod)) {
      kosaricaPrice +=
        Math.round(proizvod.kolicina * proizvod.price * 100) / 100;
      kosarica.push(proizvod);
      refreshKosarica(kosarica);
      kosarica.forEach(
        (element) =>
          (kosaricaPrice +=
            Math.round(element.price * element.kolicina * 100) / 100),
      );
      kosaricaWrapper.innerHTML += `
      <p>Ukupna cijena: <b = "cijena">${kosaricaPrice} USD</b></p>
      `;
      ponuda.innerHTML = "";
      prikaziProizvode();
    } else if (kosarica.includes(proizvod)) {
      ponuda.innerHTML = "";
      deleteKosarica(gumb.dataset.idProizvoda);
    }
  } else {
    return;
  }
});

function addProperty(proizvod) {
  proizvod["kolicina"] = 1;
}
let kosaricaPrice = 0;
kosaricaWrapper.innerHTML += `
    <p>Ukupna cijena: <b = "cijena">${kosaricaPrice} USD</b></p>
  `;
kosaricaWrapper.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.closest(".gumb")) return;

  const button = e.target.closest(".gumb");
  let idGumb = Number(button.dataset.idProizvoda);
  let proizvod = proizvodi.find((item) => item.id === idGumb);

  if (!button) alert("Nema gumba");

  if (button.dataset.id === "smanji" && idGumb === proizvod.id) {
    if (proizvod.kolicina == 1) {
      deleteKosarica(button.dataset.idProizvoda);
    } else proizvod.kolicina = proizvod.kolicina - 1;
  } else if (button.dataset.id === "povecaj" && idGumb === proizvod.id) {
    proizvod.kolicina = proizvod.kolicina + 1;
  }

  refreshKosarica(kosarica);
  kosarica.forEach(
    (element) =>
      (kosaricaPrice +=
        Math.round(element.price * element.kolicina * 100) / 100),
  );
  kosaricaWrapper.innerHTML += `
      <p>Ukupna cijena: <b = "cijena">${kosaricaPrice} USD</b></p>
      `;
});

function refreshKosarica(array) {
  kosaricaWrapper.innerHTML = "";
  array.forEach(
    (item) => (kosaricaWrapper.innerHTML += kosaricaProizvod(item)),
  );
}

function deleteKosarica(elementId) {
  kosarica = kosarica.filter((item) => item.id !== Number(elementId));
  refreshKosarica(kosarica);
  prikaziProizvode();
}
