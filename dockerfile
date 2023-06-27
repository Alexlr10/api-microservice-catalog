# Use a Node.js base image
FROM node:14-alpine

# Crie um diretório de trabalho para o aplicativo
WORKDIR /app

# Copie o arquivo package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie o código-fonte do aplicativo para o diretório de trabalho
COPY . .

# Exponha a porta em que o aplicativo é executado
EXPOSE 3000

# Inicie o aplicativo
CMD [ "npm", "start" ]
