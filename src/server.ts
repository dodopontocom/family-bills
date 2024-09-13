import express from 'express';
import connectDB from './database';
import { createBill, getBills, updateBillStatus, deleteBill } from './controllers/billController';
import path from 'path';
import bodyParser from 'body-parser';

// Inicializa o app Express
const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Configurar a pasta pública para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas para gerenciar as contas
app.post('/api/cadastrar-conta', createBill);       // Criar uma nova conta
app.get('/api/bills', getBills);          // Obter todas as contas
app.patch('/api/bills/:id/status', updateBillStatus);  // Atualizar o status de uma conta
app.delete('/api/bills/:id', deleteBill); // Deletar uma conta

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Rota para a página de cadastro de contas
app.get('/cadastrar-conta', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/cadastrar-conta.html'));
});

// Inicializar o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
