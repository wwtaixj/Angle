
# build backend
FROM node:lts-alpine AS backend

RUN npm install pnpm -g

WORKDIR /app

COPY package.json /app

COPY pnpm-lock.yaml /app

RUN pnpm install

COPY . /app

RUN pnpm build

# service
FROM node:lts-alpine

RUN npm install pnpm -g

WORKDIR /app

COPY package.json /app

COPY pnpm-lock.yaml /app

RUN pnpm install --production && rm -rf /root/.npm /root/.pnpm-store /usr/local/share/.cache /tmp/*

COPY . /app

COPY --from=backend /app/build /app/build

EXPOSE 9310

CMD ["pnpm", "run", "prod"] 
