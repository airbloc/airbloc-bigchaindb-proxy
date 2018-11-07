const app = require('./src/app');

app.main().catch((err) => {
    console.error(err.stack);
});
