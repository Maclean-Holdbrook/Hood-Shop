@echo off
echo ================================
echo   Starting Hood Shop Full Stack
echo ================================
echo.

echo [1/2] Starting Backend Server...
start cmd /k "cd ..\hood-shop-backend && echo Backend Server Starting... && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend...
start cmd /k "cd . && echo Frontend Starting... && npm run dev"

echo.
echo ================================
echo   Both servers are starting!
echo ================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
