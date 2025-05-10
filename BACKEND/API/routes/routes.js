const express = require('express');
const router = express.Router();
const modeloTarefa = require('../models/tarefa');

// Criar nova tarefa
router.post('/post', async (req, res) => {
  try {
    const novaTarefa = new modeloTarefa({
      descricao: req.body.descricao,
      statusRealizada: req.body.statusRealizada
    });
    const salva = await novaTarefa.save();
    res.status(200).json(salva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Listar todas
router.get('/getAll', async (req, res) => {
  try {
    const tarefas = await modeloTarefa.find();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deletar por ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletada = await modeloTarefa.findByIdAndDelete(req.params.id);
    if (!deletada) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(deletada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar por ID
router.patch('/update/:id', async (req, res) => {
  try {
    const atualizada = await modeloTarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizada) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(atualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
