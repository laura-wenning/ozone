FROM rust:latest as builder
WORKDIR /usr/src/ozone

COPY . .

RUN cargo install --path .

FROM ubuntu:latest
RUN apt-get update && apt-get install -y libc6 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/ozone /usr/local/bin/ozone
CMD ["ozone"]
