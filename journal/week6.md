# Week 6-7 — Serverless Containers

So far, the most interesting week for me.

I had never had the opportunity to interact with Route53, Load Balancer, Target Group, SSL Certificates before. Now I see how they work, and it's no longer intimidating.

Everything related to Elastic Container Service Fargate was fantastic! I managed to understand the cluster structure, Tasks, and Services. Deploying Containers in ECR was a truly excellent experience gained here.

## Provision ECS Cluster

![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/98ded4b8-b02c-40e8-b6eb-d60453d701a3)

## Create ECR repo and push image for backend-flask

![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/20d9e075-3571-4f3b-b200-77413504d22d)

## Deploy Backend Flask app as a service to Fargate
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/96bec04b-7a7e-46af-8cf8-aca26c4f2c6c)

## Create ECR repo and push image for fronted-react-js	

![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/20d9e075-3571-4f3b-b200-77413504d22d)

## Deploy Frontend React JS app as a service to Fargate
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/c622e133-c31e-422e-b43b-5eac29827b2e)

## Provision and configure Application Load Balancer along with target groups

![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/3518a485-13d2-4263-9dc6-29c61f162fe8)


## Manage your domain useing Route53 via hosted zone	
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/74c27f37-61f0-40f6-b379-92065e4ae0f1)


## Create an SSL cerificate via ACM	
###  Setup a record set for naked domain to point to frontend-react-js	
### Setup a record set for api subdomain to point to the backend-flask	
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/5f44034a-2be4-440a-bf94-54de05a58995)


## Configure CORS to only permit traffic from our domain	
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/66d657ec-07e8-4aa3-9f2b-e212c24b0d26)

## Secure Flask by not running in debug mode	
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/d9974a6c-ac3c-4130-912e-aea1f0d7ddeb)


## Implement Refresh Token for Amazon Cognito	
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/e18f0a11-1009-49e1-874b-da554412bce4)


## Refactor bin directory to be top level	

![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/a351aa80-a299-4194-bc02-c7d3c14532ad)


## Configure task defintions to contain x-ray and turn on Container Insights	
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/bbd5bda4-270c-45e4-8a74-20d7417f3451)

![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/5cc09ef7-fbb9-4f5f-ac14-1ccd2a38db97)


## Change Docker Compose to explicitly use a user-defined network	

![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/17908459-0572-4078-b44e-c60ccec9ce20)


## Create Dockerfile specfically for production use case	
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/135a13d6-bbb9-4099-be99-cd03afbfa531)


## Using ruby generate out env dot files for docker using erb templates
![image](https://github.com/carlosern/aws-bootcamp-cruddur-2023/assets/9203226/a57f45bf-b8fa-4461-b6e5-2c39b2750c30)


