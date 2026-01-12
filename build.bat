@echo off
echo ========================================
echo    BUILD VA OBFUSCATE JAVASCRIPT
echo ========================================
echo.

REM Kiểm tra Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js chua duoc cai dat!
    echo.
    echo Vui long cai dat Node.js tu: https://nodejs.org/
    echo Sau do chay lai script nay.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js da duoc cai dat
node --version
echo.

REM Kiểm tra node_modules
if not exist "node_modules" (
    echo [INFO] Dang cai dat dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Cai dat dependencies that bai!
        pause
        exit /b 1
    )
    echo.
)

echo [INFO] Dang obfuscate cac file JavaScript...
echo.
call node build.js

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    BUILD THANH CONG!
    echo ========================================
    echo.
    echo Cac file da duoc obfuscate trong thu muc: dist/
    echo Ban co the deploy thu muc dist/ len server.
) else (
    echo.
    echo [ERROR] Build that bai!
)

echo.
pause

