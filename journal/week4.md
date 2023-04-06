# Week 4 — Postgres and RDS

## Create RDS Postgres Instance

I was able to create the RDS instance following the instructional video and with the help of the AW CLI Script
![2023-04-06 17 50 29 RDS Instance](https://user-images.githubusercontent.com/9203226/230505379-097c8185-db39-4c3b-b751-8ca8aed46fbe.jpg)

## Create Schema for Postgres

The database schema was created with no problem
![2023-04-06 17 53 47 DB Schema](https://user-images.githubusercontent.com/9203226/230505428-38113cd4-539a-4a61-8aee-d0e8e39ca363.jpg)

## Bash scripting for common database actions

After watching the instructional video, I successfully implemented all the required bash scripts. The experience was highly informative for me
![2023-04-06 17 55 45 Bash database actions](https://user-images.githubusercontent.com/9203226/230505465-ca67b287-3b15-448e-b919-461c3e8ef42f.jpg)

## Connect Gitpod to RDS instance

I successfully connected to the PRD instance, tanto through the Database Explorer extension as well as by using PSQL directly in the terminal
![2023-04-06 17 58 26 Connect Gitpod to RDS instance](https://user-images.githubusercontent.com/9203226/230505486-93cd2edd-3008-43f2-8790-3d8930691bba.jpg)

**Create AWS Cognito trigger to insert user into database**

I encountered some issues along the way, but ultimately found a solution that differed from Andrew's final code. Instead, I adapted a function similar to the original one from Bayko that worked better for me.
![2023-04-06 18 01 05 Lambda definition](https://user-images.githubusercontent.com/9203226/230505505-32ec66d1-5463-458e-91e9-03509c63b70e.jpg)

## Create new activities with a database insert

I found that this activity delved quite deeply into the complexities of connecting a Python app to a relational database, requiring a fair amount of troubleshooting. While I was able to follow Andrew's lead in solving these issues and ultimately get my app working, one detail remained unresolved: the user handle being sent from the app was set to Andrew's, which of course did not exist in my own database. For now, I have temporarily fixed this issue by hardcoding my own user handle.
![2023-04-06 18 02 28 Activities](https://user-images.githubusercontent.com/9203226/230505533-c8847d09-9a88-47e5-920b-b3a1a4744f5b.jpg)


