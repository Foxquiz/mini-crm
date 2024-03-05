(async () => {
  let clientsArray = [];
  const clientsTable = document.getElementById('clientsTable');
  const addClientBtn = document.getElementById('addClientBtn');
  const searchInput = document.getElementById('searchInput');
  const toLocalFormat = new Intl.DateTimeFormat("ru");
  const SERVER_API_URL = `http://localhost:3000/api/clients`;
  const tableColumnsCount = 6;
  //*----------SVG
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
    <svg viewBox="0 0 160 160" height="16" width="16" xmlns="http://www.w3.org/2000/svg" >
  <circle r="60" cx="80" cy="80" fill="transparent" stroke="#9873FF" stroke-width="13.5px"></circle>
  <g fill="#9873FF" >
    <rect width="13.5" height="66.5" x="73.3" y="46.6" rx="7"></rect>
    <rect width="13.5" height="66.5" x="73.3" y="46.6" rx="7" transform = "rotate(90 80 80)"></rect>
  </g>
</svg>
  `;
  const editClientSVG = `
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
  const deleteContactSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z"/>
  </svg>

  `;
  const deleteLoadSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="load" clip-path="url(#clip0_224_2792)">
<path id="Vector" d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#F06A4D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_224_2792">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
  `;
  const editLoadSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="load" clip-path="url(#clip0_224_2771)">
<path id="Vector" d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_224_2771">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

  `;
  const saveLoadSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_121_1254)">
    <path d="M3.00008 8.03996C3.00008 10.8234 5.2566 13.08 8.04008 13.08C10.8236 13.08 13.0801 10.8234 13.0801 8.03996C13.0801 5.25648 10.8236 2.99996 8.04008 2.99996C7.38922 2.99996 6.7672 3.1233 6.196 3.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
  </g>
  <defs>
    <clipPath id="clip0_121_1254">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>
  `;
  const phoneContactSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="phone">
<circle id="Ellipse 34" cx="8" cy="8" r="8" fill="#9873FF"/>
<path id="Vector" d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
</g>
</svg>
  `;
  const emailContactSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="mail">
<path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
</g>
</svg>
  `;
  const vkContactSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="vk">
<g id="vk_2">
<path id="Vector" d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
</g>
</g>
</svg>
  `;
  const facebookContactSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="fb">
<path id="fb_2" d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
</g>
</svg>
  `;
  const otherContactSVG = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="mail">
<path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
</g>
</svg>
  `;
  //типы контактов
  const contactsType = [
    'Телефон',
    'Доп.телефон',
    'Email',
    'Vk',
    'Facebook',
  ]
  //функция очистки таблицы
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
    cell.setAttribute('colspan', `${tableColumnsCount}`);
    cell.innerHTML = text;

    row.append(cell);
    clientsTable.append(row);
  };
  //создание абсолютно позиционированного прозрачного слоя для предотвращения нажатия при отправке данных
  function preventClick(action) {
    if (!action) {
      const div = document.querySelector('.overlay');
      div.remove();
      return
    }
    const div = document.createElement('div');
    div.classList.add('overlay');
    document.body.prepend(div);
  }
  //функция отрисовка ожидания ответа сервера для изменить/удалить/сохранить
  function animationResponseAwait(element, action = false) {
    if (!action) {
      preventClick(false);
      element.classList.remove('btn--loading');
      switch (element.dataset.btn) {
        case 'change':
          element.innerHTML = `${editClientSVG} Изменить`;
          break;
        case 'saveModal':
          element.innerHTML = `Сохранить`;
          break;
        case 'delete':
          element.innerHTML = `${deleteClientSVG} Удалить`;
          break;
        case 'deleteModal':
          element.innerHTML = `${element.textContent.trim()}`;
          break;
      }
      return;
    };
    preventClick(true);
    element.classList.add('btn--loading');
    switch (element.dataset.btn) {
      case 'change':
        element.innerHTML = `${editLoadSVG} Изменить`;
        break;
      case 'saveModal':
        element.innerHTML = `${saveLoadSVG} Сохранить`;
        break;
      case 'delete':
        element.innerHTML = `${deleteLoadSVG} Удалить`;
        break;
      case 'deleteModal':
        element.innerHTML = `${saveLoadSVG} ${element.textContent.trim()}`;
        break;
    };
  }
  //*----------взаимодействие с сервером
  //получение всех данных с сервера
  async function getClientsArray() {
    cleanTable();
    loadingRow();
    addClientBtn.classList.add('visually-hidden');
    const response = await fetch(`${SERVER_API_URL}`);
    clientsArray = await response.json();
    return clientsArray;
  }
  //получение данных клиента с сервера
  async function getClientServer(id) {
    if (isOnline() === false) serverErrors();
    const response = await fetch(`${SERVER_API_URL}/${id}`);
    const clientElement = await response.json();
    return clientElement;
  }
  //отправка данных на сервер
  async function createClientServer(client) {
    if (isOnline() === false) serverErrors();
    const response = await fetch(`${SERVER_API_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        name: client.name,
        surname: client.surname,
        lastName: client.lastName,
        contacts: client.contacts,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const newClient = await response.json();
    serverErrors(response.status, newClient);
    return newClient;
  }
  //изменение данных на серверe
  async function editClientServer(client, id) {
    if (isOnline() === false) serverErrors();
    const response = await fetch(`${SERVER_API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: client.name,
        surname: client.surname,
        lastName: client.lastName,
        contacts: client.contacts,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const newClient = await response.json();
    serverErrors(response.status, newClient);
    return newClient;
  }
  //удаление клиента на серверe
  async function deleteClientServer(id) {
    if (isOnline() === false) serverErrors();
    const response = await fetch(`${SERVER_API_URL}/${id}`, {
      method: 'DELETE',
    });

    const delResponse = await response.json();
    serverErrors(response.status, delResponse);
    return;
  }
  //функция анализ ошибок с сервера
  function serverErrors(responseStatus = '', response = '') {
    switch (responseStatus) {
      case 200:
      case 201:
      case 422:
      case 404:
        if (response.errors) response.errors.forEach((errors) => renderErrorField(errors.message));
        break;
      case 500:
        if (response.errors) response.errors.forEach((errors) => renderErrorField(errors.message));
        break;
      default:
        renderErrorField('Что-то пошло не так ...');
        let deleteBtn = modalOverlay.querySelector('[data-btn="deleteModal"]');
        let saveBtn = modalOverlay.querySelector('[data-btn="saveModal"]');
        if (deleteBtn) deleteBtn.disabled = true;
        if (saveBtn) saveBtn.disabled = true;
        return false
    };
  }
  //функция поиска (сервер)
  async function searchRequest(inputValue) {
    const searchData = inputValue.trim();
    if (isSearchField()) removeSearchList();
    const response = await fetch(`${SERVER_API_URL}?search=${searchData}`);
    clientsArray = await response.json();
    if (searchData) createResultField(clientsArray);
  }
  //проверка наличия сети
  function isOnline() {
    return navigator.onLine ? true : false;
  }
  //*----------рендер
  function renderClientsTable(clientsArray, sortByElement) {
    cleanTable();
    addClientBtn.classList.remove('visually-hidden');
    if (!clientsArray.length) {
      loadingRow('');
    } else {
      sortArray(clientsArray, sortByElement).forEach(element => {
        clientsTable.append(renderClientRow(element));
      });
    }
  }
  //создание функции отрисовки клиента в таблице
  function renderClientRow(objClient) {
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
    $fullname.classList.add('row__descr', 'row__descr--fullname');
    $createdAt.classList.add('row__descr', 'row__descr--date');
    $createdAtTime.classList.add('row__descr', 'row__descr-light');
    $updatedAt.classList.add('row__descr', 'row__descr--date');
    $updatedAtTime.classList.add('row__descr', 'row__descr-light');
    $contacts.classList.add('row__descr', 'row__descr--contacts');
    $actionBtns.classList.add('row__descr', 'row__descr--btn')
    $changeBtn.classList.add('btn', 'row__btn', 'row__btn-edit');
    $deleteBtn.classList.add('btn', 'row__btn', 'row__btn-delete');

    $clientsId.textContent = objClient.id;
    $fullname.textContent = `${objClient.surname} ${objClient.name} ${objClient.lastName}`;
    $createdAt.textContent = toLocalFormat.format(new Date(objClient.createdAt));
    $updatedAt.textContent = toLocalFormat.format(new Date(objClient.updatedAt));

    $createdAtTime.textContent = getTime(objClient.createdAt);
    $updatedAtTime.textContent = getTime(objClient.updatedAt);;

    $row.id = `${objClient.id}`;
    $changeBtn.innerHTML = `${editClientSVG} Изменить`;
    $deleteBtn.innerHTML = `${deleteClientSVG} Удалить`;
    $changeBtn.dataset.btn = 'change';
    $deleteBtn.dataset.btn = 'delete';

    renderContacts($contacts, objClient.contacts);

    $createdAt.append($createdAtTime);
    $updatedAt.append($updatedAtTime);
    $actionBtns.append($changeBtn, $deleteBtn);
    $row.append($clientsId, $fullname, $createdAt, $updatedAt, $contacts, $actionBtns);

    //отслеживание нажатий на кнопки действий
    $deleteBtn.addEventListener('click', async () => {
      $deleteBtn.disabled = true; //убрать возможность нажимать на кнопки при открытии модального окна
      let clientElement = false;
      animationResponseAwait($deleteBtn, true);
      if (isOnline()) {
        clientElement = await getClientServer(objClient.id);
      }
      createModal('delete', clientElement);
      animationResponseAwait($deleteBtn);
      if (isOnline() === false) serverErrors();
    });

    $changeBtn.addEventListener('click', async (e) => {
      $changeBtn.disabled = true; //убрать возможность нажимать на кнопки при открытии модального окна
      let clientElement = false;
      animationResponseAwait($changeBtn, true);
      if (isOnline()) {
        clientElement = await getClientServer(objClient.id);
      }
      createModal('edit', clientElement);
      animationResponseAwait($changeBtn);
      history.pushState(null, null, `#client${objClient.id}`);
      if (isOnline() === false) serverErrors();
    });

    return $row;
  }
  //функция отрисовки времени (вставляет 0 перед минутами/часами при необходимости)
  function getTime(objTime) {
    date = new Date(objTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours.toString().length === 1 ? `0${hours}` : hours;
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  }
  //функция отрисовки поля контакты
  function renderContacts(cell, contactsArray) {
    const contactsList = document.createElement('ul');
    contactsList.classList.add('row__contacts');
    contactsArray.forEach((contact) => {
      let li = document.createElement('li');
      let btn = document.createElement('button');
      btn.classList.add('btn', 'row__contacts-btn');
      tooltip = document.createElement('div');
      li.append(btn);
      contactsList.append(li);
      btn.ariaLabel = `контакт ${contact.type}: ${contact.value}`;
      switch (contact.type) {
        case 'Телефон':
          btn.innerHTML = phoneContactSVG;
          btn.dataset.tooltip = `${contact.value}`;
          break;
        case 'Email':
          btn.innerHTML = emailContactSVG;
          btn.dataset.tooltip = `${contact.type}: ${contact.value}`;
          break;
        case 'Vk':
          btn.innerHTML = vkContactSVG;
          btn.dataset.tooltip = `${contact.type}: ${contact.value}`;
          break;
        case 'Facebook':
          btn.innerHTML = facebookContactSVG;
          btn.dataset.tooltip = `${contact.type}: ${contact.value}`;
          break;
        default:
          btn.innerHTML = otherContactSVG;
          btn.dataset.tooltip = `${contact.type}: ${contact.value}`;
          break;
      };

      btn.onfocus = () => {
        createTooltip(btn.dataset.tooltip, btn);
      };
    });
    cell.append(contactsList);
    if (contactsList.childNodes.length > 5) hideExtraContacts(contactsList);
  }
  //функция скрытия контактов, если их больше 5
  function hideExtraContacts(contactsList) {
    let contactsElements = contactsList.childNodes;
    let quantity = contactsElements.length;

    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add('btn', 'row__contacts-btn', 'row__contacts-btn--elliplse');
    btn.ariaLabel = 'Показать остальные контакты';
    btn.textContent = '+' + (quantity - 4);
    li.append(btn);
    contactsList.append(li);
    for (i = 4; i < quantity; i += 1) {
      contactsElements[i].classList.add('visually-hidden');
      contactsElements[i].setAttribute('hidden', '');
    };

    btn.addEventListener('click', () => {
      let contactsElements = contactsList.querySelectorAll('li');
      contactsElements.forEach((element) => {
        element.classList.remove('visually-hidden');
        element.removeAttribute('hidden');
      });
      contactsList.lastChild.remove();
    });

  }
  //функция создания элемента подсказки
  function createTooltip(text, element, id = false) {
    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    let splittedText = text.split(': ');

    //текст для отображения в подсказке
    tooltipElem.innerHTML = splittedText.length === 1
      ? `${splittedText[0]}`
      : `<span class="tooltip__text">${splittedText[0]}: </span><span class="tooltip__data">${splittedText[1]}</span>`;

    element.append(tooltipElem);

    //позиционируем его сверху от элемента (top-center)
    let coords = element.getBoundingClientRect();

    let left = coords.left + ((element.offsetWidth - tooltipElem.offsetWidth) / 2);
    if (left < 0) left = 0; // не заезжать за левый край окна

    let top = coords.top - (tooltipElem.offsetHeight + 7);
    if (id === `deleteContactBtn`) top = coords.top - tooltipElem.offsetHeight + 5;

    if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
      tooltipElem.classList.add('tooltip-reverse');
      top = coords.top + element.offsetHeight + 7;
      if (id === `deleteContactBtn`) top = coords.top + element.offsetHeight - 7;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    document.onmouseout = function () {
      if (tooltipElem) {
        tooltipElem.remove();
      }
    };

    element.onblur = () => {
      if (tooltipElem) {
        tooltipElem.remove();
      }
    };
  }
  //отслеживание наведения мыши на кнопку с tooltip
  document.onmouseover = function (e) {
    let target = e.target;
    let tooltipHtml = target.dataset.tooltip;
    let elementId = target.id;
    if (tooltipHtml) createTooltip(tooltipHtml, target, elementId);
  };

  //*----------модальные окна
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'modal-overlay';
  modalOverlay.classList.add('modal-overlay');
  document.body.prepend(modalOverlay);

  //вызов модального окна создания нового клиента
  addClientBtn.addEventListener('click', () => {
    addClientBtn.disabled = true; //убрать возможность нажимать на кнопки при открытии модального окна
    createModal('create');
    if (isOnline() === false) serverErrors();
  });
  //функция отрисовки модального окна создания+изменения+удаления
  function createModal(type, objClient = false) {
    modalOverlay.classList.add('modal-overlay--visible');

    //скрытие скролла
    let scroll = window.innerWidth - document.body.clientWidth;
    document.body.style.setProperty(`--scroll-width`, scroll);
    document.body.classList.add(`page--overflow`);

    const $modal = document.createElement('div');
    //блоки модального окна
    const $headField = document.createElement('div');
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

    const $labelName = document.createElement('label');
    const $inputName = document.createElement('input');
    const $pName = document.createElement('p');

    const $labelLastName = document.createElement('label');
    const $inputLastName = document.createElement('input');
    const $pLastName = document.createElement('p');
    //форма для контактов
    const $contactsForm = document.createElement('div');
    const $addContactBtn = document.createElement('button');
    //блок кнопок и ошибок
    const $errorField = document.createElement('div');
    const $primaryClientBtn = document.createElement('button');
    const $bottomClientBtn = document.createElement('button');

    //блоки модального окна
    modalOverlay.append($modal);
    $modal.append($headField, $inputField, $contactsField, $btnField);
    //форма для клиента ФИО
    $headField.append($title, $spanId, $closeBtn)
    $inputField.append($formInput);
    $formInput.append($labelSurname, $labelName, $labelLastName);
    $labelSurname.append($inputSurname, $pSurname);
    $labelName.append($inputName, $pName);
    $labelLastName.append($inputLastName, $pLastName);

    //форма для контактов
    $contactsField.append($contactsForm);
    $contactsForm.append($addContactBtn);
    //блок кнопок и ошибок
    $btnField.append($errorField, $primaryClientBtn, $bottomClientBtn);

    //блоки модального окна
    $modal.classList.add('modal', 'modal--visible');
    $headField.classList.add('modal-box', 'modal__head');
    $inputField.classList.add('input', 'modal-box', 'modal__input');
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
    $inputSurname.classList.add('input', 'modal-form__input');
    $inputName.classList.add('input', 'modal-form__input');
    $inputLastName.classList.add('input', 'modal-form__input');
    $pSurname.classList.add('modal-form__placeholder', 'modal-form__placeholder--inner');
    $pName.classList.add('modal-form__placeholder', 'modal-form__placeholder--inner');
    $pLastName.classList.add('modal-form__placeholder', 'modal-form__placeholder--inner');

    //форма для контактов
    $contactsForm.classList.add('modal-box', 'modal-contacts__box');
    $addContactBtn.classList.add('btn', 'modal-contacts__addbtn');
    $addContactBtn.id = 'addContactBtn';
    //блок кнопок и ошибок
    $errorField.id = 'errorField';
    $primaryClientBtn.classList.add('btn', 'modal-btns__primary');
    $bottomClientBtn.classList.add('btn', 'modal-btns__decline');

    //форма для клиента ФИО
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
    $addContactBtn.innerHTML = addClientSVG + 'Добавить контакт';
    // $addContactBtn.textContent = 'Добавить контакт';
    $addContactBtn.dataset.btn = 'addContact';
    //блок кнопок и ошибок
    $primaryClientBtn.textContent = 'Сохранить';
    $bottomClientBtn.textContent = 'Отмена';
    //data*
    $closeBtn.dataset.btn = 'close';
    $primaryClientBtn.dataset.btn = 'saveModal';
    $bottomClientBtn.dataset.btn = 'close';
    //role*
    $closeBtn.ariaLabel = 'закрыть модальное окно';

    $closeBtn.focus();
    let $form;
    switch (type) {
      case 'create':
        $title.textContent = 'Новый клиент';
        break;
      case 'edit':
        $title.textContent = 'Изменить данные';
        $bottomClientBtn.textContent = 'Удалить клиента';
        $bottomClientBtn.dataset.btn = 'deleteModal';
        //данные с сервера
        if (objClient) { //чтобы грузило при ошибке получения данных с сервера
          $spanId.textContent = `ID:${objClient.id}`;
          $inputSurname.value = objClient.surname;
          $inputName.value = objClient.name;
          $inputLastName.value = objClient.lastName;
          if (objClient.contacts.length) {
            $form = document.createElement('form');
            $form.classList.add('modal-contacts__form');
            $contactsForm.prepend($form);
            $contactsForm.parentElement.classList.remove('modal-contacts--form');
            objClient.contacts.forEach((contact) => {
              ckechContactsQty($form, 'add', contact);
            })
          }
        }
        break;
      case 'delete':
        $headField.classList.add('modal__notify');
        $title.classList.add('modal__title--delete');
        $spanId.classList.replace('modal__id', 'modal__notify-text');
        $title.textContent = 'Удалить клиента';
        $spanId.textContent = 'Вы действительно хотите удалить данного клиента?';
        $primaryClientBtn.textContent = 'Удалить';
        $primaryClientBtn.dataset.btn = 'deleteModal';
        $inputField.remove();
        $contactsField.remove();
        break;
    }

    //убрать placeholder если есть символы в инпуте
    $formInput.querySelectorAll('input').forEach((input) =>
      placeInputPlaceholder(input, input.nextSibling)); //при рендере формы

    $formInput.addEventListener('input', (e) => {
      placeInputPlaceholder(e.target, e.target.nextSibling);
      e.target.classList.remove('modal-form__input--invalid');
    })

    $modal.addEventListener('click', async (e) => {
      switch (e.target.getAttribute('data-btn')) {
        case 'close': //закрыть модальное окно
          closeModal();
          break;
        case 'addContact': //добавление контактов
          if (!$contactsForm.querySelector('form')) {
            $form = document.createElement('form');
            $form.classList.add('modal-contacts__form');
            $contactsForm.prepend($form);
            $contactsForm.parentElement.classList.remove('modal-contacts--form');
          }
          $form = $contactsForm.querySelector('form');
          ckechContactsQty($form, 'add');
          break;
        case 'saveModal': //сохранить клиента
          $errorField.replaceChildren();
          let client = {
            surname: validateInput($inputSurname),
            name: validateInput($inputName),
            lastName: validateInput($inputLastName),
            contacts: getModalContactsArray(),
          }

          if (!$errorField.childNodes.length) {
            animationResponseAwait(e.target, true);
            //определение изменение клиента или новый
            Boolean(objClient.id) ? await editClientServer(client, objClient.id) :
              await createClientServer(client);
            animationResponseAwait(e.target);
            if (!$errorField.childNodes.length) {
              animationResponseAwait(e.target, true);
              await getClientsArray();
              closeModal();
              animationResponseAwait(e.target);
              renderClientsTable(clientsArray);
            }
          }
          break;
        case 'deleteModal': //удалить клиента
          //если модальное окно Удаления, то просто удалить
          if (type === 'delete') {
            animationResponseAwait(e.target, true);
            await deleteClientServer(objClient.id);
            animationResponseAwait(e.target);
            if (!$errorField.childNodes.length) {
              animationResponseAwait(e.target, true);
              await getClientsArray();
              closeModal();
              animationResponseAwait(e.target);
              renderClientsTable(clientsArray);
            }
          };
          //если модальное окно Редактирования, то вызвать окно удалить
          if (type === 'edit') {
            let clientElement = false;
            animationResponseAwait(e.target, true);
            if (isOnline()) {
              clientElement = await getClientServer(objClient.id);
            }
            closeModal();
            //по удалению клиента, убирается окно изменения и отображается окно удаления
            setTimeout(() => {
              createModal('delete', clientElement);
              animationResponseAwait(e.target);
              if (isOnline() === false) serverErrors();
            }, 800);
          };
          break;
      }
    })
  }
  //функция создаёт массив контактов
  function getModalContactsArray() {
    const contactData = document.querySelectorAll('#contact-input');
    const contactType = document.querySelectorAll('[role="combobox"]');
    const contacts = [];
    for (i = 0; i < contactData.length; i += 1) {
      contacts.push({
        type: `${contactType[i].textContent}`,
        value: `${validateInput(contactData[i])}`
      })
    }
    return contacts
  }
  //функция закрытия модального окна
  function closeModal() {
    window.location.hash = '';
    modalOverlay.lastChild.classList.add('modal__animate');
    setTimeout(() => {
      modalOverlay.classList.remove('modal-overlay--visible');
      modalOverlay.replaceChildren();
      document.body.querySelectorAll('button').forEach((btn) => enableButtons(btn));
    }, 450);
    //отображение скролла
    document.body.classList.remove(`page--overflow`);
  }
  //вызов функции закрытия модального окна
  document.addEventListener('click', (e) => {
    let btn = e.target.getAttribute('data-btn');
    if (e.target == modalOverlay || btn === 'close') {
      closeModal()
    }
  })
  //функция возвращает возможность нажимать на кнопки при закрытии модального окна
  function enableButtons(btn) {
    btn.disabled = false;
  }
  //подпись инпута, функция передвижения при печати
  function placeInputPlaceholder(input, placeholder) {
    const liftPlaceholder = 'modal-form__placeholder--inner';
    !input.value ? placeholder.classList.add(liftPlaceholder) : placeholder.classList.remove(liftPlaceholder);
  }
  //функция проверки кол-ва контактов при вызове (отрисовка, скрытие/показ кнопки добавления)
  function ckechContactsQty(form, action, contact) {
    let contactsQty = form.querySelectorAll('#contact-type').length;
    switch (action) {
      case 'add':
        if (contactsQty < 10) createContactSelect(form, contact);
        if (contactsQty >= 9) {
          let addContactBtn = document.getElementById('addContactBtn');
          addContactBtn.classList.add('visually-hidden');
          addContactBtn.previousSibling.classList.add('modal-contacts__form--no-btn');
        }
        break;
      case 'delete':
        if (contactsQty === 1) {
          form.parentElement.parentElement.classList.add('modal-contacts--form');
          form.remove();
        }
        if (contactsQty === 10) {
          let addContactBtn = document.getElementById('addContactBtn');
          addContactBtn.classList.remove('visually-hidden');
          addContactBtn.previousSibling.classList.remove('modal-contacts__form--no-btn');
        }
        break;
    }
  }
  //функция отрисовки добавления контакта
  function createContactSelect(box, contact = false) {
    const $contactBox = document.createElement('div');
    const $customSelect = document.createElement('div');
    const $customSelectLabel = document.createElement('label');
    const $selectBtn = document.createElement('button');
    const $announcement = document.createElement('div');
    const $optionsList = document.createElement('ul');

    const $input = document.createElement('input');

    $contactBox.classList.add('modal-contacts__contact-box');

    $customSelect.classList.add('modal-contacts__select', 'select');
    $customSelect.id = "contact-type";

    $customSelectLabel.classList.add('visually-hidden');
    $customSelectLabel.setAttribute('for', 'select');
    $customSelectLabel.textContent = 'Выберите типа контакта';

    $selectBtn.classList.add('btn', 'select__toggle');
    $selectBtn.role = 'combobox';
    $selectBtn.id = 'select';

    $optionsList.dataset.select = 'selectBtn';

    $announcement.ariaLive = 'off';
    $announcement.role = 'alert';
    $announcement.classList.add('visually-hidden');

    $optionsList.classList.add('select__dropdown', 'select__options');
    $optionsList.role = 'listbox';
    $optionsList.ariaExpanded = false;
    $optionsList.dataset.select = 'optionsList';

    $input.classList.add('input', 'modal-contacts__input');
    $input.placeholder = 'Введите данные контакта';
    $input.id = 'contact-input';
    $input.required = true;

    const $deleteBtn = createDeleteContactBtn();

    contactsType.forEach((typeItem) => {
      const $option = document.createElement('li');
      $option.innerText = typeItem;
      $option.classList.add('select__option');
      $option.ariaSelected = false;
      $option.role = 'option';
      if (contact && contact.type === $option.innerText) {
        $selectBtn.textContent = contact.type;
        $option.ariaSelected = true;
        $input.value = contact.value;
        $input.name = contact.type;
        if (contact.type === 'Телефон' || contact.type === 'Доп.телефон') {
          $input.value = validatePhone($input);
        }
      }
      $optionsList.append($option);
    });

    $deleteBtn.addEventListener('click', () => {
      ckechContactsQty(box, 'delete');
      $contactBox.remove();
    });

    $deleteBtn.onfocus = () => {
      createTooltip($deleteBtn.dataset.tooltip, $deleteBtn, $deleteBtn.id);
    };

    if (!contact) {
      $selectBtn.textContent = $optionsList.firstElementChild.textContent;
      $optionsList.firstElementChild.ariaSelected = true;
    };
    $customSelect.append($customSelectLabel, $selectBtn, $announcement, $optionsList);
    $contactBox.append($customSelect, $input);
    if (contact) $contactBox.append($deleteBtn);
    box.append($contactBox);

    const customSelect = {
      wrap: $customSelect, //div
      button: $selectBtn,
      optionsList: $optionsList,
      options: $optionsList.childNodes,
      input: $input,
      announcement: $announcement,
    };

    $input.addEventListener('input', (e) => {
      e.target.classList.remove('modal-form__input--invalid');
      $contactBox.append($deleteBtn);
    });

    $input.addEventListener('input', (e) => {
      e.target.classList.remove('modal-form__input--invalid');
      $contactBox.append($deleteBtn);
    });

    document.addEventListener('click', (e) => {
      e.preventDefault();
      handleClick(e.target, customSelect, e);
      $input.type = defineContactInputType(customSelect).inputType;
      $input.name = defineContactInputType(customSelect).contactType;
    });

    customSelect.button.addEventListener('keydown', (e) => {
      e.stopPropagation();
      handleKeyPress(e, customSelect);
      $input.type = defineContactInputType(customSelect).inputType;
      $input.name = defineContactInputType(customSelect).contactType;
    });

    //переменная для регулирования включения маски
    let isInputActive = true;

    $input.addEventListener('keydown', (e) => {
      isInputActive = true;
      //отключить, если пользователь стирает что-то
      if (e.key === 'Backspace' || e.key === 'Delete') return isInputActive = false;
    });

    $input.addEventListener('input', (e) => {
      if (isInputActive) validateContactsInput(e.target, e);
    });

    $input.addEventListener('paste', (e) => {
      let pasted = e.clipboardData || window.clipboardData;
      let numbersValue = getNumbersInputValue($input);
      if (pasted) {
        let pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
          $input.value = numbersValue;
          return;
        }
      }
    });
  };
  //создание кнопки удалить контакт для инпута контакта клиента
  function createDeleteContactBtn() {
    const $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('btn', 'modal-contacts__delbtn');
    $deleteBtn.innerHTML = deleteContactSVG;
    $deleteBtn.dataset.tooltip = `Удалить контакт`;
    $deleteBtn.id = `deleteContactBtn`;
    $deleteBtn.ariaLabel = 'Удалить контакт';

    return $deleteBtn;
  }


  //*----------custom select
  //функция проверки открыт список опций или нет
  function isSelectOpen(customSelect) {
    return customSelect.wrap.classList.contains('select--show');
  }
  //функция открытия/закрытия списка опций
  function toggleSelect(customSelect) {
    customSelect.wrap.classList.contains('select--show') ? closeSelect(customSelect) : openSelect(customSelect);
  };
  //функция поиска текущего выбранного типа контактов
  function findSelectedOption(customSelect) {
    let selectedOption;
    let currentIndex;
    customSelect.options.forEach((option, index) => {
      if (option.ariaSelected === 'true') {
        selectedOption = option;
        currentIndex = index;
      };
    });
    return { selectedOption, currentIndex };
  };
  //функция закрытия списка
  function closeSelect(customSelect) {
    let currentSelectedOption = findSelectedOption(customSelect).selectedOption;
    customSelect.button.setAttribute('aria-expanded', false);
    customSelect.button.focus();
    customSelect.button.textContent = currentSelectedOption.textContent;
    customSelect.wrap.classList.remove('select--show');
  };
  //функция открытия списка
  function openSelect(customSelect) {
    customSelect.button.focus();
    customSelect.button.setAttribute('aria-expanded', true);
    const currentOptionIndex = findSelectedOption(customSelect).currentIndex;
    focusCurrentOption(customSelect, currentOptionIndex);
    customSelect.wrap.classList.add('select--show');
  };
  //функция обработки клика по списку опций
  function handleClick(targetOption, customSelect, e) {
    e.stopPropagation();
    if (targetOption === customSelect.button) {
      toggleSelect(customSelect);
      return;
    };
    if (customSelect.optionsList.contains(targetOption)) {
      customSelect.options.forEach((option) => {
        option.ariaSelected = false;
        option.classList.remove('select__option-hover');
      });
      targetOption.ariaSelected = true;
      targetOption.classList.add('select__option-hover');
    };
    if (isSelectOpen(customSelect)) {
      closeSelect(customSelect);
    }
  };
  //функция обработки нажатия клавиш
  function handleKeyPress(e, customSelect) {
    if (isSelectOpen(customSelect)) {
      switch (e.key) {
        case 'Escape':
          closeSelect(customSelect);
          break;
        case 'Tab':
          closeSelect(customSelect);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          closeSelect(customSelect);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveFocusDown(customSelect);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveFocusUp(customSelect);
          break;
      }
      return;

    };
    if (!isSelectOpen(customSelect)) {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          openSelect(customSelect);
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          switchSelectedOption(customSelect, 'next');
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          switchSelectedOption(customSelect, 'previous');
          break;
      }
      return;
    };
  };
  //функция переключения клавишами (стрелками) опции при закрытом селекте
  function switchSelectedOption(customSelect, dir) {
    let selectedOption = customSelect.optionsList.querySelector('[aria-selected="true"]');
    let nextOption;
    switch (dir) {
      case 'next':
        nextOption = selectedOption.nextElementSibling ? selectedOption.nextElementSibling : selectedOption.parentNode.firstElementChild;
        break;
      case 'previous':
        nextOption = selectedOption.previousElementSibling ? selectedOption.previousElementSibling : selectedOption.parentNode.lastElementChild;
        break;
    }
    customSelect.button.textContent = nextOption.textContent;
    selectedOption.setAttribute('aria-selected', false);
    nextOption.setAttribute('aria-selected', true);
    let currentOptionIndex = findSelectedOption(customSelect).currentIndex;
    focusCurrentOption(customSelect, currentOptionIndex);
  };
  //функция выделения текущей опции
  function focusCurrentOption(customSelect, currentIndex) {
    let currentOption = customSelect.options[currentIndex];
    customSelect.options.forEach((option) => {
      option.ariaSelected = false;
      option.classList.remove('select__option-hover');
    });
    currentOption.ariaSelected = true;
    currentOption.classList.add('select__option-hover');

    currentOption.scrollIntoView({
      block: 'nearest',
    });

    announceOption(currentOption.textContent, customSelect);
  };
  //функция озвучки выбранной опции
  function announceOption(text, customSelect) {
    customSelect.announcement.textContent = `Выбранный тип контакта: ${text}`;
    customSelect.announcement.setAttribute('aria-live', 'assertive');
    setTimeout(() => {
      customSelect.announcement.textContent = '';
      customSelect.announcement.setAttribute('aria-live', 'off');
    }, 500);
  };
  //функция переключения опции вниз
  function moveFocusDown(customSelect) {
    let currentOption = findSelectedOption(customSelect);
    (currentOption.currentIndex < (customSelect.options.length - 1)) ? currentOption.currentIndex += 1 : currentOption.currentIndex = 0;

    focusCurrentOption(customSelect, currentOption.currentIndex);
  };
  //функция переключения опции вверх
  function moveFocusUp(customSelect) {
    let currentOption = findSelectedOption(customSelect);
    (currentOption.currentIndex > 0) ? currentOption.currentIndex -= 1 : currentOption.currentIndex = customSelect.options.length - 1;

    focusCurrentOption(customSelect, currentOption.currentIndex);
  };

  //*----------функции валидации input
  //функция проставления типа инпута в зависимости от типа контакта
  function defineContactInputType(customSelect) {
    const currentContactType = findSelectedOption(customSelect).selectedOption;
    const contactType = currentContactType.textContent;
    let inputType;
    switch (currentContactType.textContent) {
      case 'Email':
        inputType = 'email';
        break;
      case 'Телефон':
      case 'Доп.телефон':
        inputType = 'tel';
        break;
      default:
        inputType = 'text';
        break;
    }
    return { inputType, contactType };
  }
  //функция вытаскивает из инпута только цифры
  function getNumbersInputValue(inputElement) {
    return inputElement.value.replace(/\D/g, '');
  }
  //функция реагирования на ввод в инпут контакта
  function validateContactsInput(inputElement, e = '') {
    const contactType = inputElement.name;
    switch (contactType) {
      case 'Email':
        inputType = 'email';
        break;
      case 'Телефон':
      case 'Доп.телефон':
        validatePhone(inputElement, e);
        break;
      default:
        inputType = 'text';
        break;
    }

  }
  //функция маски номера телефона
  function validatePhone(inputElement, e = '') {
    let formattedValue;
    let firstSymbols;
    let numbers = getNumbersInputValue(inputElement);
    let selectionStart = inputElement.selectionStart;

    if (!numbers) return inputElement.value = '';

    if (selectionStart != inputElement.value.length) {
      if (e.data && /\D/g.test(e.data)) {
        inputElement.value = numbers;
      };
      return;
    };

    if (['7', '8', '9'].includes(numbers[0])) {
      if (numbers[0] === '9') numbers = `7${numbers}`;
      firstSymbols = (numbers[0] === '8') ? '8' : '+7';
      formattedValue = `${firstSymbols} `;

      if (numbers.length > 1) {
        formattedValue += `(${numbers.substring(1, 4)}`;
      };
      if (numbers.length >= 5) {
        formattedValue += `) ${numbers.substring(4, 7)}`;
      };
      if (numbers.length >= 8) {
        formattedValue += ` ${numbers.substring(7, 9)}`;
      };
      if (numbers.length >= 10) {
        formattedValue += ` ${numbers.substring(9, 11)}`;
      };
    };
    if (!['7', '8', '9', '+'].includes(numbers[0])) {
      //не рф
      formattedValue = `+${numbers.substring(0, 16)}`; //обрезать лишнее
    };
    return inputElement.value = formattedValue;
  }
  //функция постпроверки корректности введённого телефона (кол-во цифр)
  function validatePhoneInput(inputElement) {
    let numbers = getNumbersInputValue(inputElement);
    return numbers.length < 11 ? false : numbers;
  }
  //функция постпроверки корректности введённого email (@, '.')
  function validateEmailInput(inputElement) {
    const regexp = /@.+\..+/i;
    return regexp.test(textToLowerCase(inputElement.value)) ? inputElement.value.trim() : false;
  }
  //функция постпроверки корректности facebook, vk (просто убирает лишние пробелы)
  function validateLinkInput(inputElement) {
    return inputElement.value.trim();
  }
  //функции валидации текста:
  function validateText(text) {
    let checkedText = false;
    const regexp = /[0-9]/;
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
  //функция валидации инпута (формирование ошибок)
  function validateInput(inputElement) {
    const inputValue = inputElement.value.trim();
    let checkedInput;
    let alertText = '';

    if (!inputElement.required && !inputValue) {
      return
    };
    if (inputElement.required) {

      switch (inputElement.name) {
        case 'Фамилия':
        case 'Имя':
          checkedInput = validateText(textToUpperCase(inputValue));
          alertText = `Поле ${inputElement.name} заполнено некорректно`;
          break;
        case 'Телефон':
        case 'Доп.телефон':
          checkedInput = validatePhoneInput(inputElement);
          alertText = `Поле ${inputElement.name} заполнено некорректно, недостаточно цифр`;
          break;
        case 'Email':
          checkedInput = validateEmailInput(inputElement);
          alertText = `Поле ${inputElement.name} заполнено некорректно, проверьте наличие символа @ и доменного имени`;
          break;
        case 'Vk':
        case 'Facebook':
          checkedInput = validateLinkInput(inputElement);
          alertText = `Поле ${inputElement.name} заполнено некорректно`;
          break;
      }
    };
    if (!inputElement.required && inputValue) {
      switch (inputElement.name) {
        case 'Отчество':
          checkedInput = validateText(textToUpperCase(inputValue));
          alertText = `Поле ${inputElement.name} заполнено некорректно`;
          break;
      }
    };
    if (inputElement.required && !inputValue) {
      checkedInput = false;
      alertText = `Поле ${inputElement.name} не заполнено`;
    };
    if (!checkedInput) {
      renderErrorField(alertText, inputElement);
    }
    return checkedInput;
  }
  //функция рендера содержания окна с ошибками (в модальном окне)
  function renderErrorField(text, inputElement = false) {
    let errorfield = document.getElementById('errorField');
    let alertInput = document.createElement('p');
    errorField.className = 'modal-btns__error-field';
    alertInput.classList.add('modal-btns__error');
    if (inputElement) inputElement.classList.add('modal-form__input--invalid');
    alertInput.textContent = text;
    errorfield.append(alertInput);
  }

  //*----------сортировка
  const clientsTableHead = document.getElementById('tableTR');
  //сортировка по умолчанию по ID по возрастанию
  let dir = false;
  let keys = ['id'];

  //функция сортировки массива сервера по текущим вводным по клику/по входящего массиву
  function sortArray(array, sortByElement) {
    clientsTableHead.onclick = async function (e) {
      e.preventDefault();
      //убираем стрелки в начальное положение, чтобы менять только нужную
      let tableHeadBtns = this.querySelectorAll('.arrow');
      tableHeadBtns.forEach((btn) => btn.classList.remove('arrow--rotate', 'table-head__btn--firm'));
      //вычисление ключа и направления сортировки
      let sortByElement = e.target;
      let target = sortByElement.id;
      sortByElement.classList.add('table-head__btn--firm');
      switch (target) {
        case 'clientsId':
          keys = ['id'];
          break;
        case 'fullname':
          keys = ['lastName', 'name', 'surname'];
          break;
        case 'creationDate':
          keys = ['createdAt'];
          break;
        case 'editDate':
          keys = ['updatedAt'];
          break;
      }
      if (sortByElement.dataset.dir === 'true') {
        sortByElement.classList.add('arrow--rotate');
        dir = true;
      };
      if (!(sortByElement.dataset.dir === 'true')) {
        sortByElement.classList.remove('arrow--rotate');
        dir = false;
      };
      sortByElement.dataset.dir = !dir;
      renderClientsTable(clientsArray, sortByElement);
    }
    return sortArrayElement(array, dir, keys, sortByElement);
  }
  //функция сортировки массива (по вводным данным)
  function sortArrayElement(array, dir, keys, sortByElement = document.getElementById('clientsId')) {
    let sortedArray = [...array];

    if (keys != undefined) {
      for (const key of keys) {
        sortedArray.sort(function (a, b) {
          let sortDirection = dir ? (a[key] > b[key]) : (a[key] < b[key]);
          if (sortDirection) return -1;
          if (!sortDirection) return 1;
          return 0;
        })
      }
    }
    return sortedArray;
  }

  //*----------ссылка на карточку клиента
  //выделение hash части в url при открытии, создание модального окна при наличии
  const hash = window.location.hash;
  if (hash.includes(`#client`)) {
    let clientElement = await getClientServer(hash.replace('#client', ''));
    createModal('edit', clientElement);
  }

  //*----------поиск с автодополнением
  //вывод результатов поиска под инпут, скролл к нужному элементу, подсветка нужной строки
  const searchForm = searchInput.parentElement;
  let sendInputTimer;
  //отслеживание ввода в инпут поиска
  searchInput.addEventListener('input', () => {
    removeChosenRowClass();
    clearTimeout(sendInputTimer);
    sendInputTimer = setTimeout(searchRequest, 300, searchInput.value)
  });
  //отслеживание нажатий клавиш в инпуте поиска
  searchInput.addEventListener('keydown', (e) => {
    e.stopPropagation();
    if (isSearchField()) handleKeyPressSearch(e, searchForm.lastElementChild);
  });
  //отслеживание кликов вне инпута и вариантов
  document.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;
    //при клике вне формы закрыть/удалить выделение с ряда
    if (!searchForm.contains(target) && isSearchField()) {
      removeSearchList();
      searchInput.ariaExpanded = 'false';
      return;
    };

    if (!isSearchField()) {
      removeChosenRowClass();
      return;
    };
  });
  //функция отрисовки поля вариантов
  function createResultField(clientsArray) {
    const field = document.createElement('ul');
    const announcement = document.createElement('div');
    field.role = 'listbox';
    announcement.ariaLive = 'off';
    announcement.role = 'alert';
    announcement.classList.add('visually-hidden');

    field.classList.add('header__search-field', 'search-field');
    searchInput.ariaExpanded = 'true';
    searchForm.append(announcement, field);

    if (clientsArray.length) {
      clientsArray.forEach((client) => {
        renderSearchResultItem(client, field);
      });
    };
  }
  //функция отрисовки одного варианта
  function renderSearchResultItem(clientObj, field) {
    const item = document.createElement('li');
    const link = document.createElement('a');

    item.role = 'option';
    item.classList.add('search-field__item');
    link.classList.add('link', 'search-field__link');

    item.textContent = `${clientObj.name} ${clientObj.surname}`;
    link.textContent = `ID: ${clientObj.id}`;
    link.href = `#${clientObj.id}`;

    item.append(link);
    field.append(item);

    document.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;
      if (item.contains(target) && isSearchField()) {
        let targetId = target.href.split('#')[1];
        let chosenRow = document.getElementById(`${targetId}`);
        chosenRow.classList.add('row--chosen');
        chosenRow.scrollIntoView({
          block: 'nearest',
        });
        removeSearchList();
        searchInput.ariaExpanded = 'false';
        searchInput.value = '';
        return;
      };
    });
  }
  //проверка наличия списка вариантов
  function isSearchField() {
    const field = searchForm.querySelector('ul');
    return !!field;
  }
  //очистка поля вариантов и блока для озвучки выбранного варианта
  function removeSearchList() {
    searchForm.lastElementChild.remove();
    searchForm.querySelectorAll('[role="alert"]').forEach((div) => div.remove());
  }
  //функция озвучки выбранного варианта
  function announceClient(text, field) {
    field.previousElementSibling.textContent = `Клиент: ${text}`;
    field.previousElementSibling.setAttribute('aria-live', 'assertive');
    setTimeout(() => {
      field.previousElementSibling.textContent = '';
      field.previousElementSibling.setAttribute('aria-live', 'off');
    }, 500);
  };
  //функция сброса выделения поля найденного контакта
  function removeChosenRowClass() {
    const chosenRow = document.querySelectorAll('.row--chosen');
    chosenRow.forEach((row) => row.classList.remove('row--chosen'));
  }
  //функция обработки клавиш при инпуте
  function handleKeyPressSearch(e, field) {
    switch (e.key) {
      case 'Escape':
      case 'Tab':
        field.remove();
        searchInput.ariaExpanded = 'false';
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        closeSearchField(field);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveSearchFocusDown(field);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveSearchFocusUp(field);
        break;
    }
  }
  //функция, листать опции вниз
  function moveSearchFocusDown(field) {
    let selectedClient = findCurrentClient(field);
    (selectedClient.currentIndex < (field.childNodes.length - 1)) ? selectedClient.currentIndex += 1 : selectedClient.currentIndex = 0;

    focusCurrentSearchResult(field, selectedClient.currentIndex);
  };
  //функция, листать опции вверх
  function moveSearchFocusUp(field) {
    let selectedClient = findCurrentClient(field);
    (selectedClient.currentIndex > 0) ? selectedClient.currentIndex -= 1 : selectedClient.currentIndex = field.childNodes.length - 1;

    focusCurrentSearchResult(field, selectedClient.currentIndex);
  };
  //функция убирает поле результатов поиска и очищает инпут
  function closeSearchField(field) {
    selectClient(field);
    removeSearchList();
    searchInput.ariaExpanded = 'false';
    searchInput.value = '';
  }
  //функция ищет выделенного клиента из списка поиска
  function findCurrentClient(field) {
    let selectedClient;
    let currentIndex;
    field.childNodes.forEach((client, index) => {
      if (client.ariaSelected === 'true') {
        selectedClient = client;
        currentIndex = index;
      }
    });
    return { selectedClient, currentIndex };
  }
  //функция фокусировки на выбранном клиенте из вариантов
  function focusCurrentSearchResult(field, index) {
    let currentClient = field.childNodes[index];
    field.childNodes.forEach((client) => {
      client.ariaSelected = false;
      client.classList.remove('search-field__item--hover');
    });
    currentClient.ariaSelected = true;
    currentClient.classList.add('search-field__item--hover');

    announceClient(currentClient.textContent, field)
  }
  //функция выделяет и скроллит к выбранному клиенту в таблице
  function selectClient(field) {
    const selectedClient = findCurrentClient(field).selectedClient;
    const clientId = selectedClient.lastElementChild.href.split('#')[1];
    const chosenRow = document.getElementById(`${clientId}`);
    chosenRow.classList.add('row--chosen');
    searchInput.blur();
    chosenRow.focus();
    chosenRow.scrollIntoView({
      block: 'nearest',
    });
  }

  //*----------первичная отрисовка страницы
  clientsArray = await getClientsArray();
  renderClientsTable(clientsArray);
})();
