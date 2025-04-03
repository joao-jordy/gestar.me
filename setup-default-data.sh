#!/bin/bash

pattern='s|file="config/liquibase/fake-data|file="config/liquibase/data|g'

patternContext='s/context="faker"/context="faker, prod"/g'

cd ./src/main/resources/config/liquibase/changelog/

#find . -name "*.xml" -exec sed -i "${pattern}" {} \; 
#find . -name "*.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*AntecedenteDeSaude.xml" -exec sed -i "${pattern}" {} \; 
find . -name "*AntecedenteDeSaude.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*AspectoDoRecemNascido.xml" -exec sed -i "${pattern}" {} \;
find . -name "*AspectoDoRecemNascido.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*EspecialidadeMedica.xml" -exec sed -i "${pattern}" {} \;
find . -name "*EspecialidadeMedica.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*EstadoCivil.xml" -exec sed -i "${pattern}" {} \;
find . -name "*EstadoCivil.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*GrauDeParentesco.xml" -exec sed -i "${pattern}" {} \;
find . -name "*GrauDeParentesco.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*IndicacaoDeCesarea.xml" -exec sed -i "${pattern}" {} \;
find . -name "*IndicacaoDeCesarea.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*IntercorrenciaDaGestacao.xml" -exec sed -i "${pattern}" {} \;
find . -name "*IntercorrenciaDaGestacao.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*IntercorrenciaDoParto.xml" -exec sed -i "${pattern}" {} \;
find . -name "*IntercorrenciaDoParto.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*LocalDeNascimento.xml" -exec sed -i "${pattern}" {} \;
find . -name "*LocalDeNascimento.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*NivelDeEscolaridade.xml" -exec sed -i "${pattern}" {} \;
find . -name "*NivelDeEscolaridade.xml" -exec sed -i "${patternContext}" {} \;
 
find . -name "*Ocupacao.xml" -exec sed -i "${pattern}" {} \;
find . -name "*Ocupacao.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*PlanoDeSaude.xml" -exec sed -i "${pattern}" {} \;
find . -name "*PlanoDeSaude.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*PosicaoDeParto.xml" -exec sed -i "${pattern}" {} \;
find . -name "*PosicaoDeParto.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*Profissao.xml" -exec sed -i "${pattern}" {} \;
find . -name "*Profissao.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*Sexo.xml" -exec sed -i "${pattern}" {} \;
find . -name "*Sexo.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*TipoSanguineo.xml" -exec sed -i "${pattern}" {} \;
find . -name "*TipoSanguineo.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*UnidadeFederativa.xml" -exec sed -i "${pattern}" {} \;
find . -name "*UnidadeFederativa.xml" -exec sed -i "${patternContext}" {} \; 

find . -name "*ViaDeParto.xml" -exec sed -i "${pattern}" {} \;
find . -name "*ViaDeParto.xml" -exec sed -i "${patternContext}" {} \; 
