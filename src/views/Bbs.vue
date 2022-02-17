<template>
  <div class="bbs">
    <h1>掲示板アプリ</h1>
    <div class="post-area">
      <div></div>
    </div>
    <hr>
    <div class="time-line-area">
      <div class="article-container" v-for="article of currentArticleList" v-bind:key="article.id">
        <div class="article-name">{{ article.name }}</div>
        <div class="article-content">{{ article.content }}</div>
        <div class="article-content">{{ article.commentList }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/types/article";
// import { Comment } from "@/types/comment";
@Component
export default class Bbs extends Vue {
  private currentArticleList = new Array<Article>();

  async created(): Promise<void>{
    await this.$store.dispatch("addArticle");
    this.currentArticleList = this.$store.getters.getArticles;
  }


}
</script>

<style scoped>

</style>
