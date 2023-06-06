Conectarse a ECR
./bin/ecr/login 

Iniciar el Docker Compose

Crear BD postgres local
./bin/db/setup 

Poblar con datos de prueba
./backend-flask/bin/db/seed 


instalar boto3 primero
pip install -r ./backend-flask/requirements.txt


Crear DyanamoDB local
./backend-flask/bin/ddb/schema-load


Poblar con datos de prueba
./backend-flask/bin/ddb/seed 

Get Conversations
./backend-flask/bin/ddb/patterns/get-conversations 


