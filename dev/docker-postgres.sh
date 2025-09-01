#!/bin/bash

# PostgreSQL Docker container for Next.js development

CONTAINER_NAME="nextjs-postgres-dev"
POSTGRES_DB="nextjs_dashboard"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
POSTGRES_PORT="5432"

# Check if container already exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Container $CONTAINER_NAME already exists. Starting it..."
    docker start $CONTAINER_NAME
else
    echo "Creating and starting new PostgreSQL container..."
    docker run -d \
        --name $CONTAINER_NAME \
        -e POSTGRES_DB=$POSTGRES_DB \
        -e POSTGRES_USER=$POSTGRES_USER \
        -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
        -p $POSTGRES_PORT:5432 \
        -v postgres_data:/var/lib/postgresql/data \
        postgres:15-alpine
fi

echo "PostgreSQL is starting up..."
echo "Connection details:"
echo "  Host: localhost"
echo "  Port: $POSTGRES_PORT"
echo "  Database: $POSTGRES_DB"
echo "  Username: $POSTGRES_USER"
echo "  Password: $POSTGRES_PASSWORD"
echo ""
echo "Connection string:"
echo "postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB?sslmode=require"