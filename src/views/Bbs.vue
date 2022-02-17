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
      <div class="errorMessage" v-show="canShow">{{ errorMessage }}</div>
    </div>
    <hr>
    <div class="time-line-area">
      <div class="article-container" v-for="article of currentArticleList" v-bind:key="article.id">
        <div class="article-name">{{ article.name }}</div>
        <div class="article-content">{{ article.content }}</div>
        <dir class="article-delete-button">
          <button v-on:click="deleteArticle(article.id)">記事削除</button>
        </dir>
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
        <CompComment v-bind:article-id="article.id"></CompComment>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/types/article";
import axios from "axios";
import CompComment from "@/components/CompComment.vue";

@Component({
  components: {
    CompComment,
  }
})
export default class Bbs extends Vue {
  //表示する記事一覧
  private currentArticleList = new Array<Article>();
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";
  //エラーメッセージ
  private errorMessage = "";
  //エラーメッセージの表示Frag
  private canShow = false;

  /**
   * 表示する記事一覧を取得するメソッド.
   * @returns Promise<void> - プロミスオブジェクト
   */
  async created(): Promise<void>{
    await this.$store.dispatch("addArticle");
    this.currentArticleList = this.$store.getters.getArticles;
  }

  /**
   * 記事を投稿するためのメソッド.
   * @returns Promise<void> - プロミスオブジェクト
   */
  async addArticle(): Promise<void>{
    // ↓２回目にボタンが押されたときにエラー文が消えるようにするため。
    this.canShow = false;
    if (this.articleName === ""){
      this.canShow = true;
      this.errorMessage = "名前を入力してください。"
      return;
    }
    if (this.articleName.length > 50){
      this.canShow = true;
      this.errorMessage = "名前は50文字以内で入力してください。"
      return;
    }
    if( this.articleContent === ""){
      this.canShow = true;
      this.errorMessage = "投稿内容を入力してください。"
      return;
    }
    const res = await axios.post("http://153.127.48.168:8080/ex-bbs-api/bbs/article",{
      name: this.articleName,
      content: this.articleContent
    })
    console.log(res.data);
    this.articleName = "";
    this.articleContent = "";
  }
  /**
   * 記事を削除するメソッド.
   * @returns Promise<void> - プロミスオブジェクト
   */
  async deleteArticle(articleId: number): Promise<void>{
    let targetUrl = "http://153.127.48.168:8080/ex-bbs-api/bbs/article/" + articleId;
    await axios.delete(targetUrl);
  }


}
</script>

<style scoped>
.bbs {
  text-align: left;
}
.errorMessage{
  color: red;
}
</style>
