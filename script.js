const questions = [
    {
        question: "What are the Five Pillars of Islam?",
        answers: [
            "A) Prayer, Charity, Fasting, Pilgrimage, Declaration of Faith",
            "B) Reading, Writing, Speaking, Learning, Teaching",
            "C) Faith, Hope, Charity, Wisdom, Peace",
            "D) None of the above"
        ],
        correct: 0 // Index of the correct answer
    },
    {
        question: "In which month do Muslims fast?",
        answers: [
            "A) Shawwal",
            "B) Ramadan",
            "C) Rajab",
            "D) Sha'ban"
        ],
        correct: 1
    },
    {
        question: "What is the first chapter of the Quran?",
        answers: [
            "A) Al-Baqarah",
            "B) Al-Ikhlas",
            "C) Al-Fatiha",
            "D) Yasin"
        ],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById("next-button");
    const progressElement = document.getElementById("progress");

    // Update progress
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Display the current question
    questionElement.textContent = questions[currentQuestionIndex].question;
    answersElement.innerHTML = "";

    // Create answer buttons
    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersElement.appendChild(button);
    });

    nextButton.style.display = "none"; // Hide next button initially
}

function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const nextButton = document.getElementById("next-button");
    const feedbackElement = document.getElementById("feedback");

    // Disable all answer buttons
    const buttons = document.querySelectorAll("#answers button");
    buttons.forEach(button => button.disabled = true);

    // Check if the answer is correct
    if (selectedIndex === correctIndex) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
        score++;
    } else {
        feedbackElement.textContent = `Incorrect. The correct answer is: ${questions[currentQuestionIndex].answers[correctIndex]}`;
        feedbackElement.style.color = "red";
    }

    feedbackElement.style.display = "block";
    nextButton.style.display = "block"; // Show next button after answering
}

document.getElementById("next-button").onclick = () => {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.style.display = "none"; // Hide feedback for the next question

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Quiz completed
        alert(`Quiz completed! Your score is ${score} out of ${questions.length}.`);
        currentQuestionIndex = 0; // Reset for next time
        score = 0; // Reset score
        showQuestion();
    }
};

// Start the quiz
showQuestion();

// Feedback form submission
document.getElementById("feedback-form").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const feedbackResponse = document.getElementById("feedback-response");

    // Basic validation
    if (!name || !email || !message) {
        feedbackResponse.textContent = "Please fill out all fields.";
        feedbackResponse.style.color = "red";
        feedbackResponse.style.display = "block";
        return;
    }

    if (!validateEmail(email)) {
        feedbackResponse.textContent = "Please enter a valid email address.";
        feedbackResponse.style.color = "red";
        feedbackResponse.style.display = "block";
        return;
    }

    // Simulate feedback submission (replace with actual API call)
    feedbackResponse.textContent = "Submitting feedback...";
    feedbackResponse.style.color = "blue";
    feedbackResponse.style.display = "block";

    setTimeout(() => {
        feedbackResponse.textContent = `Thank you, ${name}! Your feedback has been submitted.`;
        feedbackResponse.style.color = "green";
        document.getElementById("feedback-form").reset();
    }, 2000); // Simulate a 2-second delay
};

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}