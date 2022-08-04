
FROM node:16-alpine3.15 as dev




RUN mkdir dashr
# Docker working directory
WORKDIR /dashr


COPY . /dashr/
# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /dashr/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder



ENV NODE_ENV=development



COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]


