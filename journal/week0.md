# Week 0 — Billing and Architecture

## Required Homework

### Watched Chirag's Week 0 - Spend Considerations

I just created a new AWS Account for this Bootcamp

The first I did was watch a video recommendation about how to control the costs of an AWS Account

I enabled the MFA for the Root user, created a new AIM user with the role Admin, and enabled the MFA too.

I followed some instructions about granting granular policies to access Billing Dashboard for my new admin user.

I turned on all the options in the Billing Preferences: Receive PDF Invoice By Email, Receive Free Tier Usage Alerts, and Receive Billing Alerts.

I created a new Cost Budget using the new Templates, specifically the Zero spend budget template, with a Budget amount of $1.00

I created two alerts, one that checks for Actual cost > $0.01, and the other for Forecasted cost > 80%.

After watching Chirag's Week 0 - Spend Considerations, I  created a Billing Alarm following his recommendations

Now I feel calm about the costs


### Watched Ashish's Week 0 - Security Considerations

I watched the tips from Ashish's video, and I only took in consideration de MFA security, which I already had enabled. 

The other services such as AWS Organization, AWS Organization SCP, AWS Cloud Trail I would take into account for a more mature AWS Account in the future


### Recreate Conceptual Diagram in Lucid Charts or on a Napkin

I created a Conceptual diagram on a napkin, here is the photo

![conceptual diagram nakpin_600](https://user-images.githubusercontent.com/9203226/219868868-39638b68-af6e-4ff3-88a7-db3bcee8705e.jpg)


### Recreate Logical Architectual Diagram in Lucid Charts

I was able to recreate the diagram with no problem. I checked out the AWS Architecture Icons guidelines

**Arrows**

I put the arrows in the main direction, not in both ways, this is cleaner for me. For example, the Frontend consumes the Backend, so the arrow goes from the Frontend to the Backend.

This is my shared link [Logical Architectual Diagram in Lucid Charts](https://lucid.app/lucidchart/490ddd7e-1267-4bbd-8cdd-a22c0062720b/edit?viewport_loc=-1330%2C-165%2C4039%2C1794%2C0_0&invitationId=inv_6eca3eae-17aa-4d17-aa5e-93bf973759f9)

Here an image
![My Cruddur Logical Architectual Diagram](https://user-images.githubusercontent.com/9203226/219869240-608c309b-e2ce-4e75-9fc0-23a41b2ddcfe.jpeg)


## Homework Challenges


