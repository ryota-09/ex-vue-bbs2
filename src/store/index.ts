import Vue from 'vue'
import Vuex from 'vuex'
import { Article } from "@/types/article";
// import { Comment } from "@/types/comment";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    articles: new Array<Article>(),
  },
  actions: {
    async addArticle(context){
      const res = await axios.get("http://153.127.48.168:8080/ex-bbs-api/bbs/articles");

      console.dir(JSON.stringify(res));
      const payload = res.data;
      context.commit("addArticles",payload);
    }
  },
  mutations: {
    addArticles(state, payload){
      state.articles = new Array<Article>();
      for(const article of payload.articles){
        state.articles.push(
          new Article(
            article.id,
            article.name,
            article.content,
            article.commentList
          )
        );
      }
    }
  },
  getters: {
    getArticles(state){
      return state.articles;
    }
  },
  modules: {
  },
})
