import postgres from 'postgres';

// Global variable to maintain the connection across hot reloads
declare global {
  var __db: postgres.Sql | undefined;
}

// Create a singleton database connection
let sql: postgres.Sql;

if (process.env.NODE_ENV === 'production') {
  // In production, create a new connection
  sql = postgres(process.env.POSTGRES_URL!, {
    ssl: 'require',
    max: 10, // Maximum 10 connections in the pool
    idle_timeout: 20, // Close idle connections after 20 seconds
    connect_timeout: 30, // Connection timeout
  });
} else {
  // In development, reuse the existing connection to avoid "too many clients"
  if (!global.__db) {
    global.__db = postgres(process.env.POSTGRES_URL!, {
      ssl: false,
      max: 5, // Lower limit for development
      idle_timeout: 20,
      connect_timeout: 30,
    });
  }
  sql = global.__db;
}

export { sql };
