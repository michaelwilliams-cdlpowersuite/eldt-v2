# build stage
FROM node:lts-alpine3.18 as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --omit=dev

COPY . .

ARG CI_COMMIT_SHA=empty
ENV CI_COMMIT_SHA=${CI_COMMIT_SHA}

ARG BUILD_DATE=empty
ENV BUILD_DATE=${BUILD_DATE}

ARG SENTRY_AUTH_TOKEN=empty
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

ARG REACT_APP_API_URL=empty
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

ARG REACT_APP_DEFAULT_COMPANY_ID=empty
ENV REACT_APP_DEFAULT_COMPANY_ID=${REACT_APP_DEFAULT_COMPANY_ID}

RUN printf "export class AppVersion {\n  public static readonly hash = '$CI_COMMIT_SHA';\n  public static readonly date = '$BUILD_DATE';\n}" > ./src/version.ts

RUN npm run build

# production stage
FROM nginx:1.27.2 as production

COPY ./docker/app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /var/www/

RUN rm -rf /var/www/*.js.map

CMD ["nginx", "-g", "daemon off;"]
