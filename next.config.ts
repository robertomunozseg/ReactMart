import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // 1. Habilita la exportación estática para generar la carpeta /out
  output: "export",

  // 2. Configura la ruta base con el nombre de tu repositorio
  basePath: isProd ? "/ReactMart" : "",

  // 3. Define el prefijo para los archivos estáticos (CSS, JS)
  assetPrefix: isProd ? "/ReactMart/" : "",

  // 4. Desactiva la optimización de imágenes (necesario para GitHub Pages)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;