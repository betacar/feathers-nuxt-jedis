<template>
  <div class="field">
    <p class="control has-icons-left">
      <input class="input is-rounded" type="text" placeholder="keywords" v-model="keys" @keyup.enter="save" />
      <span class="icon is-small is-left">
        <icon name="search"></icon>
      </span>
    </p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'BKeywords',

  data() {
    return {
      keys: ''
    }
  },

  computed: {
    ...mapGetters({
      keywords: 'keywords/list'
    })
  },

  async mounted() {
    await this.$store.dispatch('keywords/find');
  },

  methods: {
    async save() {
      if (!this.keys) return;

      const keys = this.keys.split(',').map(str => str.trim());
      const response = await this.$store.dispatch(`keywords/create`, keys);
      this.keys = this.keywords.join(', ');
      return;
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 30px;
}
</style>
