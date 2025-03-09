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

// Route to serve the batch file
app.get('/run_paste.bat', (req, res) => {
    res.setHeader('Content-Type', 'application/x-bat');
    res.setHeader('Content-Disposition', 'attachment; filename=run_paste.bat');
    res.sendFile(path.join(__dirname, 'public', 'run_paste.bat'));
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