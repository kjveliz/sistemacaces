export interface LoginResponse {
  ok: boolean;
  mensaje: string;
  usuario?: {
    id_usuario: number;
    nombres: string;
    apellidos: string;
    correo: string;
    rol: string;
  };
}

export async function iniciarSesion(
  correo: string,
  contrasena: string,
): Promise<LoginResponse> {
  const respuesta = await fetch(
    "http://localhost/sistemacaces/api/auth/login.php",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        correo,
        contrasena,
      }),
    },
  );

  const datos = (await respuesta.json()) as LoginResponse;

  if (!respuesta.ok) {
    throw new Error(
      datos.mensaje || "No se pudo iniciar sesión.",
    );
  }

  return datos;
}