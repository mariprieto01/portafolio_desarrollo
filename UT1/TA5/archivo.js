function agregarInput(cardInputId) {
    const input = document.getElementById(cardInputId);
    input.classList.remove('hidden');

    const addButton = document.createElement('button');
    addButton.textContent = 'Agregar Tarjeta';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'X Cancelar';

    const parentDiv = input.parentElement;
    parentDiv.appendChild(addButton);
    parentDiv.appendChild(cancelButton);

    addButton.addEventListener('click', () => {
        const card = document.createElement('div');
        card.textContent = input.value;
        card.classList.add('card');
        parentDiv.insertBefore(card, input);
        input.classList.add('hidden');
        addButton.remove();
        cancelButton.remove();
    });

    cancelButton.addEventListener('click', () => {
        input.classList.add('hidden');
        addButton.remove();
        cancelButton.remove();
    });
}

const boton1 = document.getElementById('addCard1');
boton1.addEventListener('click', () => agregarInput('cardInput1'));

const boton2 = document.getElementById('addCard2');
boton2.addEventListener('click', () => agregarInput('cardInput2'));

const boton3 = document.getElementById('addCard3');
boton3.addEventListener('click', () => agregarInput('cardInput3'));

