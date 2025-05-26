// Carousel
const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80"
];
let currentImg = 0;
const carouselImg = document.getElementById('carousel-img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carousel-dots');

function updateCarousel() {
    carouselImg.src = images[currentImg];
    // Dots
    dotsContainer.innerHTML = '';
    images.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (idx === currentImg ? ' active' : '');
        dot.onclick = () => { currentImg = idx; updateCarousel(); };
        dotsContainer.appendChild(dot);
    });
}
prevBtn.onclick = () => {
    currentImg = (currentImg - 1 + images.length) % images.length;
    updateCarousel();
};
nextBtn.onclick = () => {
    currentImg = (currentImg + 1) % images.length;
    updateCarousel();
};
updateCarousel();

// Quiz
const quizData = [
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Style Syntax",
            "Colorful Style Sheets"
        ],
        answer: 0
    },
    {
        question: "Which HTML tag is used for JavaScript?",
        options: [
            "<js>",
            "<javascript>",
            "<script>",
            "<code>"
        ],
        answer: 2
    },
    {
        question: "Which is a JavaScript framework?",
        options: [
            "Laravel",
            "React",
            "Django",
            "Bootstrap"
        ],
        answer: 1
    }
];
let quizIndex = 0, score = 0;
const quizContainer = document.getElementById('quiz-container');

function showQuizQuestion() {
    if (quizIndex >= quizData.length) {
        showQuizResult();
        return;
    }
    const q = quizData[quizIndex];
    quizContainer.innerHTML = `
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
            ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
        </div>
        <div class="quiz-result" id="quiz-result"></div>
    `;
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.onclick = function() {
            const idx = Number(this.getAttribute('data-idx'));
            const result = document.getElementById('quiz-result');
            if (idx === q.answer) {
                result.textContent = "Correct! 🎉";
                result.style.color = "#22c55e";
                score++;
            } else {
                result.textContent = "Oops! Try next.";
                result.style.color = "#ef4444";
            }
            document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
            // Add Next or See Result button
            const nextBtn = document.createElement('button');
            nextBtn.className = "quiz-next";
            if (quizIndex < quizData.length - 1) {
                nextBtn.textContent = "Next";
                nextBtn.onclick = () => {
                    quizIndex++;
                    showQuizQuestion();
                };
            } else {
                nextBtn.textContent = "See Result";
                nextBtn.onclick = showQuizResult;
            }
            result.appendChild(nextBtn);
        };
    });
}
function showQuizResult() {
    quizContainer.innerHTML = `
        <div class="quiz-result" style="font-size:1.3rem;">
            You scored <b>${score}</b> out of <b>${quizData.length}</b>!<br>
            <button class="quiz-next" id="restart-quiz">Restart Quiz</button>
        </div>
    `;
    document.getElementById('restart-quiz').onclick = function() {
        quizIndex = 0; score = 0; showQuizQuestion();
    };
}
showQuizQuestion();

// API Fetch (Joke)
const jokeBtn = document.getElementById('joke-btn');
const jokeDisplay = document.getElementById('joke-display');
jokeBtn.onclick = async function() {
    jokeDisplay.textContent = "Loading...";
    try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await res.json();
        jokeDisplay.innerHTML = `<b>${data.setup}</b><br>${data.punchline}`;
    } catch {
        jokeDisplay.textContent = "Couldn't fetch a joke. Try again!";
    }
};