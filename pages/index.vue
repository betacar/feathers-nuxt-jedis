<template>
  <section class="container">
    <h1 class="is-size-1 has-text-centered">Praesens</h1>

    <div class="columns">
      <div class="column is-two-thirds">
        <b-card  v-for="tweet in tweets.slice().reverse()" v-bind:key="tweet.id" :tweet="tweet" />
      </div>

      <div class="column has-text-centered">
        <b-keywords />

        <span v-if="tweets.length" class="is-size-1">{{tweets.length}}</span>
        <p v-if="tweets.length">Tweets on screen</p>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';
import BCard from '~/components/Card';
import BKeywords from '~/components/Keywords';

export default {
  computed: {
    ...mapGetters({
      tweets: 'tweets/list'
    })
  },

  head() {
    return {
      title: `(${this.tweets.length})`
    }
  },

  components: {
    BCard, BKeywords
  },

  async mounted() {
    await this.$store.dispatch('tweets/find');
  }
}
</script>

<style>
.container {
  min-height: 100vh;
}
</style>
