FROM node:14.15.3 as build

WORKDIR /app

COPY . /app

ENV PATH /app/node_modules/.bin:$PATH

RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    nasm \
 && rm -rf /var/lib/apt/lists/*

RUN yarn config delete proxy
Run npm config rm proxy

RUN npm config rm https-proxy

RUN yarn


RUN chmod +x /app/entrypoint.sh



CMD ["/app/entrypoint.sh"]