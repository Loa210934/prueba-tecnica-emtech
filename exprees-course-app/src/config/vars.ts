const config = {
  env: process.env.NODE_ENV || 'dev',
  port: 3000,
  projectName: process.env.PROJECT_NAME,
  mongodbUri:
    process.env.DATABASE_URI ||
    'mongodb+srv://loa:HTUvQMszQs5mkn5w@cluster0.awj4wf7.mongodb.net',
  jwtSecret: process.env.JWT_SECRET || 'randomstring',
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES || 60 * 60 * 24,
};

export default config;
