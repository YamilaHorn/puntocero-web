import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  try {
    const provinceId = url.searchParams.get("provinceId");

    if (!provinceId) {
      return json(
        { error: "Falta el ID de la provincia" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinceId}&campos=id,nombre&max=5000`
    );

    if (!response.ok) {
      throw new Error("Error obteniendo localidades");
    }

    const data = await response.json();

    const cities = data.localidades
      .map((city: { id: string; nombre: string }) => ({
        id: city.id,
        name: city.nombre
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name, "es")
      );

    return json(cities);

  } catch (error) {
    console.error(error);

    return json(
      { error: "No se pudieron obtener las localidades" },
      { status: 500 }
    );
  }
};