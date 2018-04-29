'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '~/plugins/feathers';

const {service} = feathersVuex(feathersClient, {idField: 'id'});

Vue.use(Vuex);

const store = () => new Vuex.Store({
  plugins: [
    service('/api/v1/tweets', {
      nameStyle: 'short'
    }),

    service('/api/v1/keywords', {
      nameStyle: 'short'
    })
  ]
});

export default store;
