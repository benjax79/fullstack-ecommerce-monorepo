# Etapa 1: Build de React/Vite
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Construimos la versión optimizada de producción
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Copiamos la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos construidos desde la Etapa 1
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 5173 para respetar tu puerto de desarrollo
EXPOSE 5173

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]
