const puzzleboard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
let submission = []
const square = 81;

// create the empty puzzleboard
for (let i = 0; i < square; i++) {
  const inputElement = document.createElement('input')
  inputElement.setAttribute('type','number')
  inputElement.setAttribute('min','1')
  inputElement.setAttribute('max','9')
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.add("color-section")
  }
  puzzleboard.appendChild(inputElement)
}

// send all the input into a array
const joinValues = () => {
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    if (input.value) {
      submission.push(input.value)
    }
    else {
      submission.push('.')
    }
  }) 
}

// fill in the puzzleboard with solutions
const populateValues = (response) => {
  const inputs = document.querySelectorAll('input')
  const solution = document.querySelector('#solution')
  if (response.solution && response.solvable) {
    inputs.forEach( (input,i) => {
      input.value = response.solution[i]
    })
    solution.innerHTML = "Congrats! Psuedo is solvable!"
  }
  else {
    solution.innerHTML = "Sorry! It seems the psuedo is not solvable! Please try different input!"
  }
}

const solve = () => {

  joinValues()

  const data = {numbers:submission.join('')}

  console.log(data)

  // security purposes
  fetch('http://localhost:8000/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }) .then(response => response.json())
     .then(data => {
      console.log(data)
      populateValues(data)
    })
     .catch((error) => {
      console.error('Error:', error)
     })
}

solveButton.addEventListener("click", solve)
