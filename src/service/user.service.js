const fs = require('fs');
const path = './storage/storage.json';

class Service {
    getAllUsers() {
        const data = JSON.parse(fs.readFileSync(path));
        if (!data.length) throw new Error('data is empty');
        return data;
    };

    getUserById(id) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.id == id);
        if (!filtered.length) throw new Error('id is not found');
        return filtered;
    };

    createUser(name, surname, email, pwd) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.email == email)
        if (filtered.length > 0) throw new Error('email already exist');
        const item = {
            id: data.length + 1,
            name: name,
            surname: surname,
            email: email,
            pwd: pwd
        };
        data.push(item);
        fs.writeFileSync(path, JSON.stringify(filtered));
        return data;
    };

    updateUserById(id, name, surname, email, pwd) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.id != id)
        if (filtered.length == data.length) throw new Error('id is not found');
        const item = {
            id, name, surname, email, pwd
        };
        filtered.push(item);
        fs.writeFileSync(path, JSON.stringify(filtered));
        return filtered;
    };

    patchUser(id, clientObj) {
        const data = JSON.parse(fs.readFileSync(path));
        const oldDate = data.find((el) => el.id == id);
        const newData = { ...oldDate, ...clientObj };
        const filtered = data.filter((el) => el.id != id);
        if (filtered.length == data.length) throw new Error('id is not found');
        filtered.push(newData);
        fs.writeFileSync(path, JSON.stringify(filtered));
        return filtered;
    };

    deleteUserById(id) {
        const data = JSON.parse(fs.readFileSync(path));
        const filtered = data.filter((el) => el.id != id)
        if (filtered.length == data.length) throw new Error('id is not found');
        fs.writeFileSync(path, JSON.stringify(filtered));
        return filtered;
    };
};

module.exports = Service;