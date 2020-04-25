import { h, Component } from 'preact'
import style from './style'

import Pokemon from '../../components/pokemon'

export default class Home extends Component {
  state = {
    pokemons: [],
    nextPokemonsUrl: '',
    isTop: true,
    search: ''
  }

  // gets called when this route is navigated to
  componentDidMount () {
    document.addEventListener('scroll', this.trackScrolling)
    this.getPokemonsList()
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.trackScrolling)
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('content')
    if (this.isBottom(wrappedElement) && this.state.search === '') {
      this.getPokemonsList(this.state.nextPokemonsUrl)
    }

    const val = this.isTop(wrappedElement)
    this.settingState(val)
  }

  settingState(val) {
    this.setState({
      isTop: val
    })
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight
  }

  isTop(el) {
    return el.getBoundingClientRect().top >= 5
  }

  async getPokemonsList (url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=11') {
    let response = await fetch(url)
    let data = await response.json()

    this.setState({
      pokemons: this.state.pokemons.concat(data.results),
      nextPokemonsUrl: data.next
    })
  }

  handleSearchKeyup = (e) => {
    const str = e.target.value

    if (str === '') {
      console.log('masuk kosong')
      this.getPokemonsList()
    }

    const pokemonFiltered = this.state.pokemons.filter(item => {
      return item.name.includes(str) === true
    })

    this.setState({
      search: str,
      pokemons: pokemonFiltered
    })
  }


  render ({}, { pokemons, isTop }) {
    return (
      <div id="content" class={style.home}>
        <div class={[style.search, (!isTop) ? style.active : ''].join(' ')}>
          <input type="search" placeholder="Search pokemon name..." onKeyUp={this.handleSearchKeyup} />
        </div>
        <div class={style.pokemons}>
          {pokemons.map(item => {
            const n = item.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
            item.n = n
            item.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`
            return <Pokemon data={item} />
          })}
        </div>
      </div>
    )
  }
}
