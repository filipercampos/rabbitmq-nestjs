FROM rabbitmq:3.10.20-management

RUN apt-get -o Acquire::Check-Date=false update && apt-get install -y curl

# RUN curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.9.0/rabbitmq_delayed_message_exchange-3.9.0.ez > /plugins/rabbitmq_delayed_message_exchange-3.9.0.ez
RUN curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.10.2/rabbitmq_delayed_message_exchange-3.10.2.ez > /plugins/rabbitmq_delayed_message_exchange-3.10.2.ez

RUN chown rabbitmq:rabbitmq $RABBITMQ_HOME/plugins/rabbitmq_delayed_message_exchange-3.10.2.ez

RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange

# done at docker-compose
# COPY ./bin/rabbitmq-start.sh ./bin/rabbitmq-host.sh ./