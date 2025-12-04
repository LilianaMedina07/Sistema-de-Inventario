# Recibir datos desde formulario HTML
param(
    [string]$codigo,
    [string]$nombre,
    [decimal]$precio,
    [int]$stock
)

$connectionString = "Server=localhost\SQLEXPRESS;Database=inventario_express;Trusted_Connection=True;"

$query = @"
INSERT INTO productos (codigo, nombre, precio, stock, categoria)
VALUES ('$codigo', '$nombre', $precio, $stock, 'Desde HTML')
"@

Invoke-Sqlcmd -ConnectionString $connectionString -Query $query
Write-Host "Producto '$nombre' guardado en SQL Server"