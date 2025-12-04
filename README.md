# InventarioExpress

InventarioExpress es un sistema ligero de gestión de inventario pensado para pequeñas empresas. Proporciona un panel de control, autenticación, CRUD de productos, registro de movimientos (entradas/salidas) y conexión con Microsoft SQL Server 2019 mediante scripts PowerShell y/o un backend opcional.

**Mantainer:** Liliana

---

## Características

- Autenticación (login) y flujo de sesión (demo local / JWT-ready)
- Dashboard con indicadores clave (KPI)
- CRUD de productos (crear, ver, editar, eliminar)
- Registro de movimientos: Entradas (compras), Salidas (ventas), Ajustes y Daños
- Filtros y búsqueda en inventario y movimientos
- Exportación a CSV/Excel desde el frontend
- Integración con SQL Server 2019 mediante PowerShell (Trusted Connection) o con un backend Node/ORM

---

## Tecnologías

- Frontend: HTML, CSS, JavaScript
- Backend: PowerShell (scripts de integración), opcional Node.js (Express)
- Base de datos: Microsoft SQL Server 2019
- Herramientas: PowerShell, sqlcmd, Invoke-Sqlcmd (módulo SqlServer)

---

## Estructura del proyecto

```
InventarioExpress/
├─ frontend/            # HTML, CSS, JS, assets, package.json (cliente)
├─ backend/             # PowerShell scripts, server helpers, migrations
│  └─ powershell/
├─ database/            # SQL Server scripts (.sql)
└─ docs/                # Documentación, capturas, tipos
```

> Nota: Si los archivos todavía están en la raíz, encuentra `scripts/reorganize_structure.ps1` para moverlos automáticamente a la estructura recomendada.

---

## Instalación y uso (Windows)

Requisitos previos:

- Microsoft SQL Server 2019 (SQLEXPRESS o instancia completa)
- PowerShell 5.1+ (Windows)
- Node.js y npm (opcional si usas frontend con Vite)

1) Clona el repositorio

```powershell
git clone https://github.com/yourusername/InventarioExpress.git
cd InventarioExpress
```

2) Opcional: reorganizar archivos (vista previa y ejecución)

```powershell
# Vista previa (no mueve nada)
.\scripts\reorganize_structure.ps1 -WhatIf

# Ejecutar la reorganización
.\scripts\reorganize_structure.ps1
```

3) Preparar la base de datos

- Crea la base de datos `inventario_express` en SQL Server (SSMS o `sqlcmd`).
- Crea la tabla `productos` (ejemplo):

```sql
CREATE TABLE productos (
  id INT IDENTITY(1,1) PRIMARY KEY,
  codigo NVARCHAR(50) NOT NULL,
  nombre NVARCHAR(200) NOT NULL,
  precio DECIMAL(12,2) NOT NULL,
  stock INT NOT NULL,
  categoria NVARCHAR(100)
);
```

4) Ejecutar scripts PowerShell para insertar datos (ejemplo)

```powershell
# Requiere el módulo SqlServer si no está instalado
Install-Module -Name SqlServer -Scope CurrentUser

# Ejecutar script de ejemplo (ajusta ruta si moviste archivos)
.\backend\powershell\guardar_desde_html.ps1 -codigo "P-1001" -nombre "Producto demo" -precio 9.99 -stock 10
```

5) Frontend

- Si el proyecto tiene `package.json` dentro de `frontend/` y usa Vite:

```powershell
cd frontend
npm install
npm run dev
# Abrir http://localhost:5173
```

- Si no usas Vite, puedes abrir los archivos HTML estáticos o servirlos con un servidor estático:

```powershell
npx serve frontend
# o
npm install -g http-server
http-server frontend -c-1
```

6) Backend API (opcional)

Si quieres exponer operaciones CRUD y movimientos mediante una API, puedes crear un servidor Node/Express que:

- Use `msnodesqlv8` (o `tedious`) para conectar con SQL Server (trusted connection o SQL auth)
- Llame a los scripts PowerShell o ejecute consultas parametrizadas directamente

Ejemplo mínimo para ejecutar un script PowerShell desde Node (no recomendado en producción):

```js
const { exec } = require('child_process');
exec('powershell -File backend\powershell\guardar_desde_html.ps1 -codigo P-1001 -nombre "X" -precio 1.2 -stock 2', (err,out) => {
  if(err) console.error(err);
  else console.log(out);
});
```

---

## Capturas de pantalla (placeholders)

Coloca tus capturas reales en `docs/screenshots/` y reemplaza los placeholders abajo:

![Dashboard](docs/screenshots/dashboard.png)
![Gestión de Productos](docs/screenshots/inventario.png)
![Movimientos](docs/screenshots/movements.png)

---

## Contribuir

1. Abre un issue describiendo el cambio que propones.
2. Crea un branch: `feature/mi-cambio`.
3. Envía un pull request con una descripción clara y pruebas.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Puedes ver el archivo `LICENSE` para más detalles.

---

Si quieres, puedo:

- Añadir instrucciones específicas para conectar Node.js con SQL Server usando `msnodesqlv8` (Windows Authentication) o `tedious` (SQL Authentication).
- Generar un script `seed` para poblar la BD con usuario admin y datos de ejemplo.
- Estandarizar las claves de sesión en el frontend (`ie_user` / `ie_token`).

Indica qué prefieres y lo implemento.
# InventarioExpress

InventarioExpress is a web application designed for small businesses to efficiently manage their inventory, sales, purchases, suppliers, customers, and generate reports in a digital, intuitive, and secure manner.

## Features

- **Inventory Management**: Easily add, update, and delete products in your inventory.
- **Sales Tracking**: Record sales transactions and automatically update inventory levels.
- **Purchases Management**: Manage purchase orders and supplier information.
- **Supplier and Customer Management**: Keep track of suppliers and customers with detailed information.
- **Reporting**: Generate reports on inventory levels, sales performance, and purchase history.
- **User Authentication**: Secure access to the application with user authentication features.

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript
- **Database**: (Specify your choice, e.g., MongoDB, PostgreSQL)
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/InventarioExpress.git
   ```

2. Navigate to the server directory and install dependencies:
   ```
   cd InventarioExpress/server
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Start the backend server:
   ```
   npm start
   ```

5. Navigate to the client directory and install dependencies:
   ```
   cd ../client
   npm install
   ```

6. Start the frontend application:
   ```
   npm run dev
   ```

## Usage

- Access the application through your web browser at `http://localhost:3000` (or the port specified in your configuration).
- Use the provided interfaces to manage your inventory, sales, and other business operations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.