const container = document.querySelector(".container");
const sizeSlider = document.querySelector('#size-slider');
const buttons = document.querySelectorAll('button');
const sizeValue = document.querySelector('#size-value')

const setGridSize = (gridSize) => {
    container.innerHTML = '';

    for (let i = 0; i < gridSize ** 2; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add('grid-item');
        container.appendChild(gridItem);
    }
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const activeMode = e.target.textContent;
        console.log(activeMode);

        if (activeMode !== "Clear") {
            buttons.forEach((btn) => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        }

        const gridItems = document.querySelectorAll('.grid-item');

        if (activeMode === "Color Mode") {
            gridItems.forEach((gridItem) => {
                gridItem.addEventListener('mouseover', () => {
                    const selectedColor = getColorPickerValue();
                    gridItem.style.backgroundColor = selectedColor;
                })
            })
        } else if (activeMode === "Rainbow Mode") {
            gridItems.forEach((gridItem) => {
                gridItem.addEventListener('mouseover', () => {
                    const selectedColor = getRandomColor();
                    gridItem.style.backgroundColor = selectedColor;
                })
            })
        } else if (activeMode === "Eraser") {
            gridItems.forEach((gridItem) => {
                gridItem.addEventListener('mouseover', () => {
                    const selectedColor = eraseColor();
                    gridItem.style.backgroundColor = selectedColor;
                })
            })
        } else if (activeMode === "Clear") {
            gridItems.forEach((gridItem) => {
                gridItem.style.backgroundColor = '#ccc';
            })
        }
    })
})

const getColorPickerValue = () => {
    const colorPickerValue = document.querySelector('#color-picker').value;
    return colorPickerValue;
}

const getRandomColor = () => {
    const randomColor = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)}
    )`;
    return randomColor;
}

const eraseColor = () => {
    return '#ccc'
}


sizeSlider.addEventListener('input', () => {
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });

    const gridSize = sizeSlider.value;
    setGridSize(gridSize);
    updateSizeValue(gridSize);
})

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

setGridSize(sizeSlider.value)