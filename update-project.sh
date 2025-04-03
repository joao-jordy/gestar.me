#!/bin/bash

function configureCustomizations() {

    printf "\nAplicando Customizações\n"
     
    cp -R custom/* .

    ./setup-default-data.sh

}

rm -fr src/ webpack/

git add jhipster-jdl.jh

git commit -m "atualização de jhipster-jdl.jh"

git add custom

git commit -m "atualização de customizações"

git push origin master

git reset --hard HEAD

git clean -fd

git fetch 

git pull --rebase

jhipster --skip-prompts --force

jhipster import-jdl jhipster-jdl.jh --skip-prompts --force

if [ "${1}" != "nocustom" ]; then
    configureCustomizations
fi

mvn clean && ./mvnw #package #-Pprod

#nohup xdg-open "http://localhost:8080" >/dev/null 2>&1 

#nohup xdg-open "http://localhost:8080/h2-console" >/dev/null 2>&1

