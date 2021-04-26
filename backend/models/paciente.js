const db = require('../util/database');

module.exports = class Grocery {
    constructor(idPaciente, nomePaciente, cpfPaciente, leito, data_internacao, data_alta) {
        this.idPaciente = idPaciente;
        this.nomePaciente = nomePaciente;
        this.cpfPaciente = cpfPaciente;
        this.leito = leito;
        this.data_internacao = data_internacao;
        this.data_alta = data_alta;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM pacientes')
    }

    static post(nomePaciente, cpfPaciente, leito, data_internacao, data_alta) {
        return db.execute('INSERT INTO pacientes (nomePaciente, cpfPaciente, leito, data_internacao, data_alta) VALUES (?,?,?,?,?)', [nomePaciente, cpfPaciente, leito, data_internacao, data_alta]);
    }

    static update(idPaciente, nomePaciente, cpfPaciente, leito, data_internacao, data_alta) {
        return db.execute('UPDATE pacientes SET nomePaciente=?, cpfPaciente=?, leito=?, data_internacao=?, data_alta=? WHERE idPaciente=?', [nomePaciente, cpfPaciente, leito, data_internacao, data_alta, idPaciente]);
    }

    static delete(idPaciente) {
        return db.execute('DELETE FROM pacientes WHERE idPaciente=?', [idPaciente]);
    }
};