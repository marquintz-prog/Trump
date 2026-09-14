import pool from './db.js';

async function testarBanco() {
    try {
        const resultado = await pool.query(
            'SELECT * FROM equipamentos'
        );

        console.log('Equipamentos cadastrados:');
        console.table(resultado.rows);

    } catch (erro) {
        console.error('Erro ao consultar o banco:', erro);

    } finally {
        await pool.end();
    }
}

testarBanco();