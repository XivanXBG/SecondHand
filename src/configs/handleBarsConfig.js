const handlebars = require('express-handlebars')


const handleBarsConfig = (app) => {
    app.engine('hbs', handlebars.engine({ extname: 'hbs' })); // set the template engine to hbs
    app.set('view engine', 'hbs');
    app.set('views', 'src/views');
}

module.exports = handleBarsConfig;