// --- 1. STUDY MATERIAL DATABASE ---
const materialDB = {
    'lekhpal': { 'Hindi Vyakaran': [{ chapter: 'वर्णमाला और समास', link: '#' }] },
    'police': { 'UP Police Constable': [{ chapter: 'PYQ Set 1 (Hindi)', link: '#' }] },
    'ssc': { 'SSC CGL': [{ chapter: 'CGL Tier 1 English', link: '#' }] }
};

// --- 2. UNIVERSAL TEST-SERIES GENERATOR ---
// Aap yahan koi bhi naya exam add karenge, app apne aap uske mock test bana degi!
const testConfigs = [
    { id: 'lekhpal', title: 'UP Lekhpal PYQ Series', qs: 100, time: 120, sets: 10, bg: '#E0E7FF', text: '#4F46E5', icon: '📝' },
    { id: 'police', title: 'UP Police PYQ Series', qs: 150, time: 120, sets: 10, bg: '#FEF3C7', text: '#D97706', icon: '🚔' },
    { id: 'ssc_cgl', title: 'SSC CGL Tier-1 Series', qs: 100, time: 60, sets: 10, bg: '#FCE7F3', text: '#BE185D', icon: '🎓' },
    { id: 'ssc_gd', title: 'SSC GD Constable Series', qs: 80, time: 60, sets: 10, bg: '#D1FAE5', text: '#047857', icon: '🛡️' }
];

const mockDatabase = {};

// Generator Engine
testConfigs.forEach(config => {
    for(let setNum = 1; setNum <= config.sets; setNum++) {
        let testArray = [];
        for(let qNum = 1; qNum <= config.qs; qNum++) {
            testArray.push({ 
                t: `${config.title} Section`, 
                q: `${config.title} (Set ${setNum}) - Question No. ${qNum}`, 
                o: ["Option A", "Option B", "Option C", "Option D"], 
                a: Math.floor(Math.random() * 4) // Random answer generate karega (0, 1, 2 ya 3)
            });
        }
        mockDatabase[`${config.id}_set_${setNum}`] = testArray;
    }
});


// --- 3. APP UI LOGIC ---
window.onload = () => { 
    loadMaterials('lekhpal', document.querySelector('.cat-btn')); 
    renderTestSeriesDashboard(); 
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

// --- 4. MOCK TEST UI GENERATOR ---
function renderTestSeriesDashboard() {
    let dashboardHtml = "";
    
    // Config ke hisaab se sabhi exams ke cards apne aap banayega
    testConfigs.forEach(config => {
        dashboardHtml += `
        <div style="background: ${config.bg}; padding: 10px; border-radius: 10px; margin-bottom: 15px;">
            <h3 style="margin: 0; color: ${config.text};">${config.icon} ${config.title}</h3>
            <p style="margin: 5px 0 10px 0; font-size: 12px; color: #4B5563;">${config.qs} Questions | ${config.time} Mins</p>
            <div style="display: flex; flex-direction: column;">`;
        
        for(let i=1; i<=config.sets; i++) {
            dashboardHtml += `
            <div class="test-card">
                <div>
                    <h4>PYQ Set - ${i}</h4>
                    <span id="badge-${config.id}_set_${i}" class="status-badge">Not Attempted ⏳</span>
                </div>
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
    let score = 0;
    for (let i = 0; i < currentTest.length; i++) {
        if (userAnswers[i] === currentTest[i].a) score++;
    }
    localStorage.setItem('completed_' + activeTestId, 'true');
    document.getElementById('quiz-engine').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score-text').innerText = `${score} / ${currentTest.length}`;
    
    let percent = (score / currentTest.length) * 100;
    document.getElementById('score-message').innerText = percent >= 80 ? "Excellent Preparation! 🔥" : (percent >= 50 ? "Good, but needs revision. 👍" : "Work Harder! You can do it. 📚");
}

function closeTest() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('test-dashboard').style.display = 'block';
    checkTestProgress(); 
}
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
