// (async () => {
let clientsArray = [];
// const section = document.querySelector('#section');
const clientsTable = document.querySelector('#clientsTable');
const addClientBtn = document.querySelector('#addClientBtn');
const toLocalFormat = new Intl.DateTimeFormat("ru");

const loadingSVG = `
    <svg class="table__svg" width="100" height="100" viewBox="0 0 100 100" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_121_2401)">
      <path
        d="M14.0002 50.0005C14.0002 69.8825 30.1182 86.0005 50.0002 86.0005C69.8822 86.0005 86.0002 69.8825 86.0002 50.0005C86.0002 30.1185 69.8823 14.0005 50.0003 14.0005C45.3513 14.0005 40.9082 14.8815 36.8282 16.4865"
        stroke="#9873FF" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round"></path>
    </g>
  </svg>
  `;
const addClientSVG = `
<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="Vector"
            d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"/>
        </svg>
  `;
const editCliendSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="edit" opacity="0.7" clip-path="url(#clip0_216_219)">
<path id="Vector" d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/>
</g>
<defs>
<clipPath id="clip0_216_219">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const deleteClientSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="cancel" opacity="0.7" clip-path="url(#clip0_216_224)">
<path id="Vector" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
</g>
<defs>
<clipPath id="clip0_216_224">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

`;
//очистка таблицы
function cleanTable() {
  if (!clientsTable) {
    return;
  }
  clientsTable.replaceChildren();
}

//функция отрисовки загрузки таблицы
function loadingRow(text = loadingSVG) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');

  cell.classList.add('table__loading');
  cell.setAttribute('colspan', '6');
  cell.innerHTML = text;

  row.append(cell);
  clientsTable.append(row);
};

//получение данных с сервера
async function getClientsArray() {
  cleanTable();
  loadingRow();
  addClientBtn.classList.add('visually-hidden');
  const response = await fetch(`http://localhost:3000/api/clients`);
  clientsArray = await response.json();
  return clientsArray;
}

//отправка данных на сервер
async function createClientServer(client) {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify({
      name: client.name,
      surname: client.surname,
      lastName: client.lastName,
      contacts: client.contacts, //[{}]
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const newClient = await response.json();
  console.log('sending newStudent to server', newClient);
  return newClient;
}

//*рендер
function renderClientsTable(clientsArray) {
  cleanTable();
  addClientBtn.classList.remove('visually-hidden');
  console.log('render');
  if (!clientsArray.length) {
    loadingRow('');
  } else {
    // sortingArray(clientsArray)
    clientsArray.forEach(element => {
      renderClient(element, handlers);
    });
  }
}

//обработка нажатия кнопок
const handlers = {
  onChange({ clientElement }) {
    // renderModalForm(clientElement);
  },
  onDelete({ clientObj, element }) {
    if (!confirm('Вы уверены?')) {
      return;
    };
    element.remove();
    fetch(`http://localhost:3000/api/clients/${clientObj.id}`, {
      method: 'DELETE',
    });
  },
}

//*создание функции отрисовки всех клиентов
function renderClient(objClient, { onChange, onDelete }) {
  const $row = document.createElement('tr');
  const $clientsId = document.createElement('td');
  const $fullname = document.createElement('td');
  const $createdAt = document.createElement('td');
  const $createdAtTime = document.createElement('span');
  const $updatedAt = document.createElement('td');
  const $updatedAtTime = document.createElement('span');
  const $contacts = document.createElement('td');
  const $actionBtns = document.createElement('td');
  const $changeBtn = document.createElement('button');
  const $deleteBtn = document.createElement('button');

  $row.classList.add('row');
  $clientsId.classList.add('row__descr', 'row__descr-light', 'row__descr-light--id');
  $fullname.classList.add('row__descr');
  $createdAt.classList.add('row__descr');
  $createdAtTime.classList.add('row__descr', 'row__descr-light');
  $updatedAt.classList.add('row__descr');
  $updatedAtTime.classList.add('row__descr', 'row__descr-light');
  $actionBtns.classList.add('row__descr', 'row__descr--btn')
  $changeBtn.classList.add('btn', 'row__btn');
  $deleteBtn.classList.add('btn', 'row__btn');

  $clientsId.textContent = objClient.id;
  $fullname.textContent = `${objClient.surname} ${objClient.name} ${objClient.lastName}`;
  $createdAt.textContent = toLocalFormat.format(new Date(objClient.createdAt));
  $updatedAt.textContent = toLocalFormat.format(new Date(objClient.updatedAt));
  createdAtDate = new Date(objClient.createdAt);
  updatedAtDate = new Date(objClient.updatedAt);
  $createdAtTime.textContent = `${createdAtDate.getHours()}:${createdAtDate.getMinutes()}`;
  $updatedAtTime.textContent = `${updatedAtDate.getHours()}:${updatedAtDate.getMinutes()}`;

  $changeBtn.innerHTML = `${editCliendSVG} Изменить`;
  $deleteBtn.innerHTML = `${deleteClientSVG} Удалить`;

  $createdAt.append($createdAtTime);
  $updatedAt.append($updatedAtTime);
  $actionBtns.append($changeBtn, $deleteBtn);
  $row.append($clientsId, $fullname, $createdAt, $updatedAt, $contacts, $actionBtns);

  clientsTable.append($row);

  //слухачи на кнопки
  $deleteBtn.addEventListener('click', () => {
    onDelete({ studentObj });
    // refreshStudentList();
  });
  //? сделать без асинхронности (увести в другую функцию? вряд ли=( ), должна будет быть отрисовка модульного окна в зависимости от нажатия на ту или иную кнопку
  $changeBtn.addEventListener('click', async (e) => {
    // modal.showModal();
    // isModalOpen = true;
    // e.stopPropagation();
    // const response = await fetch(`http://localhost:3000/api/clients/${clientObj.id}`);
    // clientElement = await response.json();
    onChange({ clientElement });
  });
}

//------создание кнопки добавления клиента
// function addClientBtn() {
//   const $btn = document.createElement('button');
//   $btn.classList.delete('visually-hidden');
//   $btn.id = 'addClientBtn';
//   $btn.classList.add('btn', 'content__btn');
//   $btn.innerHTML = `${addClientSVG} Добавить клиента`;
//   section.append($btn);

//   return $btn;
// }


//функция отрисовки поля контакты

//*модальные окна
let isModalOpen = false;
const modal = document.querySelector('#modal');
const modalBox = document.querySelectorAll('.modal');

//Реагирование на нажатие кнопок
addClientBtn.addEventListener('click', (e) => {
  let path = e.currentTarget.getAttribute('data-path');
  document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
  modal.classList.add('modal-overlay--visible');
});

// modal.addEventListener('click', (e) => {
//   console.log(e.target);
//   if (e.target == modal) {
//     modal.classList.remove('modal-overlay--visible');
//     // modalBox.forEach((el) => {
//     //   el.classList.remove('modal--visible');
//     // })
//     modalBox.classList.remove('modal--visible');

//   }
// })



//отрисовка модального окна Добавление
// const $dialog = document.createElement('div');
// $dialog.classList.add = ('modal-overlay');

function createModalAddClient() {
  // const saveBtn = document.querySelector('#saveBtn');
  const surname = document.querySelector('#surname');
  const name = document.querySelector('#name');
  const lastName = document.querySelector('#lastname');
  const contactType = document.querySelectorAll('#contact-type');
  const contactData = document.querySelectorAll('#contact-input');
  const addContact = document.querySelector('#addContactBtn');

  const $formBox = document.querySelector('#contacts-form');

  // const $form = document.createElement('form');
  // $form.classList.add = ('modal-contacts__form');

  // const $dialog = document.createElement('div');
  // $dialog.id = 'modal';
  // $dialog.classList.add = ('modal-overlay');

  // const $modal = document.createElement('div');
  // $modal.id = 'modal-box';
  // $modal.classList.add = ('modal');
  // $modal.dataset.target = 'addClient';

  // const $inputsField = document.createElement('div');
  // $inputsField.classList.add = ('modal-box', 'modal__input');
  // const $title = document.createElement('h5');
  // $title.classList.add = ('title', 'modal__title');
  // const $closeBtn = document.createElement('button');
  // $closeBtn.classList.add = ('btn', 'modal__close-btn');
  // const $form = document.createElement('form');
  // $form.classList.add = ('modal__form', 'modal-form');


  // const $contactsField = document.createElement('div');
  // $contactsField.classList.add = ('modal__contacts', 'modal-contacts', 'modal-contacts--form');


  // const $btnField = document.createElement('div');
  // $btnField.classList.add = ('modal-box', 'modal__btns', 'modal-btns');

  // $dialog.append($modal);
  // $dialog.append($modal);
  console.log('addContact', addContact);

  addContact.addEventListener('click', () => {
    let $form = document.createElement('form');
    if (!$formBox.querySelector('form')) {
      $formBox.prepend($form);
      $form.classList.add = ('modal-contacts__form');

      $formBox.parentElement.classList.remove('modal-contacts--form');
    }
    createContactSelect($form);
  })

  const contacts = [];
  for (i = 0; i < contactData.length; i += 1) {
    contacts.push({
      type: `${contactType[i].value}`,
      value: `${contactData[i].value}`
    })
  }

  const client = {
    name: validateInput(name),
    surname: validateInput(surname),
    lastName: validateInput(lastName),
    contacts: contacts,
  }

  console.log(client);
  return client
}

saveBtn.addEventListener('click', async () => {
  let errorfield = document.querySelector('#errorFiled');
  errorfield.replaceChildren();
  createModalAddClient();

  if (!errorfield.childNodes.length) {
    await createClientServer(createModalAddClient());
    await getClientsArray();
    renderClientsTable(clientsArray);

    modal.classList.remove('modal-overlay--visible');
    modalBox.classList.remove('modal--visible');
  }
})

document.addEventListener('click', (e) => {
  console.log(e.target);
  let btn = e.target.getAttribute('data-btn');
  console.log(btn);

  if (e.target == modal || btn === 'close') {
    modal.classList.remove('modal-overlay--visible');
    modalBox.classList.remove('modal--visible');
  }

  // if (btn === 'createContact') {
  //   if (!$formBox.childNodes.includes($form)) {
  //     $formBox.append($form);
  //     $formBox.parentElement.classList.remove('modal-contacts--form');
  //   }
  //   createContactSelect($form);
  // }
})

function createContactSelect(box) {
  const $select = document.createElement('select');
  const $optionPhone = document.createElement('option');
  const $optionAddPhone = document.createElement('option');
  const $optionEmail = document.createElement('option');
  const $optionVk = document.createElement('option');
  const $optionFacebook = document.createElement('option');
  const $input = document.createElement('input');

  $select.classList.add('modal-contacts__contact-select');
  $select.name = "contact-type";
  $input.classList.add('modal-contacts__input');
  // $select.name = "contact-type";

  $optionPhone.selected = true;

  $optionPhone.value = 'Телефон';
  $optionAddPhone.value = 'Доп.телефон';
  $optionEmail.value = 'email';
  $optionVk.value = 'vk';
  $optionFacebook.value = 'facebook';

  $optionPhone.textContent = 'Телефон';
  $optionAddPhone.textContent = 'Доп.телефон';
  $optionEmail.textContent = 'Email';
  $optionVk.textContent = 'Vk';
  $optionFacebook.textContent = 'Facebook';
  $select.append($optionPhone, $optionAddPhone, $optionEmail, $optionVk, $optionFacebook);
  box.append($select, $input);

}


//*функции валидации input
function validateText(text) {
  let checkedText = false;
  const regexp = /[^а-яА-ЯёЁ\s]/gi;
  if (text.length > 0 && !regexp.test(text)) checkedText = text;
  return checkedText;
};

function textToUpperCase(text) {
  checkedText = '';
  if (text.length > 0)
    checkedText = text[0].toUpperCase() + text.slice(1).toLowerCase();
  return checkedText;
}

function textToLowerCase(text) {
  text = text.toLowerCase();
  return text;
}
//!валидация контактов

// валидация
function validateInput(inputElement) {
  const inputValue = inputElement.value.trim();
  let checkedInput;
  let alertText = '';

  if (inputElement.required) {
    switch (inputElement.type) {
      case 'text':
        checkedInput = validateText(textToUpperCase(inputValue));
        alertText = `Поле ${inputElement.name} не заполнено или заполнено не на русском`;
        break;
    }
  }
  if (!inputElement.required && inputValue) {
    switch (inputElement.type) {
      case 'text':
        checkedInput = validateText(textToUpperCase(inputValue));
        alertText = `Поле ${inputElement.name} не заполнено или заполнено не на русском`;
        break;
    }
  }

  if (!checkedInput) {
    let errorfield = document.querySelector('#errorFiled');
    let alertInput = document.createElement('p');
    alertInput.classList.add('modal-btns__error');
    alertInput.textContent = alertText;
    errorfield.append(alertInput);
  }
  return checkedInput;
}

console.log(clientsArray);

Promise
  .all([getClientsArray()])
  .then(responses => {
    for (let response of responses) {
      console.log(response);
      renderClientsTable(response);
    }
  });
// clientsArray = await getClientsArray();
// renderClientsTable(clientsArray);
console.log(clientsArray);

// });
