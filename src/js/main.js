const wikiApp = new Vue({
  el: '#wiki-app',
  data: {
    focus: false,
    isTyping: false,
    isSearching: false,
    empty: true,
    text: '',
    icon: 'shuffle',
    wikealo: "it's like google it, but in wikipedia xD...",
    items: [],
    results: false,
    random: 'https://en.wikipedia.org/wiki/Special:Random',
    message: ' Dont know something? '
  },
  methods: {
    type() {
      this.isTyping = true
      setTimeout(() => this.isTyping = false, 200)
      if (this.text) {
        this.icon = 'search'
        this.empty = false
      } else {
        this.icon = 'shuffle'
        this.results = false
        this.empty = true
      }
    },
    getText() {
      return this.text.replace(/\s/g, '%20')
    },
    search() {
      const endpoint = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${this.getText()}`
      const self = this;
      self.isSearching = true

      fetch(endpoint)
        .then((res) => res.json())
        .then((res) => self.setResults(res))
        .catch((err) => console.error(err))
    },

    setResults(res) {
      console.log(res)
      const self = this
      self.items = []
      const pages = res.query.pages
      const keys = Object.keys(pages)
      self.results = true
      self.isSearching = false

      keys.forEach((key) => {
        const thePage = pages[key]
        thePage.url = `https://en.wikipedia.org/?curid=${thePage.pageid}`
        self.items.push(thePage)
      })
    }
  }
})