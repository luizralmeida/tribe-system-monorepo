# Estágio 1: Build (Compilação)
FROM node:20-alpine AS build-stage
WORKDIR /app

# Adiciona argumentos de build para as variáveis de ambiente do Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install
COPY . .
# O Vite usará a variável de ambiente definida acima durante o build
RUN npm run build

# Estágio 2: Produção (Servidor Web)
FROM nginx:stable-alpine AS production-stage
# Copia o arquivo de configuração personalizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia os arquivos estáticos do estágio anterior
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]