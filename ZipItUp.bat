@echo off
setlocal

:: Output zip name
set "ZIP_NAME=Dol-Teleporter.zip"

:: Files and folders to include
set "INCLUDE_ITEMS='game','boot.json','readme.txt'"

:: Use PowerShell to zip them
powershell -Command "Compress-Archive -Path %INCLUDE_ITEMS% -DestinationPath '%ZIP_NAME%' -Force"

echo Mod has been zipped: %ZIP_NAME%
pause
