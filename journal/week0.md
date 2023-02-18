# Week 0 — Billing and Architecture

# Required Homework

## Watched Chirag's Week 0 - Spend Considerations

I just created a new AWS Account for this Bootcamp

The first I did was watch a video recommendation about how to control the costs of an AWS Account

I enabled the MFA for the Root user, created a new AIM user with the role Admin, and enabled the MFA too.

I followed some instructions about granting granular policies to access Billing Dashboard for my new admin user.

I turned on all the options in the Billing Preferences: Receive PDF Invoice By Email, Receive Free Tier Usage Alerts, and Receive Billing Alerts.

I created a new Cost Budget using the new Templates, specifically the Zero spend budget template, with a Budget amount of $1.00

I created two alerts, one that checks for Actual cost > $0.01, and the other for Forecasted cost > 80%.

After watching Chirag's Week 0 - Spend Considerations, I  created a Billing Alarm following his recommendations

Now I feel calm about the costs


## Watched Ashish's Week 0 - Security Considerations

I watched the tips from Ashish's video, and I only took in consideration de MFA security, which I already had enabled. 

The other services such as AWS Organization, AWS Organization SCP, AWS Cloud Trail I would take into account for a more mature AWS Account in the future


## Recreate Conceptual Diagram in Lucid Charts or on a Napkin

I created a Conceptual diagram on a napkin, here is the photo

![conceptual diagram nakpin_600](https://user-images.githubusercontent.com/9203226/219868868-39638b68-af6e-4ff3-88a7-db3bcee8705e.jpg)


## Recreate Logical Architectual Diagram in Lucid Charts

I was able to recreate the diagram with no problem. I checked out the AWS Architecture Icons guidelines

**Arrows**

I put the arrows in the main direction, not in both ways, this is cleaner for me. For example, the Frontend consumes the Backend, so the arrow goes from the Frontend to the Backend.

This is my shared link [Logical Architectual Diagram in Lucid Charts](https://lucid.app/lucidchart/490ddd7e-1267-4bbd-8cdd-a22c0062720b/edit?viewport_loc=-1330%2C-165%2C4039%2C1794%2C0_0&invitationId=inv_6eca3eae-17aa-4d17-aa5e-93bf973759f9)

Here an image
![My Cruddur Logical Architectual Diagram](https://user-images.githubusercontent.com/9203226/219869240-608c309b-e2ce-4e75-9fc0-23a41b2ddcfe.jpeg)

## Create an Admin User, 	Generate AWS Credentials, Installed AWS CLI

I created an Admin User following the security recommendations. turned on MFA, and granted policies for the Billing Dashboard.

I generated AWS Credentials and configured them in my Gitpod workspace

### Installed AWS CLI

I was able to install AWS CLI in my gitpod workspace defining a task in the .gitpod.yml, and configured my profile with my AWS credentials

![2023-02-18 09 20 57 AWS Credential CLI](https://user-images.githubusercontent.com/9203226/219869958-3003a275-f8ba-41e4-a768-713373df4c0d.jpg)


## Create a Billing Alarm

I was able to create an Alarm in Cloudwatch of Type Metric Alarm using the EstimatedCharges Metric with a Static Threshold type of Value greater than $5

![2023-02-18 10 14 18 billing alarm](https://user-images.githubusercontent.com/9203226/219870630-141010ab-e209-4de7-a91a-beaea0d00179.jpg)

![2023-02-18 10 04 32 billing alarm sns confirmation](https://user-images.githubusercontent.com/9203226/219870627-f5311c32-8d9a-4160-99c7-4b353c72c5ff.jpg)


## Create a Budget

I was able to create a Budget using the Monthly cost budget Template, with a budgeted amount of 5$

![2023-02-18 10 20 00 Budget Alert](https://user-images.githubusercontent.com/9203226/219870972-e66b333f-4a3f-400d-b391-c1c9660d6a1d.jpg)




# Homework Challenges

### Retention setting of the Cloudwatch Logs

I followed the recommendation for changing the Retention setting of the Cloudwatch Logs with the help of the app [auto-set-log-group-retention](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:374852340823:applications~auto-set-log-group-retention) , I think it could be useful because the Storage of the logs has its [pricing](https://aws.amazon.com/cloudwatch/pricing/) schema


### Custom Password policy
I  followed the recommendation for customizing the Password policy of the AWS IAM services:
- Increased the minimum length to 10
- Password expires in 30 days
- Prevent password reuse from the past 5 changes
- Must not be identical to your IAM username, AWS account name, or email address


