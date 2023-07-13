const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/users', (req, res) => {
  // Здесь будет обработка запроса и поиск подходящих пользователей в JSON
  const { email, number } = req.query;
  console.log('route users is worked', 'params', email, number)
  // Пример обработки запроса и фильтрации пользователей
  const users = [
    { email: 'jim@gmail.com', number: '221122' },
    { email: 'jam@gmail.com', number: '830347' },
    { email: 'john@gmail.com', number: '221122' },
    { email: 'jams@gmail.com', number: '349425' },
    { email: 'jams@gmail.com', number: '141424' },
    { email: 'jill@gmail.com', number: '822287' },
    { email: 'jill@gmail.com', number: '822286' },
  ];

  // Фильтруем пользователей на основе поискового запроса
  const filteredUsers = users.filter((user) => {
    // Проверяем, соответствует ли пользователь поисковому запросу
    return (
      (email === undefined || user.email.toLowerCase().includes(email.toLowerCase())) &&
      (number === undefined || user.number.includes(number))
    );
  });

  res.json(filteredUsers);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});