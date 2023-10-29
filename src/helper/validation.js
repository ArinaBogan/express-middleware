function isValidUserId(req, res, next) {
    const { id } = req.params;

    if (!id) throw new Error('id can not be empty');
    if (isNaN(id)) throw new Error('id must be a number');

    next();
};

function isValidUserData(req, res, next) {

    const { name, surname, email, pwd } = req.body;
    if (!name) throw new Error('name can not be empty');
    if (!isNaN(name)) throw new Error('name can not be a number');

    if (!surname) throw new Error('surname can not be empty');
    if (!isNaN(surname)) throw new Error('surname can not be a number');

    if (!email) throw new Error('email can not be empty');
    if (!/^[a-zA-Z0-9\.\-\_]+@[a-z]+\.[a-z]+$/gm.test(email)) throw new Error('email entered incorrectly')

    if (!pwd) throw new Error('pwd can not be empty');
    if (pwd.length < 8) throw new Error('pwd length must be more 8 symbols')

    next();
};

module.exports = { isValidUserId, isValidUserData };