# guardar_corregido.ps1 - Versión simplificada y corregida
param(
    [string]$nombre = "Producto",
    [decimal]$precio = 0,
    [int]$stock = 0,
    [string]$codigo = "",
    [string]$categoria = "General",
    [string]$descripcion = ""
)

# Configuración
$server = "localhost\SQLEXPRESS"
$database = "inventario_express"

# Generar código si no se proporcionó
if ([string]::IsNullOrEmpty($codigo)) {
    $codigo = "PS-" + (Get-Date -Format "yyyyMMddHHmmss")
}

Write-Host "📦 Guardando producto..." -ForegroundColor Cyan
Write-Host "   Nombre: $nombre"
Write-Host "   Precio: $$precio"
Write-Host "   Stock: $stock"
Write-Host "   Código: $codigo"

# QUERY SIMPLIFICADA - Sin errores de sintaxis
$query = @"
INSERT INTO productos (codigo, nombre, categoria, precio, stock, descripcion)
VALUES ('$codigo', '$nombre', '$categoria', $precio, $stock, '$descripcion')
"@

try {
    # Ejecutar consulta
    Invoke-Sqlcmd -ServerInstance $server -Database $database -Query $query
    
    # Obtener el ID insertado
    $getIdQuery = "SELECT TOP 1 id FROM productos WHERE codigo = '$codigo' ORDER BY id DESC"
    $result = Invoke-Sqlcmd -ServerInstance $server -Database $database -Query $getIdQuery
    
    Write-Host "`n✅ PRODUCTO GUARDADO EXITOSAMENTE" -ForegroundColor Green
    Write-Host "   ID: $($result.id)" -ForegroundColor Cyan
    Write-Host "   Código: $codigo" -ForegroundColor Cyan
    Write-Host "   Nombre: $nombre" -ForegroundColor Cyan
    
    # Devolver JSON simple
    $response = @{
        status = "success"
        message = "Producto guardado"
        id = $result.id
        codigo = $codigo
        nombre = $nombre
        precio = $precio
        stock = $stock
    }
    
    $response | ConvertTo-Json
    
}
catch {
    Write-Host "`n❌ ERROR: " -NoNewline -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
    
    @{
        status = "error"
        message = "Error al guardar: $_"
    } | ConvertTo-Json
}