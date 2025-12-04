#  InventarioExpress
Sistema de Gestión de Inventario para Pequeñas Empresas - Aplicación web completa para control de stock, ventas, compras y reportes.

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Tecnologías](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS%2FReact-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%2FExpress%2FPowerShell-green)
![Base de Datos](https://img.shields.io/badge/BD-SQL%20Server%202019-red)


InventarioExpress es un sistema web moderno diseñado para que pequeñas empresas gestionen su inventario de manera eficiente, incluyendo ventas, compras, proveedores, clientes y generación de reportes en un entorno digital, intuitivo y seguro.

**Mantenedora:** Liliana

##  Características Principales
###  Gestión Completa
- **Control de Inventario**: Agregar, actualizar y eliminar productos fácilmente
- **Seguimiento de Ventas**: Registrar transacciones y actualizar niveles de stock automáticamente
- **Gestión de Compras**: Administrar órdenes de compra e información de proveedores
- **Proveedores y Clientes**: Mantener información detallada de contactos comerciales

###  Seguridad y Acceso
- Autenticación de usuarios (login) con flujo de sesión local/JWT
- Panel de control con indicadores clave (KPIs) en tiempo real
- Roles y permisos configurables

###  Reportes y Análisis
- Generación de reportes de niveles de inventario
- Análisis de desempeño de ventas
- Historial de compras y movimientos
- Exportación a CSV/Excel desde el frontend

###  Integración
- Conexión con **Microsoft SQL Server 2019** mediante scripts PowerShell
- Compatible con autenticación Windows 
  
## Stack Tecnológico

### Frontend
- HTML5, CSS3
- Estilos modernos con CSS modular y componentes reutilizables

### Backend
- **Node.js + Express + TypeScript** (API principal)
- **PowerShell** (scripts de automatización e integración)
- **JWT** para autenticación

### Base de Datos
- **Microsoft SQL Server 2019** (SQLEXPRESS)
- Scripts de migración y seeds incluidos

### Herramientas
- **PowerShell 5.1+** con módulo SqlServer
- **sqlcmd** para ejecución de scripts SQL


## Estructura del Proyecto
INVENTARIOEXPRESS/                    
├── 📂 frontend/                      
│   ├── 📄 index.html                 
│   ├── 📄 login.html                
│   ├── 📄 dashboard.html             
│   ├── 📄 inventario.html            
│   ├── 📄 products.html              
│   ├── 📄 movements.html            
│   └── 📂 styles/                    
│       ├── 📄 globals.css           
│       ├── 📄 style.css              
│       └── 📄 ui-modern.css   
├── 📂 client/                        
│   ├── 📂 src/
│   │   ├── 📂 components/            
│   │   ├── 📂 pages/                 
│   │   ├── 📂 services/              
│   │   ├── 📂 styles/                
│   │   ├── 📂 types/                 
│   │   ├── 📄 App.tsx               
│   │   └── 📄 main.tsx              
│   ├── 📄 package.json              
│   ├── 📄 tsconfig.json             
│   └── 📄 vite.config.ts
├── 📂 backend/                       
│   ├── 📂 powershell/               
│   │   └── 📄 guardar_desde_html.ps1 
│   └── 📂 scripts/                   
│       └── 📄 reorganize_structure.ps1 
│
├── 📂 database/                     
│   ├── 📄 crear_base_datos.sql       
│   ├── 📂 migrations/                
│   └── 📂 scripts/                   
│       └── 📄 consulta.sql 
├── 📄 README.md                      
├── 📄 .gitignore            
└── 📄 LICENSE   
