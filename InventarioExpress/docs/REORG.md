# Reorganización del repositorio

Este documento explica la estructura objetivo y cómo ejecutar el script que mueve los archivos.

Estructura objetivo:

- frontend/
  - index.html, login.html, dashboard.html, inventario.html, movements.html, products.html
  - styles/, client/ (si existía)
  - package.json, tsconfig.json, vite.config.ts (si corresponden al frontend)

- backend/
  - powershell/ (scripts PowerShell como `guardar_desde_html.ps1`)
  - migrations/
  - scripts/ (scripts del servidor)

- database/
  - sql/ (scripts .sql como `consulta.sql`)

- docs/
  - documentación y tipos

Cómo ejecutar (Windows PowerShell):

1. Abre PowerShell en la carpeta raíz del proyecto (donde está `.git`).
2. Ejecuta una vista previa (no moverá nada):

```powershell
cd C:\path\to\InventarioExpress
.\scripts\reorganize_structure.ps1 -WhatIf
```

3. Si la vista previa se ve bien, ejecuta el script para mover archivos:

```powershell
.\scripts\reorganize_structure.ps1
```

Notas importantes:
- El script no editará dentro de los archivos (por ejemplo, enlaces relativos en HTML o imports). Después de mover archivos es posible que necesites actualizar rutas en HTML/JS/TS.
- Si `package.json` que está en la raíz corresponde al servidor/back-end en lugar del frontend, restaura el archivo a `./backend/` manualmente.
- Si quieres que yo aplique cambios automáticos en los `href/src` o en imports, puedo hacerlo después de la reorganización.

Si necesitas que actualice los enlaces y `import` automáticamente, dime y lo hago (aplicaré parches a los archivos afectados).
