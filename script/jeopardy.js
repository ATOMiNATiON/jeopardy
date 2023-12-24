//-----------------------------------------------------------------------------
// Adam Wu
// 2023 December 23
// game.js
// Javascript file to trigger which button has been clicked to 
// pull questions and show the questions on client-end.
// Also shows answer and updates score. Questions are pulled from questions.json
//-----------------------------------------------------------------------------

class JeopardyGame {
    constructor(categories, pointValues, jsonDataPath) {
        this.categories = categories;
        this.pointValues = pointValues;
        this.jsonDataPath = jsonDataPath;
        this.jeopardyBoard = document.getElementById('jeopardy-board');
        this.score = 0;
        this.scoreElement = document.getElementById('score');
    }

    createButtons() {
        for (const category of this.categories) {
            const categorySection = document.createElement('section');
            categorySection.className = 'point-category';

            for (const value of this.pointValues) {
                const button = document.createElement('button');
                button.className = 'jpButton';
                button.type = 'button';
                button.textContent = value;

                // add a unique identifier to each button
                button.id = `${category}-${value}`;

                // Add event listener for button click
                button.addEventListener('click', (event) => this.handleButtonClick(event, category, value));

                categorySection.appendChild(button);
            }

            this.jeopardyBoard.appendChild(categorySection);
        }
    }

    handleButtonClick(event, category, value) {
        const button = event.currentTarget;
        console.log(`Button clicked - Category: ${category}, Value: ${value}`);

        // change the backgroundColor
        button.style.backgroundColor = '#a6a6a6';

        // Fetch the corresponding question from the JSON file
        fetch(this.jsonDataPath)
            .then(response => response.json())
            .then(data => {
                const question = this.getQuestion(data, category, value);

                // Display the question using an alert (you can replace this with a custom modal)
                alert(`Category: ${category}\nValue: ${value}\n\nQuestion: ${question.question}`);

                // Add your logic for handling user input and checking the answer
                const userAnswer = prompt('Your answer:');
                this.checkAnswer(userAnswer, question.answer, value);
            })
            .catch(error => console.error('Error fetching question data:', error));
    }

    getQuestion(data, category, value) {
        // Find and return the corresponding question from the JSON data
        const categoryData = data.categories.find(cat => cat.name === category);
        return categoryData.questions.find(q => q.value === value);
    }

    checkAnswer(userAnswer, correctAnswer, value) {
        // Add your logic for checking the user's answer against the correct answer
        // You can implement scoring, track correct/incorrect answers, etc.
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            alert('Correct!');
            this.score += value;
            this.updateScore();
        } else {
            alert('Incorrect. The correct answer is: ' + correctAnswer);
        }
    }

    updateScore() {
        // Update the score element in the HTML
        this.scoreElement.textContent = 'Score: ' + this.score;
    }
}

