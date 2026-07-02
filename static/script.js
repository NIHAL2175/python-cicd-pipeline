class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.memory = 0;
        this.shouldResetScreen = false;
        
        this.currentOperandElement = document.getElementById('current-operand');
        this.memoryIndicatorElement = document.getElementById('memory-indicator');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Button click events
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => {
                this.handleButtonClick(button);
            });
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (value) {
            this.appendNumber(value);
        } else if (action) {
            this.handleAction(action);
        }
    }

    handleKeyboardInput(e) {
        e.preventDefault();
        
        const key = e.key;
        
        // Numbers and decimal
        if (/[0-9.]/.test(key)) {
            this.appendNumber(key);
        }
        // Basic operators
        else if (['+', '-', '*', '/'].includes(key)) {
            const operatorMap = {
                '+': 'add',
                '-': 'subtract',
                '*': 'multiply',
                '/': 'divide'
            };
            this.handleAction(operatorMap[key]);
        }
        // Enter or equals
        else if (key === 'Enter' || key === '=') {
            this.handleAction('equals');
        }
        // Backspace
        else if (key === 'Backspace') {
            this.handleAction('delete');
        }
        // Escape or clear
        else if (key === 'Escape') {
            this.handleAction('clear');
        }
        // Percentage
        else if (key === '%') {
            this.handleAction('percent');
        }
        // Square root
        else if (key === 'r' || key === 'R') {
            this.handleAction('sqrt');
        }
        // Square
        else if (key === 's' || key === 'S') {
            this.handleAction('square');
        }
        // Reciprocal
        else if (key === 'i' || key === 'I') {
            this.handleAction('reciprocal');
        }
        // Plus/Minus toggle
        else if (key === 'n' || key === 'N') {
            this.handleAction('plus-minus');
        }
        // Clear Entry
        else if (key === 'e' || key === 'E') {
            this.handleAction('ce');
        }
        // Memory functions
        else if (key === 'm' || key === 'M') {
            // Check for modifier keys for different memory functions
            if (e.ctrlKey) {
                this.handleAction('mc'); // Ctrl+M for Memory Clear
            } else if (e.shiftKey) {
                this.handleAction('mr'); // Shift+M for Memory Recall
            } else if (e.altKey) {
                this.handleAction('ms'); // Alt+M for Memory Store
            } else {
                this.handleAction('m-plus'); // Just M for Memory Add
            }
        }
        // Memory Subtract (Alt+Shift+M)
        else if (key === 'M' && e.altKey && e.shiftKey) {
            this.handleAction('m-minus');
        }
        // Memory View (Ctrl+Shift+M)
        else if (key === 'M' && e.ctrlKey && e.shiftKey) {
            this.handleAction('mv');
        }
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }

        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Handle "00" button
        if (number === '00') {
            if (this.currentOperand === '0') {
                this.currentOperand = '0';
            } else {
                this.currentOperand += '00';
            }
        }
        // Handle single "0"
        else if (number === '0') {
            if (this.currentOperand === '0') return;
            if (this.currentOperand === '') {
                this.currentOperand = '0';
            } else {
                this.currentOperand += number;
            }
        }
        // Handle other numbers
        else {
            if (this.currentOperand === '0') {
                this.currentOperand = number;
            } else {
                this.currentOperand += number;
            }
        }

        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.chooseOperation(action);
                break;
            case 'equals':
                this.compute();
                break;
            case 'percent':
                this.percentage();
                break;
            case 'sqrt':
                this.squareRoot();
                break;
            case 'square':
                this.square();
                break;
            case 'reciprocal':
                this.reciprocal();
                break;

            case 'ce':
                this.clearEntry();
                break;
            case 'mc':
                this.memoryClear();
                break;
            case 'mr':
                this.memoryRecall();
                break;
            case 'm-plus':
                this.memoryAdd();
                break;
            case 'm-minus':
                this.memorySubtract();
                break;
            case 'ms':
                this.memoryStore();
                break;
            case 'ac':
                this.allClear();
                break;
        }
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = this.formatNumber(computation);
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.currentOperand = this.formatNumber(current / 100);
        this.updateDisplay();
    }

    squareRoot() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        if (current < 0) {
            this.showError('Cannot calculate square root of negative number');
            return;
        }
        
        this.currentOperand = this.formatNumber(Math.sqrt(current));
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    square() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.currentOperand = this.formatNumber(current * current);
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    reciprocal() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        if (current === 0) {
            this.showError('Cannot divide by zero');
            return;
        }
        
        this.currentOperand = this.formatNumber(1 / current);
        this.shouldResetScreen = true;
        this.updateDisplay();
    }



    clearEntry() {
        this.currentOperand = '0';
        this.shouldResetScreen = false;
        this.updateDisplay();
    }

    // Memory functions
    memoryClear() {
        this.memory = 0;
        this.showMemoryStatus('Memory cleared');
    }

    memoryRecall() {
        this.currentOperand = this.formatNumber(this.memory);
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    memoryAdd() {
        const current = parseFloat(this.currentOperand);
        if (!isNaN(current)) {
            this.memory += current;
            this.showMemoryStatus('Added to memory');
        }
    }

    memorySubtract() {
        const current = parseFloat(this.currentOperand);
        if (!isNaN(current)) {
            this.memory -= current;
            this.showMemoryStatus('Subtracted from memory');
        }
    }

    memoryStore() {
        const current = parseFloat(this.currentOperand);
        if (!isNaN(current)) {
            this.memory = current;
            this.showMemoryStatus('Stored in memory');
        }
    }

    allClear() {
        this.clear();
        this.memory = 0;
        this.showMemoryStatus('All cleared');
    }

    formatNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        // Update memory indicator
        if (this.memory !== 0) {
            this.memoryIndicatorElement.textContent = 'M';
        } else {
            this.memoryIndicatorElement.textContent = '';
        }
    }

    showError(message) {
        this.currentOperandElement.textContent = message;
        this.currentOperandElement.classList.add('error');
        
        setTimeout(() => {
            this.currentOperandElement.classList.remove('error');
            this.currentOperand = '0';
            this.updateDisplay();
        }, 2000);
    }

    showMemoryStatus(message) {
        const status = document.createElement('div');
        status.textContent = message;
        status.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 14px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(status);
        
        setTimeout(() => {
            status.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(status);
            }, 300);
        }, 1500);
    }
}

// Add CSS animations for memory status
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
}); 