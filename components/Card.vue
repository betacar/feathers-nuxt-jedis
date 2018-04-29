<template>
  <div class="card">
    <div v-if="!!tweet.entities.media" class="card-image">
      <figure class="image is-4by3">
        <img :src="tweet.entities.media[0].media_url" alt="Image">
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="tweet.user.profile_image_url" :alt="tweet.user.name">
          </figure>
        </div>

        <div class="media-content">
          <p class="title is-4">{{tweet.user.name}}</p>
          <p class="subtitle is-6">
            <a :href="`https://twitter.com/${tweet.user.screen_name}`" target="_blank">{{`@${tweet.user.screen_name}`}}</a>
          </p>
        </div>
      </div>

      <div class="content">
        <p>{{content}}</p>

        <div class="tags has-addons" v-if="tweet.entities.hashtags.length">
          <span v-for="hashtag in tweet.entities.hashtags" :key="hashtag.text" class="tag">
            <a :href="`https://twitter.com/search?q=%23${hashtag.text}`" target="_blank">{{`#${hashtag.text}`}}</a>
          </span>
        </div>

        <small>
          <time :datetime="tweet.created_at | date('YYYY-MM-DD')">
            <a :href="`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`" target="_blank">{{tweet.created_at | date}}</a>
          </time>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BCard',

  props: {
    tweet: Object
  },

  computed: {
    content() {
      if (this.tweet.extended_tweet) return this.tweet.extended_tweet.full_text;
      return this.tweet.text;
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 30px
}
</style>
