FROM node:18-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos primero el package.json para aprovechar la caché de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto del backend
EXPOSE 3000

# Comando para iniciar la aplicación (se usa start en prod, pero acá usaremos el index directo o el start que tengas)
CMD ["npm", "start"]
