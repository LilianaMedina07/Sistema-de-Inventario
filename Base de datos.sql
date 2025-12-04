
SET NOCOUNT ON;

-- Crear la base de datos
IF DB_ID('inventario_express') IS NULL
BEGIN
    CREATE DATABASE inventario_express;
    PRINT 'Base de datos inventario_express creada.';
END
ELSE
BEGIN
    PRINT 'Base de datos inventario_express ya existe.';
END

GO

USE inventario_express;
GO

-- Tabla usuarios
IF OBJECT_ID('dbo.usuarios') IS NULL
BEGIN
    CREATE TABLE dbo.usuarios (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(200) NOT NULL,
        email NVARCHAR(200) NOT NULL UNIQUE,
        password NVARCHAR(256) NOT NULL,
        rol NVARCHAR(50) NOT NULL DEFAULT 'usuario',
        creado_en DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
    PRINT 'Tabla usuarios creada.';
END
ELSE
BEGIN
    PRINT 'Tabla usuarios ya existe.';
END

GO

-- Tabla productos
IF OBJECT_ID('dbo.productos') IS NULL
BEGIN
    CREATE TABLE dbo.productos (
        id INT IDENTITY(1,1) PRIMARY KEY,
        codigo NVARCHAR(100) NOT NULL UNIQUE,
        nombre NVARCHAR(250) NOT NULL,
        categoria NVARCHAR(100) NULL,
        precio DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        stock INT NOT NULL DEFAULT 0,
        stock_minimo INT NOT NULL DEFAULT 0,
        descripcion NVARCHAR(MAX) NULL,
        proveedor NVARCHAR(200) NULL,
        creado_en DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        actualizado_en DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
    PRINT 'Tabla productos creada.';
END
ELSE
BEGIN
    PRINT 'Tabla productos ya existe.';
END

GO

-- Insertar usuario admin (contraseña hasheada con SHA2_256)

DECLARE @adminEmail NVARCHAR(200) = 'admin@inventario.com';
IF NOT EXISTS (SELECT 1 FROM dbo.usuarios WHERE email = @adminEmail)
BEGIN
    DECLARE @plainPwd NVARCHAR(200) = 'admin123';
    DECLARE @pwdHash VARBINARY(32) = HASHBYTES('SHA2_256', CONVERT(VARBINARY(200), @plainPwd));
    DECLARE @pwdHex NVARCHAR(256) = CONVERT(NVARCHAR(256), master.sys.fn_varbintohexsubstring(0, @pwdHash, 1, 0));
    INSERT INTO dbo.usuarios (nombre, email, password, rol)
    VALUES ('Administrador', @adminEmail, @pwdHex, 'admin');
    PRINT 'Usuario admin creado: admin@inventario.com (contraseña: admin123)';
END
ELSE
BEGIN
    PRINT 'Usuario admin ya existe.';
END

GO

-- Insertar 5 productos
IF NOT EXISTS (SELECT 1 FROM dbo.productos)
BEGIN
    INSERT INTO dbo.productos (codigo, nombre, categoria, precio, stock, stock_minimo, descripcion, proveedor)
    VALUES
      ('P-1001', 'Auriculares Bluetooth', 'Electrónica', 29.99, 12, 5, 'Auriculares inalámbricos con micrófono', 'Proveedor A'),
      ('P-1002', 'Camiseta Manga Corta', 'Ropa', 12.50, 25, 10, 'Camiseta de algodón unisex', 'Proveedor B'),
      ('P-1003', 'Leche Entera 1L', 'Alimentos', 1.20, 50, 20, 'Leche pasteurizada 1 litro', 'Proveedor C'),
      ('P-1004', 'Bloc de Notas A4', 'Oficina', 2.50, 40, 5, 'Bloc 50 hojas A4', 'Proveedor A'),
      ('P-1005', 'Monitor 24"', 'Electrónica', 199.99, 8, 3, 'Monitor 24" Full HD', 'Proveedor D');
    PRINT 'Productos de ejemplo insertados.';
END
ELSE
BEGIN
    PRINT 'La tabla productos ya tiene datos, se omite inserción de ejemplo.';
END

GO

-- Actualizar timestamps en caso de necesidad
UPDATE dbo.productos SET actualizado_en = SYSUTCDATETIME();
GO

PRINT 'Script completar.';
