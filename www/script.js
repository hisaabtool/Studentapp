// --- 1. STUDY MATERIAL DATABASE ---
const materialDB = {
    'lekhpal': {
        'Hindi Vyakaran': [{ chapter: 'वर्णमाला और समास', link: '#' }],
        'Gram Samaj & Vikas': [{ chapter: 'कृषि एवं पंचायती राज', link: '#' }]
    },
    'police': {
        'UP Police Constable': [{ chapter: 'PYQ Set 1 (Hindi)', link: '#' }]
    },
    'ssc': { 
        'SSC CGL (Graduate Level)': [{ chapter: 'CGL Tier 1 - English Paper', link: 'https://www.adda247.com/jobs/wp-content/uploads/2021/05/31123422/SSC-CGL-28-Dec-English.pdf' }]
    }
};

// --- 2. MOCK TEST DATABASE GENERATOR (10 Sets Each) ---
const mockDatabase = {};

// Asali Lekhpal ke kuch questions jo Set 1 me dikhenge
const realLekhpalQs = [
    { t: "Hindi", q: "'आग' का पर्यायवाची कौन सा है?", o: ["अनल", "अनिल", "सलिल", "गगन"], a: 0 },
    { t: "Hindi", q: "महोदय का संधि विच्छेद क्या है?", o: ["महो+दय", "महा+उदय", "मही+उदय", "महा+औदय"], a: 1 },
    { t: "UP GK", q: "उत्तर प्रदेश का राजकीय पुष्प क्या है?", o: ["कमल", "पलाश", "गुलाब", "गेंदा"], a: 1 },
    { t: "Gram Samaj", q: "एक बीघा में कितने बिस्वा होते हैं?", o: ["10", "15", "20", "25"], a: 2 },
    { t: "Maths", q: "100 का 25% कितना होगा?", o: ["20", "25", "30", "50"], a: 1 }
];

// Lekhpal ke 10 Sets generate karna (Har set me 100 questions)
for(let setNum = 1; setNum <= 10; setNum++) {
    let testArray = [];
    for(let qNum = 1; qNum <= 100; qNum++) {
        // Agar Set 1 hai aur shuru ke questions hain, toh asali data daalo
        if(setNum === 1 && qNum <= realLekhpalQs.length) {
            testArray.push(realLekhpalQs[qNum-1]);
        } else {
            // Baaki 100 poore karne ke liye auto-fill taaki app test ho sake
            testArray.push({ t: "Lekhpal Section", q: `Set ${setNum} - Lekhpal Question No. ${qNum}`, o: ["Option A", "Option B", "Option C", "Option D"], a: 0 });
        }
    }
    mockDatabase['lekhpal_set_' + setNum] = testArray;
}

// UP Police ke 10 Sets generate karna (Har set me 150 questions)
for(let setNum = 1; setNum <= 10; setNum++) {
    let testArray = [];
    for(let qNum = 1; qNum <= 150; qNum++) {
        testArray.push({ t: "UP Police Section", q: `Set ${setNum} - Police PYQ No. ${qNum}`, o: ["A", "B", "C", "D"], a: 1 });
    }
    mockDatabase['police_set_' + setNum] = testArray;
}


// --- 3. APP LOGIC & TABS ---
window.onload = () => { 
    loadMaterials('lekhpal', document.querySelector('.cat-btn')); 
    renderTestSeriesDashboard(); // Dashboard UI banayega
};

function switchTab(tabId, title, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.getElementById(tabId).classList.add('active-section');
    element.classList.add('active');
    document.getElementById('app-title').innerText = title;
    
    if(tabId === 'mock') checkTestProgress();
}

function loadMaterials(examId, element) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active-cat'));
    if(element) element.classList.add('active-cat');
    const container = document.getElementById('material-container');
    container.innerHTML = ''; 
    const examData = materialDB[examId];
    
    for (let subject in examData) {
        let subjectHtml = `<div style="margin-top: 20px; font-size: 18px; font-weight: bold; color: var(--primary); border-bottom: 2px solid #E5E7EB; padding-bottom: 5px;">📚 ${subject}</div>`;
        examData[subject].forEach(item => {
            subjectHtml += `<div class="card" style="margin-top: 10px; padding: 15px;"><div style="flex: 1;"><h3 style="font-size: 15px;">${item.chapter}</h3></div><button class="btn" onclick="openPDF('${item.link}')">Read</button></div>`;
        });
        container.innerHTML += subjectHtml;
    }
}

function openPDF(pdfUrl) {
    if(pdfUrl === '#') { alert("Yahan apna PDF link lagayein!"); return; }
    document.getElementById('pdf-viewer').style.display = 'flex';
    document.getElementById('pdf-frame').src = `https://docs.google.com/gview?embedded=true&url=${pdfUrl}`;
}
function closePDF() {
    document.getElementById('pdf-viewer').style.display = 'none';
    document.getElementById('pdf-frame').src = '';
}

// --- 4. MOCK TEST UI & ENGINE ---
let activeTestId = "";
let currentTest = [], currentQuestionIndex = 0, userAnswers = [];

// JS se HTML me 10-10 Tests ke cards banana
function renderTestSeriesDashboard() {
    let lekhpalHtml = "", policeHtml = "";
    
    for(let i=1; i<=10; i++) {
        lekhpalHtml += `
        <div class="test-card">
            <div>
                <h4>PYQ Set - ${i}</h4>
                <span id="badge-lekhpal_set_${i}" class="status-badge">Not Attempted ⏳</span>
            </div>
            <button class="btn" onclick="startTest('lekhpal_set_${i}')">Start</button>
        </div>`;
        
        policeHtml += `
        <div class="test-card">
            <div>
                <h4>PYQ Set - ${i}</h4>
                <span id="badge-police_set_${i}" class="status-badge">Not Attempted ⏳</span>
            </div>
            <button class="btn" onclick="startTest('police_set_${i}')">Start</button>
        </div>`;
    }
    
    document.getElementById('lekhpal-tests-container').innerHTML = lekhpalHtml;
    document.getElementById('police-tests-container').innerHTML = policeHtml;
    checkTestProgress();
}

function checkTestProgress() {
    for(let i=1; i<=10; i++) {
        let l_id = 'lekhpal_set_' + i;
        let p_id = 'police_set_' + i;
        
        if(localStorage.getItem('completed_' + l_id)) {
            let badge = document.getElementById('badge-' + l_id);
            if(badge) { badge.innerText = "Completed ✅"; badge.classList.add('completed'); }
        }
        if(localStorage.getItem('completed_' + p_id)) {
            let badge = document.getElementById('badge-' + p_id);
            if(badge) { badge.innerText = "Completed ✅"; badge.classList.add('completed'); }
        }
    }
}

function startTest(testId) {
    activeTestId = testId;
    currentTest = mockDatabase[testId];
    currentQuestionIndex = 0;
    userAnswers = new Array(currentTest.length).fill(null); 

    document.getElementById('test-dashboard').style.display = 'none';
    document.getElementById('quiz-engine').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    let qData = currentTest[currentQuestionIndex];
    document.getElementById('topic-badge').innerText = qData.t;
    document.getElementById('q-counter').innerText = `Q: ${currentQuestionIndex + 1}/${currentTest.length}`;
    document.getElementById('question-text').innerText = qData.q;
    
    // Progress Bar Update
    let progressPercent = ((currentQuestionIndex + 1) / currentTest.length) * 100;
    document.getElementById('progress-fill').style.width = progressPercent + "%";
    
    let optionsHtml = '';
    qData.o.forEach((opt, index) => {
        let isSelected = userAnswers[currentQuestionIndex] === index ? 'background: #E0E7FF; border: 2px solid var(--primary);' : 'background: #E5E7EB; border: 2px solid transparent;';
        optionsHtml += `<button style="width: 100%; margin-top: 10px; color: #1F2937; text-align: left; padding: 12px; font-weight: 500; border-radius: 8px; transition: 0.2s; ${isSelected}" onclick="selectAnswer(${index})">${opt}</button>`;
    });
    document.getElementById('options-container').innerHTML = optionsHtml;

    let nextBtn = document.getElementById('next-btn');
    if (currentQuestionIndex === currentTest.length - 1) {
        nextBtn.innerText = "Submit Test ✔️";
        nextBtn.style.background = "#10B981"; 
    } else {
        nextBtn.innerText = "Next ➡";
        nextBtn.style.background = "var(--primary)";
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
        if (userAnswers[i] === currentTest[i].a) score++;
    }

    localStorage.setItem('completed_' + activeTestId, 'true');

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
    checkTestProgress(); 
}
