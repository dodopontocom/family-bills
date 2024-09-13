# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos do projeto para o diretório de trabalho
COPY package*.json ./
RUN npm install
COPY . .

# Expõe a porta que a aplicação vai usar
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

