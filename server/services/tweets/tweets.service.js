// Initializes the `tweets` service on path `/api/v1/tweets`
import createService from 'feathers-memory';
import hooks from './tweets.hooks';

export default app => {

  const paginate = app.get('paginate');

  const options = {
    name: 'tweets',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/tweets', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/v1/tweets');

  service.hooks(hooks);
};
