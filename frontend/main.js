// (async () => {
let clientsArray = [];
// const section = document.querySelector('#section');
const clientsTable = document.querySelector('#clientsTable');
const addClientBtn = document.querySelector('#addClientBtn');
const toLocalFormat = new Intl.DateTimeFormat("ru");

const loadingSVG = `
<svg 
  class="table__svg" 
  width="100" 
  height="100" 
  viewBox="0 0 100 100" 
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_121_2401)">
    <path
      d="M14.0002 50.0005C14.0002 69.8825 30.1182 86.0005 50.0002 86.0005C69.8822 86.0005 86.0002 69.8825 86.0002 50.0005C86.0002 30.1185 69.8823 14.0005 50.0003 14.0005C45.3513 14.0005 40.9082 14.8815 36.8282 16.4865"
      stroke="#9873FF" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round" 
    />
  </g>
</svg>
`;

const addClientSVG = `
<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path 
    id="Vector" 
    d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"
  />
</svg>
`;

const editClientSVG = `
<svg 
  width="16" 
  height="16" 
  viewBox="0 0 16 16" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="edit" opacity="0.7" clip-path="url(#clip0_216_219)">
    <path 
      id="Vector" 
      d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"
    />
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
    <path 
      id="Vector" 
      d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"
    />
  </g>
  <defs>
    <clipPath id="clip0_216_224">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;

const contactsType = [
  'Телефон',
  'Доп.телефон',
  'Email',
  'Vk',
  'Facebook',
]
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

//изменение данных на серверe
async function editClientServer(client, id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
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
  onDelete({ objClient, element }) {
    if (!confirm('Вы уверены?')) {
      return;
    };
    element.remove();
    fetch(`http://localhost:3000/api/clients/${objClient.id}`, {
      method: 'DELETE',
    });
  },
}

//*создание функции отрисовки всех клиентов
function renderClient(objClient) {
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

  $createdAtTime.textContent = getTime(objClient.createdAt);
  $updatedAtTime.textContent = getTime(objClient.updatedAt);;

  $changeBtn.innerHTML = `${editClientSVG} Изменить`;
  $deleteBtn.innerHTML = `${deleteClientSVG} Удалить`;

  $createdAt.append($createdAtTime);
  $updatedAt.append($updatedAtTime);
  $actionBtns.append($changeBtn, $deleteBtn);
  $row.append($clientsId, $fullname, $createdAt, $updatedAt, $contacts, $actionBtns);

  clientsTable.append($row);

  //слухачи на кнопки
  $deleteBtn.addEventListener('click', () => {
    createModalDeleteClient(objClient, $row);
    // refreshStudentList();
  });
  //? сделать без асинхронности (увести в другую функцию? вряд ли=( ), должна будет быть отрисовка модульного окна в зависимости от нажатия на ту или иную кнопку
  $changeBtn.addEventListener('click', async (e) => {
    const response = await fetch(`http://localhost:3000/api/clients/${objClient.id}`);
    const clientElement = await response.json();
    createModalEditClient(clientElement);
    // onChange({ clientElement });
  });
}

function getTime(objTime) {
  date = new Date(objTime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours.toString().length === 1 ? `0${hours}` : hours;
  minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
}


//функция отрисовки поля контакты


//*модальные окна
let isModalOpen = false;
const modal = document.querySelector('#modal');

//Реагирование на нажатие кнопок
//модальное окно создания нового клиента (чистить окно и создавать новое в идеале)
addClientBtn.addEventListener('click', (e) => {
  createModalAddClient();
  // let errorfield = document.querySelector('#errorField');
  // errorfield.replaceChildren();
  // let path = e.currentTarget.getAttribute('data-path');
  // document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
  // modal.classList.add('modal-overlay--visible');
});

//модальное окно создания
function createModalAddClient() {
  // modalBox.classList.add('modal--visible');
  modal.classList.add('modal-overlay--visible');

  const $modal = document.createElement('div');
  //блоки модального окна
  const $inputField = document.createElement('div');
  const $contactsField = document.createElement('div');
  const $btnField = document.createElement('div');
  //форма для клиента ФИО
  const $title = document.createElement('h5');
  const $closeBtn = document.createElement('button');
  const $formInput = document.createElement('form');
  const $labelSurname = document.createElement('label');
  const $inputSurname = document.createElement('input');
  const $pSurname = document.createElement('p');
  // const $spanSurname = document.createElement('span');

  const $labelName = document.createElement('label');
  const $inputName = document.createElement('input');
  const $pName = document.createElement('p');
  // const $spanName = document.createElement('span');

  const $labelLastName = document.createElement('label');
  const $inputLastName = document.createElement('input');
  const $pLastName = document.createElement('p');
  // const $spanLastName = document.createElement('span');
  //форма для контактов
  const $contactsForm = document.createElement('div');
  const $addContactBtn = document.createElement('button');
  //блок кнопок и ошибок
  const $errorField = document.createElement('div');
  const $saveContactBtn = document.createElement('button');
  const $declineContactBtn = document.createElement('button');


  //блоки модального окна
  modal.append($modal);
  $modal.append($inputField, $contactsField, $btnField);
  //форма для клиента ФИО
  $inputField.append($title, $closeBtn, $formInput);
  $formInput.append($labelSurname, $labelName, $labelLastName);
  $labelSurname.append($inputSurname, $pSurname);
  $labelName.append($inputName, $pName);
  $labelLastName.append($inputLastName, $pLastName);

  // $pSurname.append($spanSurname);
  // $pName.append($spanName);
  // $pLastName.append($spanLastName);
  //форма для контактов
  $contactsField.append($contactsForm);
  $contactsForm.append($addContactBtn);
  //блок кнопок и ошибок
  $btnField.append($errorField, $saveContactBtn, $declineContactBtn);

  //блоки модального окна
  $modal.classList.add('modal', 'modal--visible');
  $inputField.classList.add('modal-box', 'modal__input');
  $contactsField.classList.add('modal__contacts', 'modal-contacts', 'modal-contacts--form');
  $btnField.classList.add('modal-box', 'modal__btns', 'modal-btns');
  //форма для клиента ФИО
  $title.classList.add('title', 'modal__title');
  $closeBtn.classList.add('btn', 'modal__close-btn');
  $formInput.classList.add('modal__form', 'modal-form');
  $labelSurname.classList.add('modal-form__label');
  $labelName.classList.add('modal-form__label');
  $labelLastName.classList.add('modal-form__label');
  $inputSurname.classList.add('modal-form__input');
  $inputName.classList.add('modal-form__input');
  $inputLastName.classList.add('modal-form__input');
  $pSurname.classList.add('modal-form__placeholder', 'modal-form__placeholder--invalid');
  $pName.classList.add('modal-form__placeholder', 'modal-form__placeholder--invalid');
  $pLastName.classList.add('modal-form__placeholder', 'modal-form__placeholder--invalid');
  // $spanSurname.classList.add('modal-form__placeholder-star');
  // $spanName.classList.add('modal-form__placeholder-star');
  // $spanLastName.classList.add('modal-form__placeholder-star');

  //форма для контактов
  $contactsForm.classList.add('modal-box', 'modal-contacts__box');
  $addContactBtn.classList.add('btn', 'modal-contacts__addbtn');
  //блок кнопок и ошибок
  $errorField.classList.add('modal-btns__error-field');
  $errorField.id = 'errorField';
  $saveContactBtn.classList.add('btn', 'modal-btns__primary');
  $declineContactBtn.classList.add('btn', 'modal-btns__decline');

  //форма для клиента ФИО
  $title.textContent = 'Новый клиент';
  $pSurname.innerHTML = `Фамилия
  <span class="modal-form__placeholder-star">*</span>`;
  $pName.innerHTML = `Имя
  <span class="modal-form__placeholder-star">*</span>`;
  $pLastName.innerHTML = `Отчество`;
  $inputSurname.name = 'Фамилия';
  $inputName.name = 'Имя';
  $inputLastName.name = 'Отчество';
  $inputSurname.type = 'text';
  $inputName.type = 'text';
  $inputLastName.type = 'text';
  $inputSurname.required = true;
  $inputName.required = true;
  //форма для контактов
  $addContactBtn.textContent = 'Добавить контакт';
  //блок кнопок и ошибок
  $saveContactBtn.textContent = 'Сохранить';
  $declineContactBtn.textContent = 'Отмена';
  //data*
  $closeBtn.dataset.btn = 'close';
  $declineContactBtn.dataset.btn = 'close';
  //убирать placeholder если появились символы в инпуте
  $formInput.addEventListener('input', (e) => {
    placeInputPlaceholder(e.target, e.target.nextSibling);
  })

  //добавление контактов
  $addContactBtn.addEventListener('click', () => {
    if (!$contactsForm.querySelector('form')) {
      const $form = document.createElement('form');
      $form.classList.add('modal-contacts__form');
      $contactsForm.prepend($form);
      console.log('$formBox', $contactsForm);
      $contactsForm.parentElement.classList.remove('modal-contacts--form');
    }
    $form = $contactsForm.querySelector('form');
    console.log('создаём поле для контакта');
    createContactSelect($form);
  })

  $saveContactBtn.addEventListener('click', async () => {
    console.log('click - save');
    let errorfield = document.querySelector('#errorField');
    errorfield.replaceChildren();
    //!вытащить в отдельную функцию
    const contactData = document.querySelectorAll('#contact-input');
    const contactType = document.querySelectorAll('#contact-type');
    const contacts = [];
    for (i = 0; i < contactData.length; i += 1) {
      contacts.push({
        type: `${contactType[i].value}`,
        value: `${contactData[i].value}`
      })
    }
    //!
    let client = {
      surname: validateInput($inputSurname),
      name: validateInput($inputName),
      lastName: validateInput($inputLastName),
      contacts: contacts,
    }
    console.log(client);
    console.log('!errorfield.childNodes.length', !errorfield.childNodes.length);

    if (!errorfield.childNodes.length) {

      await createClientServer(client);
      await getClientsArray();
      closeModal();
      renderClientsTable(clientsArray);

    }
  })

}

//модальное окно удаления
function createModalDeleteClient(objClient, element) {
  modal.classList.add('modal-overlay--visible');

  const $modal = document.createElement('div');
  //блоки модального окна
  const $notifyField = document.createElement('div');
  const $btnField = document.createElement('div');
  //текстовое поле
  const $title = document.createElement('h5');
  const $closeBtn = document.createElement('button');
  const $pNotify = document.createElement('p');
  const $deleteContactBtn = document.createElement('button');
  const $declineContactBtn = document.createElement('button');

  modal.append($modal);
  $modal.append($notifyField, $btnField);
  $notifyField.append($title, $closeBtn, $pNotify);
  $btnField.append($deleteContactBtn, $declineContactBtn);

  //текстовое поле
  $modal.classList.add('modal', 'modal--visible');
  $notifyField.classList.add('modal-box', 'modal__notify');
  $btnField.classList.add('modal-box', 'modal__btns', 'modal-btns');
  $title.classList.add('title', 'modal__title', 'modal__title--delete');
  $pNotify.classList.add('modal__notify-text');
  $closeBtn.classList.add('btn', 'modal__close-btn');
  //блок кнопок и ошибок
  $deleteContactBtn.classList.add('btn', 'modal-btns__primary');
  $declineContactBtn.classList.add('btn', 'modal-btns__decline');
  //текстовое поле
  $title.textContent = 'Удалить клиента';
  $pNotify.textContent = 'Вы действительно хотите удалить данного клиента?';

  //блок кнопок и ошибок
  $deleteContactBtn.textContent = 'Удалить';
  $declineContactBtn.textContent = 'Отмена';
  //data*
  $closeBtn.dataset.btn = 'close';
  $declineContactBtn.dataset.btn = 'close';

  //удаление контакта
  $deleteContactBtn.addEventListener('click', async () => {
    element.remove();
    fetch(`http://localhost:3000/api/clients/${objClient.id}`, {
      method: 'DELETE',
    });
    closeModal();
  })
}

//модальное окно изменения
function createModalEditClient(objClient) {
  modal.classList.add('modal-overlay--visible');

  const $modal = document.createElement('div');
  //блоки модального окна
  const $inputField = document.createElement('div');
  const $contactsField = document.createElement('div');
  const $btnField = document.createElement('div');
  //форма для клиента ФИО
  const $title = document.createElement('h5');
  const $spanId = document.createElement('span');
  const $closeBtn = document.createElement('button');
  const $formInput = document.createElement('form');
  const $labelSurname = document.createElement('label');
  const $inputSurname = document.createElement('input');
  const $pSurname = document.createElement('p');
  const $spanSurname = document.createElement('span');

  const $labelName = document.createElement('label');
  const $inputName = document.createElement('input');
  const $pName = document.createElement('p');
  const $spanName = document.createElement('span');

  const $labelLastName = document.createElement('label');
  const $inputLastName = document.createElement('input');
  const $pLastName = document.createElement('p');
  const $spanLastName = document.createElement('span');
  //форма для контактов
  const $contactsForm = document.createElement('div');
  const $addContactBtn = document.createElement('button');
  //блок кнопок и ошибок
  const $errorField = document.createElement('div');
  const $saveContactBtn = document.createElement('button');
  const $deleteContactBtn = document.createElement('button');

  //блоки модального окна
  modal.append($modal);
  $modal.append($inputField, $contactsField, $btnField);
  //форма для клиента ФИО
  $inputField.append($title, $spanId, $closeBtn, $formInput);
  $formInput.append($labelSurname, $labelName, $labelLastName);
  $labelSurname.append($inputSurname, $pSurname);
  $labelName.append($inputName, $pName);
  $labelLastName.append($inputLastName, $pLastName);

  $pSurname.append($spanSurname);
  $pName.append($spanName);
  $pLastName.append($spanLastName);
  //форма для контактов
  $contactsField.append($contactsForm);
  $contactsForm.append($addContactBtn);
  //блок кнопок и ошибок
  $btnField.append($errorField, $saveContactBtn, $deleteContactBtn);

  //блоки модального окна
  $modal.classList.add('modal', 'modal--visible');
  $inputField.classList.add('modal-box', 'modal__input');
  $contactsField.classList.add('modal__contacts', 'modal-contacts', 'modal-contacts--form');
  $btnField.classList.add('modal-box', 'modal__btns', 'modal-btns');
  //форма для клиента ФИО
  $title.classList.add('title', 'modal__title');
  $spanId.classList.add('modal__id');
  $closeBtn.classList.add('btn', 'modal__close-btn');
  $formInput.classList.add('modal__form', 'modal-form');
  $labelSurname.classList.add('modal-form__label');
  $labelName.classList.add('modal-form__label');
  $labelLastName.classList.add('modal-form__label');
  $inputSurname.classList.add('modal-form__input');
  $inputName.classList.add('modal-form__input');
  $inputLastName.classList.add('modal-form__input');
  $pSurname.classList.add('modal-form__placeholder');
  $pName.classList.add('modal-form__placeholder');
  $pLastName.classList.add('modal-form__placeholder');

  //форма для контактов
  $contactsForm.classList.add('modal-box', 'modal-contacts__box');
  $addContactBtn.classList.add('btn', 'modal-contacts__addbtn');
  //блок кнопок и ошибок
  $errorField.classList.add('modal-btns__error-field');
  $errorField.id = 'errorField';
  $saveContactBtn.classList.add('btn', 'modal-btns__primary');
  $deleteContactBtn.classList.add('btn', 'modal-btns__decline');

  //форма для клиента ФИО
  $title.textContent = 'Изменить данные';
  $pSurname.innerHTML = `Фамилия
  <span class="modal-form__placeholder-star">*</span>`;
  $pName.innerHTML = `Имя
  <span class="modal-form__placeholder-star">*</span>`;
  $pLastName.innerHTML = `Отчество`;
  $inputSurname.name = 'Фамилия';
  $inputName.name = 'Имя';
  $inputLastName.name = 'Отчество';
  $inputSurname.type = 'text';
  $inputName.type = 'text';
  $inputLastName.type = 'text';
  $inputSurname.required = true;
  $inputName.required = true;
  //форма для контактов
  $addContactBtn.textContent = 'Добавить контакт';
  //блок кнопок и ошибок
  $saveContactBtn.textContent = 'Сохранить';
  $deleteContactBtn.textContent = 'Удалить клиента';
  //data*
  $closeBtn.dataset.btn = 'close';

  //данные с сервера
  $spanId.textContent = `ID:${objClient.id}`;
  $inputSurname.value = objClient.surname;
  $inputName.value = objClient.name;
  $inputLastName.value = objClient.lastName;
  let $form;

  if (objClient.contacts.length) {
    $form = document.createElement('form');
    $form.classList.add('modal-contacts__form');
    $contactsForm.prepend($form);
    $contactsForm.parentElement.classList.remove('modal-contacts--form');
    createContactSelect($form, objClient.contacts);
  }

  //убирать placeholder если появились символы в инпуте
  placeInputPlaceholder($inputSurname, $pSurname);
  placeInputPlaceholder($inputName, $pName);
  placeInputPlaceholder($inputLastName, $pLastName);

  $formInput.addEventListener('input', (e) => {
    placeInputPlaceholder(e.target, e.target.nextSibling);
  })
  //добавление контактов
  $addContactBtn.addEventListener('click', () => {
    if (!$contactsForm.querySelector('form')) {
      $form = document.createElement('form');
      $form.classList.add('modal-contacts__form');
      $contactsForm.prepend($form);
      console.log('$formBox', $contactsForm);
      $contactsForm.parentElement.classList.remove('modal-contacts--form');
    }
    $form = $contactsForm.querySelector('form');
    console.log('создаём поле для контакта');
    createContactSelect($form);
  })
  //сохранение клиента
  $saveContactBtn.addEventListener('click', async () => {
    console.log('click - save');
    let errorfield = document.querySelector('#errorField');
    errorfield.replaceChildren();
    //!вытащить в отдельную функцию
    const contactData = document.querySelectorAll('#contact-input');
    const contactType = document.querySelectorAll('#contact-type');
    const contacts = [];
    for (i = 0; i < contactData.length; i += 1) {
      contacts.push({
        type: `${contactType[i].value}`,
        value: `${contactData[i].value}`
      })
    }
    //!
    let client = {
      surname: validateInput($inputSurname),
      name: validateInput($inputName),
      lastName: validateInput($inputLastName),
      contacts: contacts,
    }
    console.log(client);
    console.log('!errorfield.childNodes.length', !errorfield.childNodes.length);

    if (!errorfield.childNodes.length) {
      await editClientServer(client, objClient.id);
      await getClientsArray();
      closeModal();
      renderClientsTable(clientsArray);
    }
  })

  //удаление контакта
  $deleteContactBtn.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/api/clients/${objClient.id}`, {
      method: 'DELETE',
    });
    await getClientsArray();
    closeModal();
    renderClientsTable(clientsArray);
  })
}

function closeModal() {
  modal.classList.remove('modal-overlay--visible');
  modal.replaceChildren();
}

document.addEventListener('click', (e) => {
  console.log(e.target);
  let btn = e.target.getAttribute('data-btn');
  console.log(btn);

  if (e.target == modal || btn === 'close') {
    closeModal()
  }
})

function placeInputPlaceholder(input, placeholder) {
  const liftPlaceholder = 'modal-form__placeholder--invalid';
  !input.value ? placeholder.classList.add(liftPlaceholder) : placeholder.classList.remove(liftPlaceholder);
}

function createContactSelect(box, contactsArray = false) {
  console.log('contactsArray', contactsArray);
  if (!contactsArray) {
    const $select = document.createElement('select');
    const $input = document.createElement('input');
    $select.classList.add('modal-contacts__contact-select');
    $select.id = "contact-type";
    $input.classList.add('modal-contacts__input');
    $input.id = 'contact-input';
    contactsType.forEach((type) => {
      const $option = document.createElement('option');
      $option.value = type;
      $option.innerText = type;
      $select.append($option);
    })
    box.append($select, $input);
    return
  }

  contactsArray.forEach((contact) => {
    console.log('contact.value', contact.value);
    console.log('contact.type', contact.type);
    const $select = document.createElement('select');
    const $input = document.createElement('input');
    $select.classList.add('modal-contacts__contact-select');
    $select.id = "contact-type";
    $input.classList.add('modal-contacts__input');
    $input.id = 'contact-input';
    contactsType.forEach((type) => {
      const $option = document.createElement('option');
      $option.value = type;
      $option.innerText = type;
      console.log('contactsType.forEach contact.type', contact.type);
      console.log('contactsType.forEach $option.value', $option.value);
      console.log('contactsType.forEach contact.type === $option.value', contact.type === $option.value);

      if (contact.type === $option.value) {
        $option.selected = true;
        $input.value = contact.value;
      }
      $select.append($option);
    })
    box.append($select, $input);
  })

  return
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

  if (!inputElement.required && !inputValue) {
    return validateText(textToUpperCase(inputValue))
  };
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
    let errorfield = document.querySelector('#errorField');
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
