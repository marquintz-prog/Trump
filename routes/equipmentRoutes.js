import express from 'express';
import EquipmentService from '../services/EquipmentService.js';

const router = express.Router();

const service = new EquipmentService();

// Listar todos os equipamentos
router.get('/equipamentos', async (req, res) => {
    try {
        const equipamentos = await service.listarTodos();

        res.status(200).json(equipamentos);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
});

// Buscar equipamento por ID
router.get('/equipamentos/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'O identificador deve ser um número inteiro positivo'
            });
        }

        const equipamento = await service.buscarPorId(id);

        if (!equipamento) {
            return res.status(404).json({
                erro: 'Equipamento não encontrado'
            });
        }

        res.status(200).json(equipamento);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
});

// Cadastrar equipamento
router.post('/equipamentos', async (req, res) => {
    try {
        const { nome, categoria, condicao, disponivel } = req.body;

        if (
            !nome ||
            !categoria ||
            typeof disponivel !== 'boolean'
        ) {
            return res.status(400).json({
                erro: 'Nome, categoria e disponibilidade são obrigatórios'
            });
        }

        const equipamento = await service.cadastrar(
            nome,
            categoria,
            condicao,
            disponivel
        );

        res.status(201).json(equipamento);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
});

// Alterar somente a disponibilidade
router.patch('/equipamentos/:id/disponibilidade', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { disponivel } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                erro: 'O identificador deve ser um número inteiro positivo'
            });
        }

        if (typeof disponivel !== 'boolean') {
            return res.status(400).json({
                erro: 'O campo disponivel deve ser booleano'
            });
        }

        const equipamento = await service.alterarDisponibilidade(
            id,
            disponivel
        );

        if (!equipamento) {
            return res.status(404).json({
                erro: 'Equipamento não encontrado'
            });
        }

        res.status(200).json(equipamento);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
});

export default router;