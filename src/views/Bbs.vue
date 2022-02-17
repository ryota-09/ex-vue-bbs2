<template>
  <div class="bbs">
    <h1>掲示板アプリ</h1>
    <div class="post-area">
      <div class="article-name">
        <span>投稿者名: </span>
        <input type="text" v-model="articleName">
      </div>
      <div class="article-content">
        <span>投稿内容: </span>
        <textarea  cols="30" rows="5" v-model="articleContent"></textarea>
      </div>
      <div class="article-post-button">
        <button type="button" v-on:click="addArticle">記事投稿</button>
      </div>
    </div>
    <hr>
    <div class="time-line-area">
      <div class="article-container" v-for="article of currentArticleList" v-bind:key="article.id">
        <div class="article-name">{{ article.name }}</div>
        <div class="article-content">{{ article.content }}</div>
        <div class="article-commentlist">
          <div class="article-comment" v-for="comment of article.commentList" v-bind:key="comment.id">
            <div class="comment-name">
              <span>{{ comment.name }}</span>
            </div>
            <div class="comment-content">
              <span>{{ comment.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/types/article";
import axios from "axios";
// import { Comment } from "@/types/comment";
@Component
export default class Bbs extends Vue {
  //表示する記事一覧
  private currentArticleList = new Array<Article>();
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";


  async created(): Promise<void>{
    await this.$store.dispatch("addArticle");
    this.currentArticleList = this.$store.getters.getArticles;
  }

  async addArticle(): Promise<void>{
    const res = await axios.post("http://153.127.48.168:8080/ex-bbs-api/bbs/article",{
      name: this.articleName,
      content: this.articleContent
    })
    console.log(res.data);
  }


}
</script>

<style scoped>
.bbs {
  text-align: left;
}
</style>
