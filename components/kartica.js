import { Button } from "./button";

export function KarticaProizvoda(proizvod, uKosarici) {
  return `
        <div class="kartica">
            <h3>${proizvod.title}</h3>
            <p>Kategorija: ${proizvod.category}</p>
            <p>${proizvod.price} USD po komadu</p>
            ${Button(uKosarici ? "Ukloni iz košarice" : "Dodaj u košaricu", "", { "data-id-proizvoda": proizvod.id, "data-id":"dodaj" })}
        </div>
    `;
}

export function kosaricaProizvod(proizvod){
    return `
        <div class="item-wrapper">
            ${Button("+", "",{"data-id":"povecaj", "data-id-proizvoda": proizvod.id})}
            <p>${proizvod.title} - Kom: ${proizvod.kolicina} Cijena po komadu: ${proizvod.price}</p>
            ${Button("-", "",{"data-id":"smanji", "data-id-proizvoda": proizvod.id})}
        </div>
    `
}
