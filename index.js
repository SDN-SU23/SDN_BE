const app = require('./src/app');

app.listen(8080, () => {
    console.log('Server started on port 8080');
})

module.exports = app;