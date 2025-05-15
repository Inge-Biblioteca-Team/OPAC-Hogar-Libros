# Etapa de construcción
FROM node:18 AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Argumentos para el build
ARG VITE_BASE_URL

# Ejecutar build
RUN npm run build

# Etapa runtime
FROM node:18-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
