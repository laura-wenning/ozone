#!/usr/bin/env bash

version=$(awk -F ' = ' '$1 ~ /version/ { gsub(/[\"]/, "", $2); printf("%s",$2) }' Cargo.toml)
docker build -t ozone:${version} -t ozone:latest .
