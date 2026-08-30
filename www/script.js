// Bottom Tabs Switch karne ka code
function switchTab(tabId, title, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active-section');
    element.classList.add('active');
    document.getElementById('app-title').innerText = title;
}

// PDF App ke andar open karne ka code
function openPDF(pdfUrl) {
    const viewer = document.getElementById('pdf-viewer');
    const frame = document.getElementById('pdf-frame');
    
    // Google Docs Viewer se PDF phone me smoothly khulta hai
    frame.src = `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`;
    viewer.style.display = 'flex';
}

function closePDF() {
    document.getElementById('pdf-viewer').style.display = 'none';
    document.getElementById('pdf-frame').src = '';
}
