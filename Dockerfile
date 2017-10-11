# Base image
FROM library/node:latest

# Maintainer
MAINTAINER Code 9 <code9@gamil.com>

# Set Workdir
WORKDIR /home/app/KPMG

# Get package.json
COPY package.json .
RUN chown -R node .

# Install dependencies
RUN \
npm install -g \
  mocha \
  nodemon 

RUN \
npm install

# Get source
COPY . .

# Expose ports
EXPOSE 4000

# Command
CMD ["npm", "run", "dev"]
