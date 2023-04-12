#!/bin/bash
echo Set config RabbitMQ

# auth
# rabbitmqctl authenticate_user username pass

# add host (ser none)
# rabbitmqctl add_vhost rabbitmq

# create virtual host 'rabbitmq' with user
curl -u rbadmin:rbadmin -X PUT http://localhost:15672/api/vhosts/rabbitmq