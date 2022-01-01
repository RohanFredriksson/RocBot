module.exports = {

    Song: class Song {

        constructor(title, url) {
            this.title = title;
            this.url = url;
        }

        static parse(str) {
            var json = JSON.parse(str);
            return new Song(json.title, json.url);
        }

        stringify() {
            return `{"title":"${this.title}","url":"${this.url}"}`;
        }

    }

}