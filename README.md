# RMIT SEPT 2021 Major Project

## Group Mon-17:30

### Members

-   Jack Hollis-London
-   Jacob McEwan
-   Minggang Dong
-   Moritz Haputmann

### Records

-Jira:
https://septassignmentproject.atlassian.net/jira/software/projects/SEP/boards/1
<br /> -Figma:
https://www.figma.com/file/gKb6AbiCw1uTTOPUFddkyy/Untitled?node-id=4%3A1799
<br /> -Github: https://github.com/Someoneamzing/sept-group-assignment <br />

### Deployments

#### 'develop' branch

-   Frontend:
    http://cicddevelopment.s3-website-ap-southeast-2.amazonaws.com/book/1
-   Login m's':
    http://CICD-load-balancer-511777230.ap-southeast-2.elb.amazonaws.com
-   Book m's':
    http://CICD-load-balancer-511777230.ap-southeast-2.elb.amazonaws.com:81

### Code Documentation - Release 0.1.0 -

#### Features

#### Running

To run the application locally :

1. cd into each and every microservice (ms_booking, ms_availability,
   ms_profiles, ms_service) and run :
2. ./mvnw package && java -jar target/ms\_[microservice]-0.0.1-SNAPSHOT.jar
3. cd into FrontEnd/myfirstapp
4. run "npm install"
5. run "npm start"
