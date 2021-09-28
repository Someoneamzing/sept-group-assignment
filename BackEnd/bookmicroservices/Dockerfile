FROM adoptopenjdk/openjdk11:alpine
ENV APP_FILE bookmicroservices-2.5.4.jar
ENV APP_HOME /usr/apps
EXPOSE $SERVER_PORT
COPY target/$APP_FILE $APP_HOME/
WORKDIR $APP_HOME
ENTRYPOINT ["sh", "-c"]
CMD ["echo $RDS_HOSTNAME && exec java -jar $APP_FILE --spring.data.rest.base-path=api/"]