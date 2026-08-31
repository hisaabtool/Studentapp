// --- DATABASE ---
const materialDB = {
    'lekhpal': {
        'Hindi Vyakaran': [
            { chapter: 'Chapter 1: वर्णमाला (Varnamala)', link: 'https://example.com/pdf1' },
            { chapter: 'Chapter 2: समास (Samas)', link: 'https://example.com/pdf2' }
        ],
        'Gram Samaj & Vikas': [
            { chapter: 'Chapter 1: कृषि व्यवस्था', link: 'https://example.com/pdf3' }
        ]
    },
    'police': {
        'Previous Year Papers': [
            { chapter: 'UP Police PYQ Set 03', link: 'https://adda247-wp-multisite-assets.s3.ap-south-1.amazonaws.com/wp-content/uploads/multisite/sites/2/2023/12/23210354/UP-Police-Previous-Year-Paper-03.pdf' }
        ]
    },
    'ssc': {
        'SSC CGL Original Papers': [
            { chapter: 'CGL Paper (English)', link: 'https://www.adda247.com/jobs/wp-content/uploads/2021/05/31123422/SSC-CGL-28-Dec-English.pdf' }
        ]
    }
};

const mockDatabase = {
    'lekhpal25': [
        { topic: "Hindi", q: "इनमें से 'आग' का पर्यायवाची कौन सा है?", options: ["अनल", "अनिल", "सलिल", "गगन"], ans: 0 },
        { topic: "UP GK", q: "उत्तर प्रदेश का राजकीय पुष्प क्या है?", options: ["कमल", "पलाश", "गुलाब", "गेंदा"], ans: 1 },
        { topic: "Gram Samaj", q: "एक बीघा में कितने बिस्वा होते हैं?", options: ["10", "15", "20", "25"], ans: 2 }
    ],
    'police50': [
        { topic: "Polity", q: "भारतीय संविधान में कुल कितनी अनुसूचियां हैं?", options: ["8", "10", "12", "14"], ans: 2 },
        { topic: "Reasoning", q: "यदि A=1, B=2 है, तो CAB का मान क्या होगा?", options: ["5", "6", "7", "8"], ans: 1 }
    ]
};

// --- TABS & UI LOGIC ---
function switchTab(tabId, title, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active-section');
    element.classList.add('active');
    document.getElementById('app-title').innerText = title;
}

function loadMaterials(examId, element) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active-cat'));
    if(element) element.classList.add('active-cat');

    const container = document.getElementById('material-container');
    container.innerHTML = ''; 
    container.style.animation = 'none'; 
    setTimeout(() => container.style.animation = 'fadeIn 0.4s ease', 10);

    const examData = materialDB[examId];
    
    for (let subject in examData) {
        let subjectHtml = `<div style="margin-top: 20px; font-size: 18px; font-weight: bold; color: var(--primary); border-bottom: 2px solid #E5E7EB; padding-bottom: 5px;">📚 ${subject}</div>`;
        
        examData[subject].forEach(item => {
            subjectHtml += `
            <div class="card" style="margin-top: 10px; padding: 15px;">
                <div style="flex: 1;"><h3 style="font-size: 16px;">${item.chapter}</h3></div>
                <button class="btn" onclick="openPDF('${item.link}')">Read</button>
            </div>`;
        });
        container.innerHTML += subjectHtml;
    }
}

// --- PDF VIEWER LOGIC ---
function openPDF(pdfUrl) {
    const viewer = document.getElementById('pdf-viewer');
    const frame = document.getElementById('pdf-frame');
    frame.src = `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`;
    viewer.style.display = 'flex';
}
function closePDF() {
    document.getElementById('pdf-viewer').style.display = 'none';
    document.getElementById('pdf-frame').src = '';
}

// --- MOCK TEST LOGIC ---
let currentTest = [], currentQuestionIndex = 0, userAnswers = [];

function startTest(testId) {
    currentTest = mockDatabase[testId];
    currentQuestionIndex = 0;
    userAnswers = new Array(currentTest.length).fill(null); 

    document.getElementById('test-dashboard').style.display = 'none';
    document.getElementById('quiz-engine').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    let qData = currentTest[currentQuestionIndex];
    document.getElementById('topic-badge').innerText = qData.topic;
    document.getElementById('q-counter').innerText = `Q: ${currentQuestionIndex + 1}/${currentTest.length}`;
    document.getElementById('question-text').innerText = qData.q;
    
    let optionsHtml = '';
    qData.options.forEach((opt, index) => {
        let isSelected = userAnswers[currentQuestionIndex] === index ? 'selected' : '';
        optionsHtml += `<button class="btn option-btn ${isSelected}" onclick="selectAnswer(${index})">${opt}</button>`;
    });
    document.getElementById('options-container').innerHTML = optionsHtml;

    if (currentQuestionIndex === currentTest.length - 1) {
        document.getElementById('next-btn').innerText = "Submit Test ✔️";
        document.getElementById('next-btn').style.background = "#10B981"; 
    } else {
        document.getElementById('next-btn').innerText = "Next ➡";
        document.getElementById('next-btn').style.background = "var(--primary)";
    }
}

function selectAnswer(optIndex) {
    userAnswers[currentQuestionIndex] = optIndex; 
    loadQuestion(); 
}

function nextQuestion() {
    if (currentQuestionIndex < currentTest.length - 1) { currentQuestionIndex++; loadQuestion(); } 
    else { calculateResult(); }
}
function prevQuestion() {
    if (currentQuestionIndex > 0) { currentQuestionIndex--; loadQuestion(); }
}

function calculateResult() {
    let score = 0;
    for (let i = 0; i < currentTest.length; i++) {
        if (userAnswers[i] === currentTest[i].ans) score++;
    }

    document.getElementById('quiz-engine').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score-text').innerText = `${score} / ${currentTest.length}`;
    
    let percentage = (score / currentTest.length) * 100;
    if (percentage >= 80) document.getElementById('score-message').innerText = "Excellent Preparation! 🔥";
    else if (percentage >= 50) document.getElementById('score-message').innerText = "Good, but needs revision. 👍";
    else document.getElementById('score-message').innerText = "Work Harder! You can do it. 📚";
}

function closeTest() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('test-dashboard').style.display = 'block';
}

// Init App
window.onload = () => { loadMaterials('lekhpal', document.querySelector('.cat-btn')); };
