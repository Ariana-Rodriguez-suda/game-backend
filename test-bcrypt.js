const bcrypt = require('bcrypt');

const passwordIngresada = 'rockye';
const hashDesdeDB = '$2b$10$w0cmObBpe0bd.NfAOiZ0rOObhyhErAun44pxbmMc3dOwhujZfTP4e';

bcrypt.compare(passwordIngresada, hashDesdeDB).then(result => console.log(result));
