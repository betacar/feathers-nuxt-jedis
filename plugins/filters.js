'use strict';

import Vue from 'vue';
import moment from 'moment';

const dateFormatter = {
  display(value, fmt = 'MMMM DD, YYYY – HH:mm') {
    if (!value) return '';
    return moment(new Date(value)).format(fmt);
  },

  fromNow(value) {
    if (!value) return '';
    return moment(new Date(value)).fromNow();
  }
};

Vue.filter('date', dateFormatter.display);
Vue.filter('fromNow', dateFormatter.fromNow);
