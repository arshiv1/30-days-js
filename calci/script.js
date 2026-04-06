
let numbers = document.querySelectorAll(".number");
let ops = document.querySelectorAll(".operator");
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");
let equals = document.querySelector(".equals");
let togglebtn = document.querySelector(".toggle");
let lightModeBtn = document.querySelector(".lightmode-btn");
let darkModeBtn = document.querySelector(".darkmode-btn");


class Calculator{
    constructor(){
        this.resetScreen = false;
        this.previousOperand = "";
        this.currentOperator = "";
        this.currentOperand = "";
    }

    chooseOperand(number){
        if(this.resetScreen){
            this.currentOperand = "";
            this.resetScreen = false;
        }
        if(number === '.'){
            if(this.currentOperand.includes('.'))return; 
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
        // document.querySelector(".input-field").value = `${previousOperand} ${currentOperator} ${currentOperand}`;
        this.updateDisplay();
    }

    chooseOperator(operator){
        if(this.currentOperand === "")return;

        if(this.previousOperand != ""){
            this.compute();
        }
        this.currentOperator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        this.updateDisplay();
    }


    calculateMath(){
        if(this.previousOperand === "" || this.currentOperand === "")return;


        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        let result;

        switch (this.currentOperator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                if (curr === 0) {
                    alert("Cannot divide by zero");
                    return;
                }
                result = prev / curr;
                break;

            case '%':
                result = prev % curr;
                break;

            default:
                return;
        }

        return parseFloat(result.toFixed(8));
    }


    compute(){
    
        let result = this.calculateMath();
        if(result === undefined)return;

        this.currentOperand = result.toString();
        this.currentOperator = "";
        this.previousOperand = "";
        this.resetScreen = true;
        this.updateDisplay();
    }

    deleteOne(){
        if(this.currentOperand !== ""){
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        this.updateDisplay();
    }

    clearDisplay(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.currentOperator = "";
        this.updateDisplay();
    }

    toggle(){
        if(this.currentOperand === "")return;
        let temp = parseFloat(this.currentOperand);
        temp = -1*temp;
        this.currentOperand = temp.toString();
        this.updateDisplay();
    }

    updateDisplay = () =>{
        document.querySelector(".input-field").value = `${this.previousOperand} ${this.currentOperator} ${this.currentOperand}`;

        if(this.previousOperand !== "" && this.currentOperand !== "" && this.currentOperator!== ""){
            let result = this.calculateMath();
            if(result === undefined)return;
            document.querySelector(".output-div").innerText = `${result}`;
        }
        else{
            document.querySelector(".output-div").innerText = `${this.currentOperand}`;
        }
    }
};

const calculator = new Calculator();

numbers.forEach(button => {
    button.addEventListener('click', (event)=>{
        let clickedNum = event.target.innerText;

        calculator.chooseOperand(clickedNum);
    });
});

ops.forEach(op => {
    op.addEventListener('click', (event)=>{
        let clickedOp = event.target.innerText;

        calculator.chooseOperator(clickedOp);
    });
});

clear.addEventListener('click', ()=>{
    calculator.clearDisplay();
});

del.addEventListener('click', ()=>{
    calculator.deleteOne();
});

equals.addEventListener('click', ()=>{
    calculator.compute();
});

togglebtn.addEventListener('click', ()=>{
    calculator.toggle();
});


lightModeBtn.addEventListener('click', () =>{
    document.querySelector(".calculator-wrapper").classList.add("light-theme");
});

darkModeBtn.addEventListener('click', ()=>{
    document.querySelector(".calculator-wrapper").classList.remove("light-theme");
});
