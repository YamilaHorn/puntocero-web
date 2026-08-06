import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  try {
    const response = await fetch(
      "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=24"
    );

    if (!response.ok) {
      throw new Error("Error obteniendo provincias");
    }

    const data = await response.json();

    const provinces = data.provincias
      .map((p: { id: string; nombre: string }) => ({
        id: p.id,
        name: p.nombre
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name, "es")
      );

    return json(provinces);
  } catch (error) {
    console.error(error);

    return json(
      {
        error: "No se pudieron obtener las provincias"
      },
      {
        status: 500
      }
    );
  }
};