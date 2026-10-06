import { Button } from "./button";

export function KarticaProizvoda(proizvod, uKosarici) {
  return `
        <div class="kartica">
            <h3>${proizvod.title}</h3>
            <p>Kategorija: ${proizvod.category}</p>
            <p>${proizvod.price} USD po komadu</p>
            ${Button(uKosarici ? "Ukloni iz košsarice" : "Dodaj u košaricu", "", { "data-id-proizvoda": proizvod.id })}
        </div>
    `;
}
