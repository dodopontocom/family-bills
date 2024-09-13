# Etapa 1: Construção
FROM node:18 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte
COPY . .

# Compile o TypeScript
RUN npm run build

# Etapa 2: Imagem de Produção
FROM node:18-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os artefatos necessários da etapa de construção
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Exponha a porta que o servidor vai escutar
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
