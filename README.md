# apuntes-fing

Sitio estático (HTML/CSS/JS, sin build). Se despliega en Vercel tal cual.

## Estructura
```
index.html          portada con las materias (este nombre es obligatorio)
assets/             style.css y app.js compartidos por todas las materias
prog3/              una carpeta por materia
  inicio-prog3.html portada de la materia (en cada materia: inicio-<materia>.html)
  <tema>.html       una página por tema
```

## Agregar una materia
1. Copiá `prog3/` con otro nombre (ej. `calculo2/`), renombrá `inicio-prog3.html` a `inicio-calculo2.html` y reemplazá el contenido de las páginas.
2. En `index.html` agregá una tarjeta `<li>` apuntando a `calculo2/inicio-calculo2.html`.
3. En el `<header>` de cada página agregá el enlace a la materia (opcional).
4. En las páginas de la nueva materia, los enlaces a `../assets/` ya funcionan porque está a la misma profundidad.

## Créditos
Contenido de Programación 3 basado en el resumen de Matias Alvira (FING, Udelar). Material no oficial.
