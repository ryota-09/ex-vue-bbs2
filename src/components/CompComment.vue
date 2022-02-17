<template>
  <div class="post-comment-area">
    <div class="comment-name">
      <span>名前: </span>
      <input type="text" v-model="commentName">
    </div>
    <div class="comment-content">
      <span>コメント: </span><br>
      <textarea cols="20" rows="5" v-model="commentContent"></textarea>
    </div>
    <div class="add-comment-button">
      <button type="button" v-on:click="addComment">コメント投稿</button>
    </div>
    <div class="errorMessage" v-show="canShow">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Prop, Component, Vue } from "vue-property-decorator";

@Component
export default class CompComment extends Vue {
  //コメント投稿者の名前
  private commentName = "";
  //コメント内容
  private commentContent = "";
  //記事ID
  @Prop()
  private articleId!:number;
  //エラーメッセージ
  private errorMessage = "";
  //エラーメッセージの表示Frag
  private canShow = false;

  /**
   * コメントを追加するメソッド.
   * @returns Promise<void> - プロミスオブジェクト
   */
  async addComment(): Promise<void>{
    // ↓２回目にボタンが押されたときにエラー文が消えるようにするため。
    this.canShow = false;
    if (this.commentName === ""){
      this.canShow = true;
      this.errorMessage = "名前を入力してください。"
      return;
    }
    if (this.commentName.length > 50){
      this.canShow = true;
      this.errorMessage = "名前は50文字以内で入力してください。"
      return;
    }
    if (this.commentContent === ""){
      this.canShow = true;
      this.errorMessage = "コメントを入力してください。"
      return;
    }
    await axios.post("http://153.127.48.168:8080/ex-bbs-api/bbs/comment",{
      name: this.commentName,
      content: this.commentContent,
      articleId: this.articleId
    });
    
    this.commentName = "";
    this.commentContent = "";
  }
}
</script>

<style scoped>
.errorMessage{
  color: red;
}
</style>
