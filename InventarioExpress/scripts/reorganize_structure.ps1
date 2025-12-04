<#
  Reorganize project files into directories:
    frontend/, backend/, database/, docs/

  Usage (PowerShell):
    cd <repo-root>
    .\scripts\reorganize_structure.ps1 -WhatIf   # to preview
    .\scripts\reorganize_structure.ps1         # to perform moves

  The script will create target folders and move files if they exist.
  It is careful (won't overwrite existing files unless user confirms).
#>

param(
    [switch]$Force,
    [switch]$WhatIf
)

function Do-Move($src, $dst) {
    if (-not (Test-Path $src)) { return }
    if (Test-Path $dst) {
        if ($WhatIf) { Write-Host "WhatIf: Move '$src' -> '$dst' (exists)"; return }
        if (-not $Force) {
            $ans = Read-Host "Target exists: $dst. Overwrite? (y/N)"
            if ($ans -ne 'y') { Write-Host "Skipping $src"; return }
        }
        Remove-Item -LiteralPath $dst -Recurse -Force
    }
    if ($WhatIf) { Write-Host "WhatIf: Move '$src' -> '$dst'"; return }
    Write-Host "Moving '$src' -> '$dst'"
    Move-Item -LiteralPath $src -Destination $dst -Force
}

Write-Host "Preparing to reorganize project into frontend/, backend/, database/, docs/"

# Ensure target folders
New-Item -ItemType Directory -Force -Path frontend | Out-Null
New-Item -ItemType Directory -Force -Path backend | Out-Null
New-Item -ItemType Directory -Force -Path database | Out-Null
New-Item -ItemType Directory -Force -Path docs | Out-Null

# Map individual files and folders
$moves = @(
    @{ src = '.\index.html'; dst = '.\frontend\index.html' },
    @{ src = '.\login.html'; dst = '.\frontend\login.html' },
    @{ src = '.\dashboard.html'; dst = '.\frontend\dashboard.html' },
    @{ src = '.\inventario.html'; dst = '.\frontend\inventario.html' },
    @{ src = '.\movements.html'; dst = '.\frontend\movements.html' },
    @{ src = '.\products.html'; dst = '.\frontend\products.html' },
    @{ src = '.\style.css'; dst = '.\frontend\style.css' },
    @{ src = '.\ui-modern.css'; dst = '.\frontend\ui-modern.css' },
    @{ src = '.\guardar_desde_html.ps1'; dst = '.\backend\powershell\guardar_desde_html.ps1' },
    @{ src = '.\guardar_desde.html.ps1'; dst = '.\backend\powershell\guardar_desde.html.ps1' },
    @{ src = '.\styles\consulta.sql'; dst = '.\database\sql\consulta.sql' },
    @{ src = '.\styles\globals.css'; dst = '.\frontend\styles\globals.css' },
    @{ src = '.\client'; dst = '.\frontend\client' },
    @{ src = '.\migrations'; dst = '.\backend\migrations' },
    @{ src = '.\scripts'; dst = '.\backend\scripts' },
    @{ src = '.\package.json'; dst = '.\frontend\package.json' },
    @{ src = '.\tsconfig.json'; dst = '.\frontend\tsconfig.json' },
    @{ src = '.\vite.config.ts'; dst = '.\frontend\vite.config.ts' },
    @{ src = '.github\workflows\clyml'; dst = '.github\workflows\clyml' },
    @{ src = '.\types'; dst = '.\docs\types' }
)

# Create subdirs used by moves
New-Item -ItemType Directory -Force -Path '.\backend\powershell' | Out-Null
New-Item -ItemType Directory -Force -Path '.\database\sql' | Out-Null
New-Item -ItemType Directory -Force -Path '.\frontend\styles' | Out-Null

foreach ($m in $moves) {
    $s = $m.src; $d = $m.dst
    if (Test-Path $s) {
        Do-Move $s $d
    } else {
        Write-Host "Not found: $s (skipping)"
    }
}

Write-Host "Reorganization script finished. Review frontend/, backend/, database/, docs/"
Write-Host "If you moved package.json to frontend and it's the client package, run 'npm install' in ./frontend"
Write-Host "If you want me to also update paths inside files (links/imports), tell me and I can apply replacements." 
