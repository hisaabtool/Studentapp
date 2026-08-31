// --- DATABASE ---
const materialDB = {
    'lekhpal': { 'Hindi Vyakaran': [{ chapter: 'वर्णमाला और समास', link: '#' }] },
    'police': { 'UP Police Constable': [{ chapter: 'PYQ Set 1 (Hindi)', link: '#' }] },
    'ssc': { 'SSC CGL': [{ chapter: 'CGL Tier 1 English', link: '#' }] }
};

const testConfigs = [
    { id: 'lekhpal', title: 'UP Lekhpal PYQ Series', qs: 100, time: 120, sets: 10, bg: '#E0E7FF', text: '#4F46E5', icon: '📝' },
    { id: 'police', title: 'UP Police PYQ Series', qs: 150, time: 120, sets: 10, bg: '#FEF3C7', text: '#D97706', icon: '🚔' }
];

const mockDatabase = {};

// Asali Lekhpal questions with EXPLANATIONS (exp)
const realLekhpalQs = [
    { t: "Hindi", q: "'आग' का पर्यायवाची कौन सा है?", o: ["अनल", "अनिल", "सलिल", "गगन"], a: 0, exp: "'अनल' का अर्थ आग होता है, जबकि 'अनिल' का अर्थ हवा होता है।" },
    { t: "UP GK", q: "उत्तर प्रदेश का राजकीय पुष्प क्या है?", o: ["कमल", "पलाश", "गुलाब", "गेंदा"], a: 1, exp: "उत्तर प्रदेश का राजकीय पुष्प 'पलाश' (टेसू) है, जिसे 2011 में अपनाया गया।" },
    { t: "Gram Samaj", q: "एक बीघा में कितने बिस्वा होते हैं?", o: ["10", "15", "20", "25"], a: 2, exp: "उत्तर प्रदेश में 1 बीघा 20 बिस्वा के बराबर होता है।" }
];

// Generator Engine
testConfigs.forEach(config => {
    for(let setNum = 1; setNum <= config.sets; setNum++) {
        let testArray = [];
        for(let qNum = 1; qNum <= config.qs; qNum++) {
            if(config.id === 'lekhpal' && setNum === 1 && qNum <= realLekhpalQs.length) {
                testArray.push(realLekhpalQs[qNum-1]);
            } else {
                testArray.push({ 
                    t: `${config.title}`, q: `Question No. ${qNum}`, o: ["A", "B", "C", "D"], a: 0, exp: "This is a detailed explanation for this generated question."
                });
            }
        }
        mockDatabase[`${config.id}_set_${setNum}`] = testArray;
    }
});

// --- THEME LOGIC (Dark Mode) ---
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    let isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

window.onload = () => { 
    if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
    loadMaterials('lekhpal', document.querySelector('.cat-btn')); 
    renderTestSeriesDashboard(); 
};

// --- APP UI LOGIC --- (Tab switching, loading materials, open PDF)
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
function closePDF() { document.getElementById('pdf-viewer').style.display = 'none'; }


// --- MOCK TEST UI GENERATOR ---
function renderTestSeriesDashboard() {
    let dashboardHtml = "";
    testConfigs.forEach(config => {
        dashboardHtml += `
        <div style="background: ${config.bg}; padding: 10px; border-radius: 10px; margin-bottom: 15px;">
            <h3 style="margin: 0; color: ${config.text};">${config.icon} ${config.title}</h3>
            <p style="margin: 5px 0 10px 0; font-size: 12px; color: #4B5563;">${config.qs} Qs | ${config.time} Mins</p>
            <div style="display: flex; flex-direction: column;">`;
        for(let i=1; i<=config.sets; i++) {
            dashboardHtml += `
            <div class="test-card">
                <div><h4>Set - ${i}</h4><span id="badge-${config.id}_set_${i}" class="status-badge">Not Attempted ⏳</span></div>
                <button class="btn" style="background: ${config.text};" onclick="startTest('${config.id}_set_${i}')">Start</button>
            </div>`;
        }
        dashboardHtml += `</div></div>`;
    });
    document.getElementById('test-dashboard-container').innerHTML = dashboardHtml;
    checkTestProgress();
}

function checkTestProgress() {
    testConfigs.forEach(config => {
        for(let i=1; i<=config.sets; i++) {
            let tid = `${config.id}_set_${i}`;
            if(localStorage.getItem('completed_' + tid)) {
                let badge = document.getElementById('badge-' + tid);
                if(badge) { badge.innerText = "Completed ✅"; badge.classList.add('completed'); }
            }
        }
    });
}

let activeTestId = "", currentTest = [], currentQuestionIndex = 0, userAnswers = [];

function startTest(testId) {
    activeTestId = testId; currentTest = mockDatabase[testId];
    currentQuestionIndex = 0; userAnswers = new Array(currentTest.length).fill(null); 
    document.getElementById('test-dashboard').style.display = 'none';
    document.getElementById('quiz-engine').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    let qData = currentTest[currentQuestionIndex];
    document.getElementById('topic-badge').innerText = qData.t;
    document.getElementById('q-counter').innerText = `Q: ${currentQuestionIndex + 1}/${currentTest.length}`;
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('progress-fill').style.width = ((currentQuestionIndex + 1) / currentTest.length) * 100 + "%";
    
    let optionsHtml = '';
    qData.o.forEach((opt, index) => {
        let isSelected = userAnswers[currentQuestionIndex] === index ? 'background: #E0E7FF; border: 2px solid var(--primary);' : 'background: #E5E7EB; border: 2px solid transparent;';
        optionsHtml += `<button style="width: 100%; margin-top: 10px; color: #1F2937; text-align: left; padding: 12px; font-weight: 500; border-radius: 8px; transition: 0.2s; ${isSelected}" onclick="selectAnswer(${index})">${opt}</button>`;
    });
    document.getElementById('options-container').innerHTML = optionsHtml;

    let nextBtn = document.getElementById('next-btn');
    if (currentQuestionIndex === currentTest.length - 1) {
        nextBtn.innerText = "Submit Test ✔️"; nextBtn.style.background = "#10B981"; 
    } else {
        nextBtn.innerText = "Next ➡"; nextBtn.style.background = "var(--primary)";
    }
}

function selectAnswer(optIndex) { userAnswers[currentQuestionIndex] = optIndex; loadQuestion(); }
function nextQuestion() {
    if (currentQuestionIndex < currentTest.length - 1) { currentQuestionIndex++; loadQuestion(); } 
    else { calculateResult(); }
}
function prevQuestion() { if (currentQuestionIndex > 0) { currentQuestionIndex--; loadQuestion(); } }

function calculateResult() {
    let correct = 0, wrong = 0, unattempted = 0;
    
    for (let i = 0; i < currentTest.length; i++) {
        if(userAnswers[i] === null) unattempted++;
        else if (userAnswers[i] === currentTest[i].a) correct++;
        else wrong++;
    }

    // Negative Marking Logic (+1 for Correct, -0.25 for Wrong)
    let finalScore = correct - (wrong * 0.25);
    if(finalScore < 0) finalScore = 0;

    localStorage.setItem('completed_' + activeTestId, 'true');
    document.getElementById('quiz-engine').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    
    document.getElementById('score-text').innerText = `${finalScore.toFixed(2)} / ${currentTest.length}`;
    document.getElementById('score-message').innerText = `✅ Correct: ${correct} | ❌ Wrong: ${wrong} | ⏳ Skipped: ${unattempted}`;
}

// --- SOLUTIONS ENGINE ---
function showSolutions() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('solution-screen').style.display = 'block';
    
    let solHtml = "";
    currentTest.forEach((qData, index) => {
        let userAns = userAnswers[index];
        let isCorrect = userAns === qData.a;
        let isSkipped = userAns === null;
        
        let statusTag = isSkipped ? "<span style='color:orange;'>Skipped</span>" : (isCorrect ? "<span class='sol-correct'>✅ Correct</span>" : "<span class='sol-wrong'>❌ Wrong</span>");
        
        let userText = isSkipped ? "Not Attempted" : qData.o[userAns];
        let correctText = qData.o[qData.a];

        solHtml += `
        <div class="sol-card">
            <h4>Q${index+1}. ${qData.q}</h4>
            <div>Status: ${statusTag}</div>
            <div style="font-size: 13px; color: #6B7280; margin-top: 5px;">Your Answer: ${userText}</div>
            <div style="font-size: 13px; color: #10B981; font-weight: bold;">Right Answer: ${correctText}</div>
            <div class="sol-exp"><b>Explanation:</b><br>${qData.exp}</div>
        </div>`;
    });
    document.getElementById('solutions-container').innerHTML = solHtml;
}

function closeSolutions() {
    document.getElementById('solution-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
}

function closeTest() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('test-dashboard').style.display = 'block';
    checkTestProgress(); 
}
