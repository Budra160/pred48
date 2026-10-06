import { KarticaProizvoda, kosaricaProizvod } from "./components/kartica.js";
import { Sekcija } from "./components/sekcija.js";
import { dohvatiProizvode} from "./services/api-service.js";

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
    ? proizvodi.map((proizvod) => KarticaProizvoda(proizvod, kosarica.includes(proizvod))).join("")
    : "Nema proizvoda za prikaz.";
}


//Dodavanje u kosaricu
let kosarica = [];
const kosaricaWrapper = document.getElementById("kosarica");

ponuda.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation;

  if(!e.target.closest(".gumb")) return;

  const gumb = e.target.closest(".gumb");
  let proizvod = proizvodi.find(item => item.id === Number(gumb.dataset.idProizvoda))

  if(!gumb) alert("Nešto je pošlo po zlu sa dodavanjem/makivanjem iz kosarice.")

  if(gumb.dataset.id === "dodaj")
  {
    if(!proizvod.kosarica)
    addProperty(proizvod);

    if(!kosarica.includes(proizvod))
    {kosarica.push(proizvod);
    kosarica.forEach(item => kosaricaWrapper.innerHTML += kosaricaProizvod(item));
    gumb.dataset.id = "ukloni";
    ponuda.innerHTML = "";
    prikaziProizvode();}
  }
  else{
    return
  }
})

function addProperty(proizvod){
  proizvod["kolicina"] = 1;
}

kosaricaWrapper.addEventListener("click", e =>{
  e.preventDefault();
  if(!e.target.closest(".gumb")) return;

  const button = e.target.closest(".gumb");
  let idGumb = Number(button.dataset.idProizvoda);
  let proizvod = proizvodi.find(item => item.id === idGumb);
  let item = e.target.closest(".item-wrapper")
  console.log(proizvod.kolicina, item);

  if(!button) alert("Nema gumba");

  if(idGumb === "smanji")
  {
    if(idGumb === proizvod.id)
    {
      if(proizvod.kolicina == 1)
      {
        kosarica = kosarica.filter(item => item.id !== idGumb);
        console.log(kosarica);
        refreshKosarica(kosarica);
      }
      else
        proizvod.kolicina = proizvod.kolicina - 1;

        console.log(proizvod);
    }
  }
})

function refreshKosarica(array){
  kosaricaWrapper.innerHTML = "";
  array.forEach(item => kosaricaWrapper.innerHTML += kosaricaProizvod(item));
}