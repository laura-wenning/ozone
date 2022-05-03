FROM node:12
COPY . /usr/src/app/
WORKDIR /usr/src/app/

# Clean up existing distribution files
RUN rm -rf dist

RUN yarn
RUN yarn build

# Clean up unused code for smaller package
# TODO - can we clean up node_modules?
RUN rm -rf src

CMD yarn start

