FROM mcr.microsoft.com/playwright:v1.40.1-jammy

WORKDIR /test
COPY . /test

# Установка зависимостей
RUN npm ci 

CMD [ "npm", "run", "docker-test" ]
