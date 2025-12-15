# Despliegue en la Nube (RENDER) - Modo Fácil

He configurado todo para que uses **Render**, que es gratuito y muy fácil de usar con Docker.

## Pasos para desplegar:

1.  **Sube este código a GitHub**
    *   Crea un repositorio nuevo en GitHub.
    *   Sube todos los archivos de esta carpeta a ese repositorio.

2.  **Ve a Render.com**
    *   Crea una cuenta (puedes entrar con tu GitHub).
    *   Pulsa en **"New +"** -> **"Blueprint"**.
    *   Conecta tu cuenta de GitHub y selecciona el repositorio que acabas de crear.

3.  **¡Listo!**
    *   Render detectará automáticamente el archivo `render.yaml` que he creado.
    *   Le das a **"Apply"** y esperas unos minutos.
    *   Te dará una URL tipo `https://frutas-plasencia-fc.onrender.com`.

## Importante sobre la Base de Datos
He configurado el archivo para pedir un "Disco Persistente" (para que no se borren los datos al reiniciar), pero ten en cuenta que **los discos persistentes en Render suelen ser de pago** (unos pocos dólares al mes).

Si usas el plan 100% gratuito sin disco, la web funcionará perfecta, pero **si se reinicia el servidor, los datos volverán al estado inicial**.

## ¿Prefieres Vercel?
Vercel es genial para webs estáticas, pero esta web tiene **Base de Datos**. Para Vercel habría que separar el Backend y usar una base de datos externa (como Neon o Turso). La opción de **Render con Docker** es la que te permite tener "todo en uno" como me pediste.
