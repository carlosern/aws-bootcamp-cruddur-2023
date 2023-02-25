# Week 1 — App Containerization

# Required Homework

### Document the Notification Endpoint for the OpenAI Document

I updated the openapi-3.0.yml using the help of the OpenAPI extension
![2023-02-22 20 24 52 OpenApi file updated](https://user-images.githubusercontent.com/9203226/221331750-89ae14aa-e833-4656-8d8d-087eebf52135.jpg)

### Write a Flask Backend Endpoint for Notifications

I was able to implement the path for notification api
![2023-02-22 20 29 51 backend api](https://user-images.githubusercontent.com/9203226/221331771-2e93fa24-91cc-42e2-845a-b31915070db3.jpg)

### Write a React Page for Notifications

I was able to implement the functions for notification page
![2023-02-22 20 32 41 front api](https://user-images.githubusercontent.com/9203226/221331840-fa7fbb2d-93e9-4171-8f3c-3a606303067e.jpg)

### Run DynamoDB Local Container and ensure it works
I was able to run DynamoDB locally in a container following de video instructions
![2023-02-22 20 18 20 dynamoDB Local Up and running](https://user-images.githubusercontent.com/9203226/221331891-7a40b372-b601-4a58-a36f-458be7382b45.jpg)

### Run Postgres Container and ensure it works
I was able to run Postgres in a container following de video instructions
![2023-02-22 20 15 00 postgres up and running](https://user-images.githubusercontent.com/9203226/221331913-2140be67-6bd3-45f7-b396-d4953a74404c.jpg)







# Homework Challenges

### Run the dockerfile CMD as an external script
  - I did the following:
      - Created a sh script in the root of the backend project called _start.sh_
      - Updated de Dockerfile: add a COPY command to copy the _start.sh_ file to the container. The same way as requirements.txt is copied
      - Updated the CMD command as follow CMD sh _start.sh_
      - The container works OK
![2023-02-24 21 48 38 docker CMD script](https://user-images.githubusercontent.com/9203226/221331270-26db9b52-343d-412d-aa93-1739a6f1b995.jpg)


### Push and tag a image to DockerHub (they have a free tier)
  - I was able to push the images created in gitpod to my dockerhub account. First, I had to create the images with the syntax user/image, I tagged it carlosern/backend and carlosern/front just for testing
![2023-02-24 21 55 33 dockerhub](https://user-images.githubusercontent.com/9203226/221331337-7b507834-5d72-43d7-bbf4-6414b0ea1497.jpg)


 

 

### Implement a healthcheck in the V3 Docker compose file
  - I researched about health checks in Docker, and founded this very informative post  [How (and Why) to Add Health Checks to Your Docker Containers](https://www.howtogeek.com/devops/how-and-why-to-add-health-checks-to-your-docker-containers/)
  - I was able to set a heltcheck for the backend-flask container
   ![2023-02-24 22 14 35 healtcheck](https://user-images.githubusercontent.com/9203226/221331413-c4b09856-e41a-400b-b374-fa699792aefb.jpg)
 
 ### Research best practices of Dockerfiles and attempt to implement it in your Dockerfile
  - For the healtcheck I had to install curl in the backend-flask container, and I followed an example as follows:
```
RUN apt-get update
RUN apt-get install -y curl
```
- Now,  I followed one of the best practices [how-to-keep-your-images-small](https://docs.docker.com/develop/dev-best-practices/#how-to-keep-your-images-small) and put all RUN commands in one line, as follows
```
RUN pip3 install -r requirements.txt && apt-get update && apt-get install -y curl
```

 ### Learn how to install Docker on your localmachine and get the same containers running outside of Gitpod / Codespaces
  - I already have Docker Desktop on my local machine
  - I pulled images carlosern/front and carlosern/backend  from my dockerhub repository
  - The backend works without changes
  - The frontend needed an updated ENV VAR for my localhost, something like this

  ```
  docker run -p 3000:3000 -d -e REACT_APP_BACKEND_URL='http://127.0.0.1:4567' carlosern/front
  ```
![2023-02-22 21 16 14 running cruddur on localhost](https://user-images.githubusercontent.com/9203226/221331658-e2b4abdc-1b50-4db9-86c5-73b67ad04cdf.jpg)


- Launch an EC2 instance that has docker installed, and pull a container to demonstrate you can run your own docker processes.
