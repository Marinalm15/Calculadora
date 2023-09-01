const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("buttons-container");

class Calculator {
    constructor(previousOperationText, currentOperationText) { 
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit) {

        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    processOperaation(operation) {
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            if(this.previousOperationText.innerText === "") {
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue
        const previous = +this.previousOperationText.innerText.split("0")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
                
        }

    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        if(operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
        } else {
            if(previous === 0) {
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    chengeOperation(operation) {
        const mathOperations = ["*", "-", "/", "+"]

        if(!mathOperations.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator() {
        const operation = previousOperationText.innerText.split("")[1];
        this.processOperaation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperaation(value);
        }
    });
});