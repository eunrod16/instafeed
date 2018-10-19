var app = new Vue({
  el: '#app',
  data: function() {
    return {
      publicaciones: {}
    }
  },
  created() {
    var self = this;
    this.getPublicaciones(function(publicaciones){
      self.publicaciones = publicaciones;
    });
  },
  methods: {
    getPublicaciones (callback) {
      var publicaciones =[];

      this.$http.get('https://www.instagram.com/explore/tags/mcguate/?__a=1').then(response => {

        console.log(response);

      }, response => {
        // error callback
      });

    }
  }
  /*mounted () {
  axios
    .get('https://www.instagram.com/explore/tags/mcguate/?__a=1')
    .then(response => (this.publicaciones = response["data"]["graphql"]["hashtag"]["edge_hashtag_to_media"]["edges"]))
}*/
});
