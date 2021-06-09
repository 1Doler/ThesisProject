//Подключение библиотек для работы с сервером
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
//получение ПОРТА из config
const PORT = config.get('serverPort');

app.use(express.json({extended: true}));

//Все запроси
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/auth', require('./routes/board.routes'))
app.use('/api/auth', require('./routes/task.routes'))

const start = async () => {
    try {
        //Соединение к MONGODB
        await mongoose.connect(config.get('dbUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, ()=>{
            //При успешной подкл. выводится данное сообщение
            console.log('Server started on portcl', PORT)
        });
    } catch(e) {
        //При ошибке выводится это сообщение
        console.log('Сервер не был запущен. Произошла ошибка!!!')
    }
}
start();