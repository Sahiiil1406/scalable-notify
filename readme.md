# Scalable Notification System

This project implements a scalable notification system using Node.js and Apache Kafka. The system is designed to handle high-volume, real-time notifications efficiently across multiple channels.

## Installation steps

1.Clone the repo

2.Open the cmd/terminal and run the following command-
```
docker run -p 9092:9092 apache/kafka
```
3.Install the dependencies and start the server:
```
npm install
npm run dev
```

## How It Works

1. Notification requests are received by the Node.js server.
2. These requests are published as messages to Kafka topics.
3. Consumer services subscribe to these topics and process the notifications.
4. Processed notifications are sent through appropriate channels to end-users.

#

![Screenshot 2024-08-10 041539](https://github.com/user-attachments/assets/6bd8439d-8ad6-4c14-a8a3-99ae273893e5)

