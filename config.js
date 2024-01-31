import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'projectidsa',
  });
  
  app.use(session({ secret: 'thisismysecret', resave: false, saveUninitialized: false }));