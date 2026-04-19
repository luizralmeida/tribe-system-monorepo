# Estágio 1: Build (Compilação)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Aqui o Vue gera a pasta /dist com os arquivos finais
RUN npm run build

# Estágio 2: Produção (Servidor Web)
FROM nginx:stable-alpine AS production-stage
# Copia os arquivos estáticos do estágio anterior para a pasta do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Expõe a porta 80 (padrão web)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]