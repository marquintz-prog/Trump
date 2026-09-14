import express from 'express';
import EquipmentService from '../services/EquipmentService.js';

const router = express.Router();

const service = new EquipmentService();

// Listar todos os equipamentos
router.get('/equipamentos', async (req, res) => {
    const equipamentos = await service.listarTodos();

    res.json(equipamentos);
});

// Buscar equipamento pelo ID
router.get('/equipamentos/:id', async (req, res) => {
    const id = Number(req.params.id);

    const equipamento = await service.buscarPorId(id);

    if (!equipamento) {
        return res.status(404).json({
            mensagem: 'Equipamento não encontrado'
        });
    }

    res.json(equipamento);
});

// Cadastrar equipamento
router.post('/equipamentos', async (req, res) => {
    const { nome, categoria, condicao, disponivel } = req.body;

    const equipamento = await service.cadastrar(
        nome,
        categoria,
        condicao,
        disponivel
    );

    res.status(201).json(equipamento);
});

// Alterar somente a disponibilidade
router.patch('/equipamentos/:id/disponibilidade', async (req, res) => {
    const id = Number(req.params.id);
    const { disponivel } = req.body;

    const equipamento = await service.alterarDisponibilidade(
        id,
        disponivel
    );

    if (!equipamento) {
        return res.status(404).json({
            mensagem: 'Equipamento não encontrado'
        });
    }

    res.json(equipamento);
});

export default router;