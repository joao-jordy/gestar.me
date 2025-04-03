#!/bin/bash

./mvnw package -Pprod -DskipTests

heroku deploy:jar target/*.jar --app gestarme
