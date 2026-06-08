const fs = require('fs');
const path = require('path');

const ARCHIVO_SALIDA = 'contexto_proyecto.txt';
// Escaneamos toda la carpeta src de manera recursiva e integral
const DIRECTORIO_RAIZ = 'src';
const EXTENSIONES = ['.ts', '.tsx', '.js', '.jsx'];
// Carpetas que queremos omitir para evitar basura o archivos pesados
const CARPETAS_IGNORADAS = ['node_modules', '.next', 'out', 'dist'];

let resultado = `==================================================\n`;
resultado += `       CONTEXTO INTEGRAL - PLATAFORMA MIRES       \n`;
resultado += `==================================================\n`;
resultado += `Fecha de extracción: ${new Date().toLocaleString()}\n\n`;

function esCarpetaIgnorada(ruta) {
  return CARPETAS_IGNORADAS.some(carpeta => ruta.includes(path.sep + carpeta + path.sep) || ruta.endsWith(path.sep + carpeta));
}

function escanearEstructura(directorio) {
  if (!fs.existsSync(directorio)) return;
  const archivos = fs.readdirSync(directorio);
  
  archivos.forEach(archivo => {
    const rutaCompleta = path.join(directorio, archivo);
    const estado = fs.statSync(rutaCompleta);
    
    if (estado.isDirectory()) {
      if (!CARPETAS_IGNORADAS.includes(archivo)) {
        escanearEstructura(rutaCompleta);
      }
    } else if (EXTENSIONES.includes(path.extname(rutaCompleta))) {
      try {
        resultado += `\n\n======================================================================\n`;
        resultado += `📄 ARCHIVO EN RUTA: ${rutaCompleta}\n`;
        resultado += `======================================================================\n\n`;
        resultado += fs.readFileSync(rutaCompleta, 'utf-8');
        resultado += `\n\n`;
      } catch (err) {
        resultado += `\n[ERROR AL LEER ARCHIVO ${rutaCompleta}]: ${err.message}\n`;
      }
    }
  });
}

console.log("🚀 Iniciando escaneo exhaustivo de la plataforma...");
escanearEstructura(DIRECTORIO_RAIZ);

try {
  fs.writeFileSync(ARCHIVO_SALIDA, resultado, 'utf-8');
  console.log(`\n======================================================================`);
  console.log(`✅ ¡ÉXITO ABSOLUTO!`);
  console.log(`Todo el código e infraestructura han sido consolidados en:`);
  console.log(`👉 ${path.resolve(ARCHIVO_SALIDA)}`);
  console.log(`======================================================================\n`);
} catch (err) {
  console.error("❌ Error crítico al escribir el archivo de salida:", err.message);
}