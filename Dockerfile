# Define a imagem base
FROM node:16-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos da aplicação para o diretório de trabalho
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Expõe a porta em que a aplicação está sendo executada
EXPOSE 3000

# Inicia o servidor
CMD ["npm", "start"]
