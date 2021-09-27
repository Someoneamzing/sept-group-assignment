# CI/CD
## Testing Building Before Publishing
- change directories into a microservice root
- build and package the spring boot jar `./mvnw package spring-boot:repackage`
- build and run docker-compose file for a MySQL database
- Please note: **book** service uses port 8081 - not 8080
- Please note: starting the MySQL container may take up to a minute, if it throws errors, try deleting it's persisted volume `docker-compose down --volumes`

###Run the package with a local persisted MySQL docker image

This example uses loginmicroservices, the same process applies for bookmicroservices and ordermicroservices. You must go
into each microservice directory and build the docker image.
Here's a script to try everything at once. Fingers crossed.
```shell
cd BackEnd
# replace all application.yaml files with mysql based application.yaml configs
find . -type f -regex ".*/src/main/resources/application.yaml" -exec cp mysql_application.yaml {} \;
# build packages with spring boot
./mvnw package spring-boot:repackage -Dmaven.test.skip &&
# build docker images
cd loginmicroservices && docker build -t login:2.5.4 . && cd .. &&
cd bookmicroservices && docker build -t book:2.5.4 . && cd .. &&
# run all services with mysql image
docker-compose up
```
###Run the package with the AWS RDS database

_This setup requires a .env file with the environment variables used in `docker-compose_AWS.yml`_
```shell
cd BackEnd
source .env
docker-compose -f docker-compose_AWS.yml up --remove-orphans
```

_Please note for you to run the services locally again you'll need to change their application.yaml files back to the
`h2_application.yaml` configs. I have no script to do that automatically.
## Testing 
## Publishing Changes
- Releases are only deployed on the development branch and the main branch
- 