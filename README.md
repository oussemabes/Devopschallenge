# Creating DevOps Challenge VPC

![Alt text](screen-shots/image-1.png)

## Creation of RDS PostgreSQL Instance Inside the New VPC
![Alt text](screen-shots/image-4.png)

![Alt text](screen-shots/image-2.png)

![Alt text](screen-shots/image-3.png)

## Link the RDS PostgreSQL to EC2 and Create a New Table
![Alt text](screen-shots/image-5.png)
![Alt text](screen-shots/image-6.png)
Note: This rule has been automatically generated to permit connections from the EC2 instance.

![Alt text](screen-shots/image-7.png)
Create a table `posts` with two columns `title` and `author`.

## Create an AppSync API Named ChallengeDevOps

![Alt text](screen-shots/image-8.png)
The schema is:
![Alt text](screen-shots/image-9.png)

## Create a Lambda Function as a Data Source for ChallengeDevOps API in the Same VPC
### Configure Environment Variables
![Alt text](screen-shots/image-10.png)
### Configure Connection Between RDS and Lambda Function
And then set change `rds.force_ssl` value to `0` so that the Lambda function can access the database because by default, our RDS database can only be accessible from SSH.
![Alt text](screen-shots/image-11.png)
### Configure Proxy Connection
![Alt text](screen-shots/image-12.png)
### Configure Security Group so that the Lambda function can access the RDS database
![Alt text](screen-shots/image-13.png)

### Write the Logic of the Function Locally, Then Deploy It as a .zip File
You can see the entire code in this repo in a file named `Lambda-function-logic.js`.
### Create the Data Source for AWS AppSync
![Alt text](screen-shots/image-14.png)
![Alt text](screen-shots/image-15.png)

## Attach Resolver for the Query and Mutation
### For the CreatePost Mutation
![Alt text](screen-shots/image-16.png)
![Alt text](screen-shots/image-17.png)
Note: This is the test of the mutation
![Alt text](screen-shots/image-18.png)

### For the ListPosts Query
![Alt text](screen-shots/image-19.png)
![Alt text](screen-shots/image-20.png)
Note: This is the test of the query
![Alt text](screen-shots/image-21.png)

## Integrate These APIs with Amplify and React
I followed those instructions.
![Alt text](screen-shots/image-22.png)
And I had to create an access key.
![Alt text](screen-shots/image-23.png)
I used it in `amplify init`, then I wrote the entire logic based on Amplify documentation [https://docs.amplify.aws/react/](https://docs.amplify.aws/react/).

![Alt text](image.png)
This is the home page where you can add a title and author, and they will be added.
![Alt text](image-1.png)
## Set Up GitHub Actions for My React-Amplify Application
Step 1: Create a Workflow File
Step 2: Add a New Workflow
Step 3: Define the Workflow in the YAML File
Step 4: Push the Changes
Name of the file: `ci-cd.yml`



## Making Changes to This Last API from Local and Deploy It from the CI/CD GitHub Actions after making changes
![Alt text](screen-shots/image-26.png)
## Add Secret Access Key for best practices
![Alt text](screen-shots/image-25.png)
Name of the file CI/CD configuration: `ci-cd-appsync-update.yml`

