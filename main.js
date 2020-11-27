const api_url_base = 'https://api.themoviedb.org/3/';
const api_key = 'c4a5d0f9204fe8ed8998978f4fb5f4c2';
const url_base_locandina = 'https://image.tmdb.org/t/p/';
const dimensione_locandina = 'w185';
const locandina_default = 'img/poster-not-available.jpg';

var app = new Vue({
    el: '#root',
    data: {
        risultati: [],
        testo_ricerca: '',
        testo_titolo: '',
        ricerca_in_corso: false,
        bandiere_disponibili: ['it', 'en']
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

                let parametri = {
                    params: {
                        api_key: api_key,
                        query: testo_utente
                    }
                };

                // faccio partire la chiamata ajax a tmdb per recuperare i film
                axios.get(api_url_base + 'search/movie', parametri)
                    .then((risposta) => {
                    console.log(risposta.data.results);
                    this.risultati = this.risultati.concat(risposta.data.results);
                    this.ricerca_in_corso = false;
                });

                // faccio partire la chiamata ajax a tmdb per recuperare le serie tv
                axios.get(api_url_base + 'search/tv', parametri)
                    .then((risposta) => {
                    // console.log(risposta.data.results);
                    this.risultati = this.risultati.concat(risposta.data.results);
                    this.ricerca_in_corso = false;
                });

            }
        },
        get_numero_stelle(voto) {
            return Math.ceil(voto / 2);
        },
        get_url_bandiera(lingua) {
            return 'flags/' + lingua + '.png';
        },
        get_url_locandina(poster_path) {
            if(poster_path) {
                return url_base_locandina + dimensione_locandina + poster_path;
            }
            return locandina_default;
        }
    },
    mounted() {

    }
});
