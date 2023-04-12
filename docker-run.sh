# remove rabbitmq
docker container rm -f rabbitmq
docker rmi -f rabbitmq-nestjs-rabbitmq
# remove consumer
docker container rm -f consumer-nestjs
docker rmi -f rabbitmq-nestjs-consumer      
# remove producer                                                                                                                                           0.0s
docker container rm -f producer-nestjs
docker rmi -f rabbitmq-nestjs-producer
# run app
docker-compose up -d