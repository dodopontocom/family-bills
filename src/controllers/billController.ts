import { Request, Response } from 'express';
import Bill, { IBill } from '../models/Bill';

// Criar uma nova conta
export const createBill = async (req: Request, res: Response) => {
  try {
    const { name, description, type, day, alert } = req.body;

    // Verificar os dados recebidos
    console.log('Dados recebidos:', req.body);

    // Obter a data atual
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const dueDate = new Date(currentYear, currentMonth, day);

    if (!name || !type || !dueDate) {
      return res.status(400).send('Campos obrigatórios estão faltando');
    }

    const newBill: IBill = new Bill({
      name,
      description,
      type: 'Outros',
      dueDate,
      alert,
      status: 'unpaid', // Padrão para "não paga" ao criar
    });

    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a conta', error });
  }
};

// Obter todas as contas
export const getBills = async (req: Request, res: Response) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as contas', error });
  }
};

// Atualizar o status de uma conta (pagar/despagar)
export const updateBillStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBill = await Bill.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }

    res.json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a conta', error });
  }
};

// Deletar uma conta
export const deleteBill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBill = await Bill.findByIdAndDelete(id);

    if (!deletedBill) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }

    res.json({ message: 'Conta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a conta', error });
  }
};

