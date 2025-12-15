# Guía de Despliegue - Frutas Plasencia FC

Esta web ha sido preparada para ejecutarse en producción con un **Backend (Node.js)** y una **Base de Datos (SQLite)** persistente.

## Estructura
- **Frontend**: React + Vite (se compila a estático).
- **Backend**: Express + SQLite (sirve la API y los archivos del frontend).
- **Base de Datos**: Archivo SQLite guardado en `./data` (no se borra al reiniciar).

## Requisitos
- Un servidor VPS (Ubuntu/Debian recomendado) asociado a tu dominio `frutasplasenciafc.me`.
- Docker y Docker Compose instalados en el servidor.

## Instrucciones Rápidas

1. **Sube los archivos al servidor**
   Copia toda la carpeta del proyecto a tu servidor. Puedes usar FileZilla o SCP.
   
2. **Arranca la aplicación**
   Entra en la carpeta del proyecto en tu terminal y ejecuta:

   ```bash
   docker compose up --build -d
   ```

3. **¡Listo!**
   La web estará funcionando en `http://frutasplasenciafc.me` (puerto 80).

## Panel de Administración
Para entrar como Capi, pulsa el escudo o el botón "Capi" y usa la contraseña: `frutas123`.

## Datos
La base de datos se guardará automáticamente en la carpeta `data/` dentro del proyecto. Si quieres hacer una copia de seguridad, solo guarda esa carpeta.
