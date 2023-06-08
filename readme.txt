CORRER LA APP LOCAL

Conectarse a ECR
./bin/ecr/login 

Iniciar el Docker Compose

Crear BD postgres local
./bin/db/setup 

Poblar con datos de prueba
./bin/db/seed 


instalar boto3 primero
pip install -r ./backend-flask/requirements.txt


Crear DyanamoDB local
./bin/ddb/schema-load


Poblar con datos de prueba
./bin/ddb/seed 

Get Conversations
./bin/ddb/patterns/get-conversations 


