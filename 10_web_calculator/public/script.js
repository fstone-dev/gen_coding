document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');
    let currentDisplay = '0';
    let shouldResetDisplay = false; // New state variable

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) {
            return;
        }

        const type = target.dataset.type;
        const action = target.dataset.action;
        const value = target.dataset.value;

        if (type === 'number') {
            if (shouldResetDisplay || currentDisplay === '0' || currentDisplay === 'Error') {
                currentDisplay = value;
                shouldResetDisplay = false;
            } else {
                currentDisplay += value;
            }
        } else if (type === 'operator') {
            if (shouldResetDisplay) {
                shouldResetDisplay = false;
            }
            const lastChar = currentDisplay.slice(-1);
            if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
                // Do nothing if the last character is already an operator
                return;
            }
            currentDisplay += ` ${value} `;
        } else if (action === 'clear') {
            currentDisplay = '0';
            shouldResetDisplay = false;
        } else if (action === 'delete') {
            if (currentDisplay === 'Error') {
                currentDisplay = '0';
                shouldResetDisplay = false;
            } else if (currentDisplay.length === 1 || currentDisplay === '0') {
                currentDisplay = '0';
                shouldResetDisplay = false;
            } else {
                currentDisplay = currentDisplay.slice(0, -1).trim();
                if (currentDisplay.length === 0) {
                    currentDisplay = '0';
                }
            }
        } else if (action === 'equals') {
            try {
                // Replace '×' with '*' and '÷' with '/' for evaluation
                const expression = currentDisplay.replace(/×/g, '*').replace(/÷/g, '/');
                const result = new Function('return ' + expression)();
                currentDisplay = result.toString();
                shouldResetDisplay = true; // Set to true after successful calculation
            } catch (error) {
                currentDisplay = 'Error';
                shouldResetDisplay = true; // Also reset after an error
            }
        }

        display.textContent = currentDisplay;
    });
});
