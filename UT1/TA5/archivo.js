function agregarTarjeta() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('hidden'); // Mostrar el modal al apretar "Add new card"

    const saveButton = document.getElementById('guardarTarjeta'); // Obtener el botón "Guardar" del modal
    
    const saveCard = async () => { // Función para guardar la tarjeta
        const cardNameInput = document.getElementById('nombreTarjeta');
        const descriptionInput = document.getElementById('descripcion');
        const assignedToInput = document.getElementById('assignedTo');
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const statusInput = document.getElementById('status');
        const priorityInput = document.getElementById('priority');
        const commentsInput = document.getElementById('comments');
        
        if (!cardNameInput.value || !descriptionInput.value || !assignedToInput.value || !startDateInput.value || !endDateInput.value || !statusInput.value || !priorityInput.value) {
            alert('Por favor, completa todos los campos.'); // Mostrar alerta si algún campo está vacío
            return; // Salir de la función si algún campo está vacío
        }
        
        const cardData = {
            title: cardNameInput.value,
            description: descriptionInput.value,
            assignedTo: assignedToInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            status: statusInput.value,
            priority: priorityInput.value,
            comments: commentsInput.value.split(',').map(comment => comment.trim())
        };

        try {
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cardData)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la tarjeta.');
            }

            overlay.classList.add('hidden'); // Ocultar el modal después de guardar la tarjeta
            limpiarCampos('.overlay input'); // Limpiar los campos del modal después de guardar la tarjeta
            
            const task = await response.json();
            console.log(task);
            await ejemploNode(); // Actualizar las tarjetas en la página
            //location.reload(); // Recargar la página para mostrar la nueva tarjeta
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar la tarjeta. Por favor, inténtalo de nuevo.');
        }

        saveButton.removeEventListener('click', saveCard);
    };

    saveButton.addEventListener('click', saveCard);

    const cancelButton = document.querySelector('.overlay button');
    cancelButton.addEventListener('click', () => {
        overlay.classList.add('hidden'); // Ocultar el modal al presionar "Cancelar"
        limpiarCampos('.overlay input'); // Limpiar los campos del modal al cancelar
    });
}

function agregarBloque(nombreBloque) {
    const ul = document.querySelector('ul'); // Obtiene el elemento ul donde se agregarán los bloques
    
    const nuevoBloque = document.createElement('li'); // Crea un nuevo bloque
    nuevoBloque.classList.add('bloque'); // Agrega la clase bloque al nuevo bloque
    
    const h3 = document.createElement('h3'); // Crea un h3 para el nombre del bloque
    h3.textContent = nombreBloque; // Asigna el nombre del bloque al h3
    
    const tarjetasDiv = document.createElement('div'); // Crea un div para contener las tarjetas
    tarjetasDiv.classList.add('tarjetas'); // Agrega la clase tarjetas al div
    
    const addButton = document.createElement('button'); // Crea un botón para agregar tarjeta
    addButton.textContent = '+ Add new card';
    addButton.classList.add('card-button');
    addButton.addEventListener('click', () => agregarTarjeta(addButton)); // Agrega el evento para agregar tarjeta
    
    nuevoBloque.appendChild(h3); // Agrega el h3 al nuevo bloque
    nuevoBloque.appendChild(tarjetasDiv); // Agrega el div de tarjetas al nuevo bloque
    nuevoBloque.appendChild(addButton); // Agrega el botón Add new card al nuevo bloque
    
    ul.insertBefore(nuevoBloque, ul.lastElementChild); // Inserta el nuevo bloque antes del último elemento de la lista ul
}

const botonAddList = document.getElementById('addList');
botonAddList.addEventListener('click', () => {
    const nombreBloque = prompt("Ingrese el nombre del nuevo bloque:");
    if (nombreBloque) { // Si el usuario ingresó un nombre, agregar el bloque con el nombre ingresado
        agregarBloque(nombreBloque);
    }
});

const botones = document.querySelectorAll('[id^="addCard"]'); // selecciona todos los botones que su ID comienza con "addCard"

botones.forEach(boton => {
    boton.addEventListener('click', () => agregarTarjeta());
});

function limpiarCampos(selector) {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(input => input.value = '');
}

async function ejemploNode() { // función asincrónica para obtener las tareas del servidor
    try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) {
            throw new Error('Error al cargar las tareas');
        }
        const tasks = await response.json(); // espera a que la respuesta sea convertida a JSON
        console.log(tasks); // muestra las tareas en la consola

        cleanColumns(); // limpiar las columnas antes de agregar las tarjetas
        
        tasks.forEach(task => {
            let bloque;
            switch (task.status) {
                case 'To Do':
                    bloque = document.querySelector('.bloque:nth-of-type(1) .tarjetas'); // se obtiene el primer elemento con la clase bloque que contiene las tarjetas
                    break;
                case 'In Progress':
                    bloque = document.querySelector('.bloque:nth-of-type(2) .tarjetas'); // se obtiene el segundo elemento con la clase bloque que contiene las tarjetas
                    break;
                case 'Done':
                    bloque = document.querySelector('.bloque:nth-of-type(3) .tarjetas'); // se obtiene el tercer elemento con la clase bloque que contiene las tarjetas
                    break;
                default:
                    console.error(`Estado desconocido: ${task.status}`);
                    return;
            }
            
            if (bloque) { // si se encontró el bloque correspondiente, agregar la tarjeta con sus botones de editar y eliminar
                const cardContainer = document.createElement('div');
                cardContainer.classList.add('card-container');

                const card = document.createElement('button');
                card.classList.add('tarjetas');
                card.textContent = task.title;

                const editButton = document.createElement('button');
                editButton.textContent = '✎';
                editButton.classList.add('editDeleteButtons');
                editButton.addEventListener('click', () => editarTarjeta(task));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '🗑️';
                deleteButton.classList.add('editDeleteButtons');
                deleteButton.addEventListener('click', () => eliminarTarjeta(task));

                cardContainer.appendChild(card);
                cardContainer.appendChild(editButton);
                cardContainer.appendChild(deleteButton);

                bloque.appendChild(cardContainer);
                bloque.appendChild(document.createElement('br'));
                card.addEventListener('click', () => mostrarModalTarjeta(task));
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

ejemploNode();

function cleanColumns() {
    const columns = document.querySelectorAll('.tarjetas');
    columns.forEach(column => {
        column.innerHTML = '';
    });
}

function mostrarModalTarjeta(tarjeta) {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
  
    document.getElementById('tituloModal').textContent = 'Título: ' + tarjeta.title;
    document.getElementById('descripcionModal').textContent = 'Descripción: ' + tarjeta.description;
    document.getElementById('assignedToModal').textContent = 'Asignado a: ' + tarjeta.assignedTo;
    document.getElementById('startDateModal').textContent = 'Fecha de inicio: ' + tarjeta.startDate;
    document.getElementById('endDateModal').textContent = 'Fecha de fin: ' + tarjeta.endDate;
    document.getElementById('statusModal').textContent = 'Estado: ' + tarjeta.status;
    document.getElementById('priorityModal').textContent = 'Prioridad: ' + tarjeta.priority;
    document.getElementById('commentsModal').textContent = 'Comentarios: ' + tarjeta.comments.join(', ');  

    const closeButton = document.getElementById('botonCancelar2');
    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

async function editarTarjeta(tarjeta) { // función asincrónica para editar una tarjeta
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('hidden'); // muestra el modal de edición

    const saveButton = document.getElementById('guardarTarjeta');
    saveButton.textContent = 'Guardar cambios';

    const cardNameInput = document.getElementById('nombreTarjeta');
    cardNameInput.value = tarjeta.title;

    const descriptionInput = document.getElementById('descripcion');
    descriptionInput.value = tarjeta.description;

    const assignedToInput = document.getElementById('assignedTo');
    assignedToInput.value = tarjeta.assignedTo;

    const startDateInput = document.getElementById('startDate');
    startDateInput.value = tarjeta.startDate;

    const endDateInput = document.getElementById('endDate');
    endDateInput.value = tarjeta.endDate;

    const statusInput = document.getElementById('status');
    statusInput.value = tarjeta.status;

    const priorityInput = document.getElementById('priority');
    priorityInput.value = tarjeta.priority;

    const commentsInput = document.getElementById('comments');
    commentsInput.value = tarjeta.comments.join(', ');

    const saveCard = async () => { // función para guardar los cambios en la tarjeta
        if (!cardNameInput.value || !descriptionInput.value || !assignedToInput.value || !startDateInput.value || !endDateInput.value || !statusInput.value || !priorityInput.value){
            alert('Por favor, completa todos los campos.');
            return;
        }

        const cardData = {
            title: cardNameInput.value,
            description: descriptionInput.value,
            assignedTo: assignedToInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            status: statusInput.value,
            priority: priorityInput.value,
            comments: commentsInput.value.split(',').map(comment => comment.trim())
        };

        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${tarjeta.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cardData)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la tarjeta.');
            }

            overlay.classList.add('hidden');
            limpiarCampos('.overlay input');

            await ejemploNode(); // Actualiza las tarjetas en el cliente
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar la tarjeta. Por favor, inténtalo de nuevo.');
        }
    };

    saveButton.removeEventListener('click', saveCard);
    saveButton.addEventListener('click', saveCard);

    const cancelButton = document.getElementById('botonCancelar');
    cancelButton.addEventListener('click', () => {
        overlay.classList.add('hidden');
        limpiarCampos('.overlay input');
    });
}

async function eliminarTarjeta(tarjeta) { // función asincrónica para eliminar una tarjeta
    if (confirm('¿Estás seguro de que deseas eliminar esta tarjeta?')) {
        const idTarea = tarjeta.id;
        console.log('ID de la tarjeta a eliminar:', idTarea);
        console.log('Tarjeta a eliminar:', tarjeta);

        // Eliminar la tarjeta en el servidor
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${idTarea}`, { // Enviar una solicitud DELETE al servidor
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la tarjeta.');
            }

            const data = await response.text(); // leer como texto en vez de JSON

            if (data.trim() !== '') { // verifica que la respuesta no esté vacía
                const jsonData = JSON.parse(data); // analiza el texto como JSON y lo convierte en un objeto JavaScript
                console.log(jsonData); // muestra el objeto en la consola
            }

            // Actualizar las tarjetas en el Trello
            await ejemploNode();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al eliminar la tarjeta. Por favor, inténtalo de nuevo.');
        }
    }
}