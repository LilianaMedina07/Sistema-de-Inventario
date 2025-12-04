# InventarioExpress

InventarioExpress es un sistema ligero de gestión de inventario pensado para pequeñas empresas. Proporciona un panel de control, autenticación, CRUD de productos, registro de movimientos (entradas/salidas) y conexión con Microsoft SQL Server 2019 mediante scripts PowerShell y/o un backend opcional.

**Mantainer:** Liliana


## Características

- Autenticación (login) y flujo de sesión (demo local / JWT-ready)
- Dashboard con indicadores clave (KPI)
- CRUD de productos (crear, ver, editar, eliminar)
- Registro de movimientos: Entradas (compras), Salidas (ventas), Ajustes y Daños
- Filtros y búsqueda en inventario y movimientos
- Exportación a CSV/Excel desde el frontend
- Integración con SQL Server 2019 mediante PowerShell (Trusted Connection) o con un backend Node/ORM


## Tecnologías

- Frontend: HTML, CSS
- Backend: PowerShell (scripts de integración), 
- Base de datos: Microsoft SQL Server 2019
- Herramientas: PowerShell, sqlcmd



## Estructura del proyecto
```
InventarioExpress/
├─ frontend/            # HTML, CSS, JS, assets, package.json (cliente)
├─ backend/             # PowerShell scripts, server helpers, migrations
│  └─ powershell/
├─ database/            # SQL Server scripts (.sql)
└─ docs/                # Documentación, capturas, tipos
```


## Instalación y uso (Windows)

Requisitos previos:

- Microsoft SQL Server 2019 (SQLEXPRESS o instancia completa)
- PowerShell 5.1+ (Windows)


1) Clona el repositorio

```powershell
git clone https://github.com/yourusername/InventarioExpress.git
cd InventarioExpress
```


2) Preparar la base de datos

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

3) Ejecutar scripts PowerShell para insertar datos (ejemplo)

```powershell
# Requiere el módulo SqlServer si no está instalado
Install-Module -Name SqlServer -Scope CurrentUser

# Ejecutar script de ejemplo (ajusta ruta si moviste archivos)
.\backend\powershell\guardar_desde_html.ps1 -codigo "P-1001" -nombre "Producto demo" -precio 9.99 -stock 10
```

4) Frontend

```powershell
cd frontend
npm install
npm run dev
# Abrir http://localhost:5173
```

```powershell
npx serve frontend
# o
npm install -g http-server
http-server frontend -c-1
```

## Contribuir

1. Abre un issue describiendo el cambio que propones.
2. Crea un branch: `feature/mi-cambio`.
3. Envía un pull request con una descripción clara y pruebas.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Puedes ver el archivo `LICENSE` para más detalles.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
