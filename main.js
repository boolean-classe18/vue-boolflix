const api_url_base = 'https://api.themoviedb.org/3/';
const api_key = 'c4a5d0f9204fe8ed8998978f4fb5f4c2';

var app = new Vue({
    el: '#root',
    data: {
        risultati: [],
        testo_ricerca: '',
        testo_titolo: '',
        ricerca_in_corso: false
    },
    methods: {
        ricerca() {

            if(this.testo_ricerca.trim() != '') {

                this.ricerca_in_corso = true;

                // ripristino il contenitore dei risultati e l'input
                this.risultati = [];
                let testo_utente = this.testo_ricerca;
                this.testo_ricerca = '';
                // inserisco il testo ricercato nel titolo
                this.testo_titolo = testo_utente;

                // faccio partire la chiamata ajax a tmdb
                axios.get(api_url_base + 'search/movie', {
                    params: {
                        api_key: api_key,
                        query: testo_utente
                    }
                }).then((risposta) => {
                    console.log(risposta.data.results);
                    this.risultati = risposta.data.results;
                    this.ricerca_in_corso = false;
                });

            }
        }
    },
    mounted() {

    }
});
