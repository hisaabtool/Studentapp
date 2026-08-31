// --- 1. REAL MOCK TEST DATABASE (PYQs Only) ---
const testSeries = {
    'lekhpal': {
        title: 'UP Lekhpal PYQ Series',
        timeMins: 30, // 30 Mins Timer
        tests: [
            {
                id: 'lek_set_1',
                name: 'PYQ Set 1 (25 Qs Real Paper)',
                qs: [
                    { t: "Hindi", q: "'आग' का पर्यायवाची कौन सा है?", o: ["अनल", "अनिल", "सलिल", "गगन"], a: 0, exp: "'अनल' का अर्थ आग है, 'अनिल' का अर्थ हवा है।" },
                    { t: "Hindi", q: "जिसके समान कोई दूसरा न हो?", o: ["अद्वितीय", "अतुलनीय", "अजेय", "अदृश्य"], a: 0, exp: "अद्वितीय का अर्थ है जिसके जैसा कोई और न हो।" },
                    { t: "Hindi", q: "महोदय का संधि विच्छेद क्या है?", o: ["महो+दय", "महा+उदय", "मही+उदय", "महा+औदय"], a: 1, exp: "महा + उदय = महोदय (गुण संधि)।" },
                    { t: "Hindi", q: "'आँख का तारा' मुहावरे का अर्थ?", o: ["दुश्मन", "बहुत प्यारा", "आँख में दर्द", "तारा देखना"], a: 1, exp: "आँख का तारा होना यानि अत्यधिक प्रिय होना।" },
                    { t: "Hindi", q: "समास के कितने भेद होते हैं?", o: ["4", "5", "6", "8"], a: 2, exp: "समास के 6 मुख्य भेद होते हैं।" },
                    { t: "Gram Samaj", q: "एक बीघा में कितने बिस्वा होते हैं?", o: ["10", "15", "20", "25"], a: 2, exp: "1 बीघा = 20 बिस्वा (उत्तर प्रदेश में)।" },
                    { t: "Gram Samaj", q: "किसान बही योजना कब लागू हुई?", o: ["1990", "1992", "1995", "1998"], a: 1, exp: "उत्तर प्रदेश में किसान बही 1992 में शुरू हुई।" },
                    { t: "Gram Samaj", q: "चकबंदी विभाग का प्रमुख कौन होता है?", o: ["लेखपाल", "कानूनगो", "चकबंदी आयुक्त", "तहसीलदार"], a: 2, exp: "चकबंदी विभाग का सर्वोच्च अधिकारी चकबंदी आयुक्त होता है।" },
                    { t: "Gram Samaj", q: "मनरेगा योजना कब शुरू हुई?", o: ["2005", "2006", "2008", "2010"], a: 1, exp: "2 फरवरी 2006 को नरेगा की शुरुआत हुई थी।" },
                    { t: "Gram Samaj", q: "भू-मापन में 'जरीब' क्या है?", o: ["कर", "नापने की जंजीर", "जमीन का प्रकार", "अधिकारी"], a: 1, exp: "जरीब भूमि मापने की एक लोहे की जंजीर होती है।" },
                    { t: "UP GK", q: "उत्तर प्रदेश का राजकीय पुष्प क्या है?", o: ["कमल", "पलाश", "गुलाब", "गेंदा"], a: 1, exp: "पलाश (टेसू) राजकीय पुष्प है।" },
                    { t: "UP GK", q: "चौरी-चौरा कांड किस जिले में हुआ था?", o: ["देवरिया", "गोरखपुर", "कुशीनगर", "बलिया"], a: 1, exp: "गोरखपुर के चौरी-चौरा में 4 फरवरी 1922 को यह घटना हुई थी।" },
                    { t: "UP GK", q: "ताजमहल किस नदी के किनारे है?", o: ["गंगा", "यमुना", "सरस्वती", "गोमती"], a: 1, exp: "ताजमहल आगरा में यमुना नदी के तट पर है।" },
                    { t: "UP GK", q: "UP का सबसे बड़ा जिला (क्षेत्रफल)?", o: ["प्रयागराज", "लखीमपुर खीरी", "सोनभद्र", "सीतापुर"], a: 1, exp: "लखीमपुर खीरी यूपी का क्षेत्रफल में सबसे बड़ा जिला है।" },
                    { t: "UP GK", q: "उत्तर प्रदेश में लोकसभा सीटें कितनी हैं?", o: ["80", "75", "85", "403"], a: 0, exp: "उत्तर प्रदेश में सर्वाधिक 80 लोकसभा सीटें हैं।" }
                    // Yahan aap baaki 10 question add kar sakte hain
                ]
            }
        ]
    },
    'police': {
        title: 'UP Police PYQ Series',
        timeMins: 30,
        tests: [
            {
                id: 'pol_set_1',
                name: 'Police Practice Set 1',
                qs: [
                    { t: "GK", q: "भारतीय संविधान में कुल कितनी अनुसूचियां हैं?", o: ["8", "10", "12", "14"], a: 2, exp: "वर्तमान में 12 अनुसूचियां हैं (मूल संविधान में 8 थीं)।" },
                    { t: "Reasoning", q: "यदि A=1, B=2 है, तो CAB का मान?", o: ["5", "6", "7", "8"], a: 1, exp: "C(3) + A(1) + B(2) = 6" },
                    { t: "Hindi", q: "जिसका कोई शत्रु न हो?", o: ["अजातशत्रु", "मित्र", "सहयोगी", "अजेय"], a: 0, exp: "अजातशत्रु का अर्थ है जिसका कोई दुश्मन पैदा न हुआ हो।" }
                ]
            }
        ]
    }
};

const materialDB = {
    'lekhpal': { 'Gram Samaj Notes': [{ chapter: 'कृषि एवं भूमि मापन', link: '#' }] },
    'police': { 'Hindi Notes': [{ chapter: 'UP Police Vyakaran', link: '#' }] }
};

// --- THEME ---
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

window.onload = () => { 
    if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
    loadMaterials('lekhpal', document.querySelector('.cat-btn')); 
};

function switchTab(tabId, title, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.getElementById(tabId).classList.add('active-section');
    element.classList.add('active');
    document.getElementById('app-title').innerText = title;
}

// --- MOCK TEST NAVIGATION ---
let activeExam = "", activeTestId = "", currentTest = [], currentQuestionIndex = 0;
let userAnswers = [], questionStatus = []; // status: 0=not visited, 1=answered, 2=not answered
let timerInterval = null, timeLeft = 0;

function showTestList(examKey) {
    activeExam = examKey;
    document.getElementById('mock-category-screen').style.display = 'none';
    document.getElementById('mock-list-screen').style.display = 'block';
    document.getElementById('selected-exam-title').innerText = testSeries[examKey].title;
    
    let html = "";
    testSeries[examKey].tests.forEach(test => {
        let badge = localStorage.getItem('comp_' + test.id) ? `<span style="color:#10B981; font-size:12px; font-weight:bold;">✅ Completed</span>` : `<span style="color:#EF4444; font-size:12px;">⏳ Not Attempted</span>`;
        html += `
        <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
            <div><h3 style="margin:0 0 5px 0;">${test.name}</h3>${badge}</div>
            <button class="btn" onclick="startExam('${test.id}')">Start Test</button>
        </div>`;
    });
    document.getElementById('test-list-container').innerHTML = html;
}

function backToCategories() {
    document.getElementById('mock-list-screen').style.display = 'none';
    document.getElementById('mock-category-screen').style.display = 'block';
}

function startExam(testId) {
    activeTestId = testId;
    currentTest = testSeries[activeExam].tests.find(t => t.id === testId).qs;
    currentQuestionIndex = 0;
    userAnswers = new Array(currentTest.length).fill(null);
    questionStatus = new Array(currentTest.length).fill(0); // 0 = not visited
    questionStatus[0] = 2; // first question visited but not answered yet

    document.getElementById('mock-list-screen').style.display = 'none';
    document.getElementById('quiz-engine').style.display = 'block';
    
    // Start Timer
    timeLeft = testSeries[activeExam].timeMins * 60;
    startTimer();
    
    buildPalette();
    loadQuestion();
}

// --- TIMER LOGIC ---
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        document.getElementById('timer').innerText = `${m}:${s < 10 ? '0'+s : s}`;
        if(timeLeft <= 0) { clearInterval(timerInterval); submitExamPrompt(true); } // Auto Submit
    }, 1000);
}

// --- EXAM ENGINE LOGIC ---
function buildPalette() {
    let html = "";
    for(let i=0; i<currentTest.length; i++) {
        html += `<div class="q-circle" id="pal-${i}" onclick="jumpToQuestion(${i})">${i+1}</div>`;
    }
    document.getElementById('q-palette').innerHTML = html;
}

function updatePaletteUI() {
    for(let i=0; i<currentTest.length; i++) {
        let pal = document.getElementById(`pal-${i}`);
        pal.className = "q-circle";
        if(questionStatus[i] === 1) pal.classList.add("answered");
        else if(questionStatus[i] === 2) pal.classList.add("not-answered");
        if(i === currentQuestionIndex) pal.classList.add("active");
    }
}

function loadQuestion() {
    let qData = currentTest[currentQuestionIndex];
    document.getElementById('q-number-display').innerText = currentQuestionIndex + 1;
    document.getElementById('topic-badge').innerText = qData.t;
    document.getElementById('question-text').innerText = qData.q;
    
    let optionsHtml = '';
    qData.o.forEach((opt, index) => {
        let isSel = userAnswers[currentQuestionIndex] === index ? 'selected' : '';
        optionsHtml += `<button class="option-btn ${isSel}" onclick="selectAnswer(${index})">${opt}</button>`;
    });
    document.getElementById('options-container').innerHTML = optionsHtml;
    
    let nxtBtn = document.getElementById('save-next-btn');
    if(currentQuestionIndex === currentTest.length - 1) nxtBtn.innerText = "Save"; else nxtBtn.innerText = "Save & Next ➡";
    
    updatePaletteUI();
}

function selectAnswer(optIndex) {
    userAnswers[currentQuestionIndex] = optIndex;
    loadQuestion();
}

function clearResponse() {
    userAnswers[currentQuestionIndex] = null;
    questionStatus[currentQuestionIndex] = 2; // Mark not answered
    loadQuestion();
}

function saveAndNext() {
    // Status update based on if answer selected
    if(userAnswers[currentQuestionIndex] !== null) questionStatus[currentQuestionIndex] = 1;
    else questionStatus[currentQuestionIndex] = 2;

    if (currentQuestionIndex < currentTest.length - 1) {
        currentQuestionIndex++;
        if(questionStatus[currentQuestionIndex] === 0) questionStatus[currentQuestionIndex] = 2; // mark visited
        loadQuestion();
    } else {
        updatePaletteUI();
    }
}

function jumpToQuestion(index) {
    if(userAnswers[currentQuestionIndex] !== null) questionStatus[currentQuestionIndex] = 1;
    else if(questionStatus[currentQuestionIndex] === 0) questionStatus[currentQuestionIndex] = 2;
    
    currentQuestionIndex = index;
    if(questionStatus[currentQuestionIndex] === 0) questionStatus[currentQuestionIndex] = 2;
    loadQuestion();
}

function submitExamPrompt(isAuto = false) {
    if(isAuto || confirm("Are you sure you want to final submit the exam?")) {
        clearInterval(timerInterval);
        calculateResult();
    }
}

function calculateResult() {
    let correct = 0, wrong = 0, unattempted = 0;
    for (let i = 0; i < currentTest.length; i++) {
        if(userAnswers[i] === null) unattempted++;
        else if (userAnswers[i] === currentTest[i].a) correct++;
        else wrong++;
    }
    let finalScore = correct - (wrong * 0.25);
    if(finalScore < 0) finalScore = 0;

    localStorage.setItem('comp_' + activeTestId, 'true');
    document.getElementById('quiz-engine').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score-text').innerText = `${finalScore.toFixed(2)} / ${currentTest.length}`;
    document.getElementById('score-message').innerText = `✅ Correct: ${correct} | ❌ Wrong: ${wrong} | ⏳ Skipped: ${unattempted}`;
}

// --- SOLUTIONS ---
function showSolutions() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('solution-screen').style.display = 'block';
    
    let html = "";
    currentTest.forEach((qData, i) => {
        let uAns = userAnswers[i];
        let status = uAns === null ? "<span style='color:orange;'>Skipped</span>" : (uAns === qData.a ? "<span class='sol-correct'>✅ Correct</span>" : "<span class='sol-wrong'>❌ Wrong</span>");
        let uTxt = uAns === null ? "Not Attempted" : qData.o[uAns];
        let cTxt = qData.o[qData.a];

        html += `
        <div class="sol-card">
            <h4>Q${i+1}. ${qData.q}</h4><div>Status: ${status}</div>
            <div style="font-size: 13px; color: #6B7280; margin-top: 5px;">Your Answer: ${uTxt}</div>
            <div style="font-size: 13px; color: #10B981; font-weight: bold;">Right Answer: ${cTxt}</div>
            <div class="sol-exp"><b>Explanation:</b><br>${qData.exp}</div>
        </div>`;
    });
    document.getElementById('solutions-container').innerHTML = html;
}

function closeSolutions() {
    document.getElementById('solution-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
}

function closeTest() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('mock-category-screen').style.display = 'block';
}

// PDF functions (Keep old)
function loadMaterials(e, el) { /* Keep old logic for study material */ }
