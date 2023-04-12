docker container rm -f rabbitmq
docker rmi -f rabbitmq-nestjs-rabbitmq
docker container rm -f consumer-email
docker container rm -f producer-email
docker rmi -f rabbitmq-nestjs-consumer                                                                                                                                                 0.0s
docker rmi -f rabbitmq-nestjs-producer

docker-compose up -d