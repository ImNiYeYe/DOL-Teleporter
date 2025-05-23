@echo off
setlocal

echo ========================================
echo [Verifying] Checking for Node.js...
echo ========================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install it from: https://nodejs.org
    pause
    exit /b
)

echo [OK] Node.js is installed.

echo.
echo ========================================
echo [Running] Executing zip script...
echo ========================================

node zipitup.js
set "exitCode=%errorlevel%"

if not %exitCode%==0 (
    echo.
    echo [ERROR] An error occurred during zipping. Exit code: %exitCode%
    echo Check the output above for details.
    pause
    exit /b %exitCode%
)

echo.
echo [Success] Archive created successfully.

echo.

for /l %%i in (3,-1,1) do (
    echo Closing in %%i seconds...
    timeout /t 1 /nobreak >nul
)
