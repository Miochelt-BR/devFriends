
function addField() {
    const form = document.getElementById('dynamic-form');

  
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Novo Campo';

   
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => {
        form.removeChild(inputField);
        form.removeChild(removeButton);
    });

    
    form.appendChild(inputField);
    form.appendChild(removeButton);
}


document.getElementById('add-field-btn').addEventListener('click', addField);
