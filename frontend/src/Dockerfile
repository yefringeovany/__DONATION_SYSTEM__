# Usa una imagen oficial de Node.js como imagen base
FROM node:14
# Establece el directorio de trabajo en el contenedor
WORKDIR /frontend
# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./
# Instala las dependencias del proyecto
RUN npm install
# Copia el resto del código de tu aplicación al contenedor
COPY . .
# Construye tu aplicación React
RUN npm run build
# Expone el puerto en el que funcionará tu aplicación (por ejemplo, el puerto 80)
EXPOSE 80
# Inicia tu aplicación React cuando se inicie el contenedor
CMD ["npm", "start"]
