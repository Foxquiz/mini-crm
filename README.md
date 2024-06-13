<h1>Список клиентов (mini-crm)</h1>
<p>HTML, JS, CSS, backend-часть была предоставлена.</p>

<h3>Описание:</h3> 
<p>Программа для работы с контактной информацией всех клиентов с базовым функционалом.</p>
<h4>Что хотелось бы выделить:</h4>
<p>Селект и tooltip кастомные, не из библиотеки. Селект доступен и с клавиатуры, а при 'хождении' по нему с включённой соответствующей программой варианты будут озвучиваться.
Выпадающий список поиска клиента также озвучивается и доступен с клавиатуры. При выборе клиента фокус будет на его строке в таблице.</p>
<h3>Реализована интерфейсная часть проекта, куда входит:</h3> 
<ul>
  <li>просмотр списка клиентов в виде таблицы;</li>
  <li>добавление нового клиента;</li>
  <li>изменение информации о существующем клиенте;</li>
  <li>удаление клиента;</li>
  <li>сортировка таблицы (по id, ФИО, датам изменений);</li>
  <li>поиск клиента (реализован выпадающий список с подсвечиванием и скроллом к нужной строке в таблице);</li>
  <li>отображение контактов клиента (tooltip при наведении);</li>
  <li>ссылка на карточку клиента;</li>
  <li>валидация данных перед отправкой на сервер (в том числе маска для РФ телефонных номеров);</li>
  <li>индикация загрузки (для кнопок, самой таблицы).</li>
</ul>

<p>Модули только для иконок, т.к. по программе на момент выполнения работы модулей ещё не было.</p>
### Запуск режима разработки

```sh
backend: node index
frontend: e.g., live server
```

<img src='https://i.postimg.cc/PfFBnMLJ/2024-03-05-160110.png' alt='внешний вид таблицы'>
<img src='https://i.postimg.cc/WzrwdrVR/2024-03-05-161045.png' alt='выпадающий поиск'>
<img src='https://i.postimg.cc/nzm3DNKw/2024-03-05-161418.png' alt='модальное окно создания клиента'>
<img src='https://i.postimg.cc/9MsBXbvt/2024-03-05-161151.png' alt='модальное окно изменения клиента'>

