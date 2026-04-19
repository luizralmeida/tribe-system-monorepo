# Estágio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências de dentro de apps/tribe-api
COPY package*.json ./
RUN npm install

# Copia o restante do código da API
COPY . .

# Gera a pasta /dist
RUN npm run build

# ---------------------------------------------------------

# Estágio 2: Execução (Runtime)
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário do estágio de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instala apenas dependências de produção para economizar espaço na VPS
RUN npm install

EXPOSE 3000

CMD ["node", "dist/main"]