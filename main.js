const grid = document.getElementById('table')
let cells 

let level = 1
let lives = 3
let matrix = []
let guesses = []

function display(){

    //Declare all the Variables
	let div, side

	//Set the number of Rows and Columns
	side = computeSideLength(level)
	grid.style.gridTemplateColumns = `repeat(${side}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${side}, 1fr)`;
 
    //Display each Square
    grid.innerHTML = ''
	for (let i = 0; i < Math.pow(side,2); i++) {
        
		div = document.createElement('div')
		div.classList.toggle('tile')

		const x = i
		div.addEventListener('click', () => { cellIsClicked(x) })

		grid.appendChild(div)

	}
	cells = grid.childNodes

}

function computeSideLength(level){
    
    let number = 3
    let side = 2
	while(level > number){

		side++
		number += side

	}

	return side

}

function createRandomSequence(level){
    
    //Declare Variables
	let num, i
	let side = computeSideLength(level)
	let max = Math.pow(side, 2)

    //Set all the Values of the Matrix and Guesses equal to 0
	for (i = 0; i < max; i++) { matrix[i] = 0; guesses[i] = 0 }

    //Generate the Randomized Sequence
    i = 0
	while(i < level){

		num = Math.floor(Math.random() * max)
		if (matrix[num] == 0) { 
			matrix[num] = 1; 
			i++
		}

	}
	
}



function showCell(cell){ cell.style.background = 'grey' }
function hideCell(cell){ cell.style.background = 'white' }
function hideAllCells(){ grid.childNodes.forEach( cell => hideCell(cell) )}
function showAllCells(){ matrix.forEach( (square, i) => { if (square) showCell(cells[i]) } )}

function displayTheSequence(){

    hideAllCells()
    showAllCells()
    setTimeout( hideAllCells, 1000);

}

function hasWon(){
    
    let cardsFlipped = 0
    guesses.forEach( card => { if (card) cardsFlipped++ })
    return (cardsFlipped == level ? true : false)

}
function cellIsClicked(x){

	console.log(x)

    if (guesses[x] == 0) { 

    	if (matrix[x]) { 

    		guesses[x] = 1
            showCell(cells[x])
            if (hasWon()) { nextLevel() }

    	}
    	else {

    		lives--
    		if (lives == 0) { restart() }

    	}

    }

}

function nextLevel(){

	guesses = []
	level++
	setTimeout( hideAllCells, 400 )
	setTimeout( main, 1100 )

}

function restart(){

	guesses = []
	level = 1
	lives = 3
	setTimeout( hideAllCells, 400 )
	setTimeout( main, 1100 )

}

function main(){

	display()
	createRandomSequence(level)
	displayTheSequence()

}

main()


//Make it more Responsive Adjust Table margin top
