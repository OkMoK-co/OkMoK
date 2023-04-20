FROM alpine:3.17.2

# apk install
RUN apk update
RUN apk add g++ make cmake poco-dev

# copy files
RUN mkdir -p /server/app /server/scripts

COPY app /server/app
COPY Makefile /server
COPY scripts /server/scripts

# move workdir
WORKDIR /server

# port
EXPOSE 8080

CMD ["sh", "-c", "make && make run"]
