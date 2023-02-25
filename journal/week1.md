# Week 1 — App Containerization

# Required Homework


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
 
    
 ## Learn how to install Docker on your localmachine and get the same containers running outside of Gitpod / Codespaces
  - I already have Docker Desktop on my local machine
  - I pulled images carlosern/front and carlosern/backend  from my dockerhub repository
  - The backend works without changes
  - The fronted needs to get an updated ENV VAR for my localhost, something like this

  ```
  docker run -p 3000:3000 -d -e REACT_APP_BACKEND_URL='http://127.0.0.1:4567' carlosern/front
  ```
![2023-02-22 21 16 14 running cruddur on localhost](https://user-images.githubusercontent.com/9203226/221331658-e2b4abdc-1b50-4db9-86c5-73b67ad04cdf.jpg)


- Launch an EC2 instance that has docker installed, and pull a container to demonstrate you can run your own docker processes.
