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
ARG VITE_GOOGLE_API_KEY
ARG VITE_GOOGLE_BOOKS_URL
ARG VITE_OPEN_LIBRARY_URL
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_API_KEY
ARG VITE_EMAILJS_FEEDBACK_TEMPLATE_ID

# Ejecutar build
RUN npm run build

# La imagen solo necesita exponer el puerto de la app de React
EXPOSE 3000
