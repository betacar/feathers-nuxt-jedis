// Initializes the `keywords` service on path `/api/v1/keywords`
import createService from './keywords.class.js';
import hooks from './keywords.hooks';

export default app => {
  const options = {
    name: 'keywords',
    client: app.get('twitterClient')
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/keywords', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/v1/keywords');

  service.hooks(hooks);
};
