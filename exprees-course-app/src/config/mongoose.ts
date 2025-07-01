import mongoose from 'mongoose';
import config from './vars';

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
// print mongoose logs in dev env
if (config.env === 'development') {
  mongoose.set('debug', true);
}

export default {
  connect: (): mongoose.Connection => {
    mongoose
      .connect(config.mongodbUri)
      .then(() => console.debug('mongoDB connected...'));
    return mongoose.connection;
  },
};
