const apiEndpont = "https://dummyjson.com/products";

export async function dohvatiProizvode() {
  const response = await fetch(`${apiEndpont}/category/groceries`);

  if (!response.ok) {
    throw new Error();
  }

  return (await response.json()).products;
}
