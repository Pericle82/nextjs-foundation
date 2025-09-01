# PostgreSQL CLI Inspection Guide

## Connect to Running Container

```bash
# Connect to running PostgreSQL container
docker exec -it nextjs-postgres-dev psql -U postgres -d nextjs_dashboard
```

## Basic Commands

```sql
-- List all databases
\l

-- Connect to database
\c nextjs_dashboard

-- List all tables
\dt

-- Describe table structure
\d table_name

-- List all users
\du

-- Show current database
SELECT current_database();

-- Show all tables with row counts
SELECT schemaname,tablename,n_tup_ins-n_tup_del as rowcount 
FROM pg_stat_user_tables ORDER BY rowcount DESC;
```

## Query Data

```sql
-- Select all from table
SELECT * FROM users;

-- Show table schema
\d+ users

-- Exit psql
\q
```

## Container Management

```bash
# Check container status
docker ps | grep postgres

# View container logs
docker logs nextjs-postgres-dev

# Stop container
docker stop nextjs-postgres-dev
```