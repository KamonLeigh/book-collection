const process = require('process');
const { magenta } = require('chalk')
const app = require('./app');
const shutdown = require('./util/shutdown');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(magenta(`Server is running on ${port}`)));

const exitHandler = shutdown(server, {
  coredump: false,
  timeout: 500,
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promisw'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
