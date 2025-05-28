const [, , http, resourceArg, title, category, price] = process.argv;
const [resource, id] = resourceArg.split("/");

//obtener todos los productos
async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error al obtener los productos >>", error);
  } finally {
    console.log("Fin del request");
  }
}

//obtener producto por ID
async function getProduct(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    console.log("Producto obtenido:", data);
  } catch (error) {
    console.error("Error al obtener los productos >>", error);
  } finally {
    console.log("Fin del request");
  }
}

//agregar un producto
async function createProduct(title, category, price) {
  try {
    const product = { title: title, category: category, price: price };
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    const data = await res.json();
    console.log("Se agrego el producto >>", data);
  } catch (error) {
    console.error("Error al agregar un productos >>", error);
  } finally {
    console.log("Fin del request");
  }
}

//eliminar un producto
async function deleteProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log("Producto eliminado:", data);
  } catch (error) {
    console.error("Error al elimiar el producto >>", error);
  } finally {
    console.log("Fin del request");
  }
}

if (http === "GET" && resource === "products" && id) {
  await getProduct(id);
} else if (http === "GET" && resource === "products") {
  await getProducts();
} else if (http === "POST" && resource === "products") {
  await createProduct();
} else if (http === "DELETE" && resource === "products" && id) {
  await deleteProduct(id);
} else {
  console.log("Comando no reconocido.");
}
