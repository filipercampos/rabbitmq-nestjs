#!/bin/bash
echo Starting RabbitMQ
chown -R rabbitmq:rabbitmq /data
exec rabbitmq-server