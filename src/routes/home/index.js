import { h, Component } from 'preact'
import style from './style'

import Pokemon from '../../components/pokemon'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemons: [],
      nextPokemonsUrl: ''
    }
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
    if (this.isBottom(wrappedElement)) {
      this.getPokemonsList(this.state.nextPokemonsUrl)
    }
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight
  }

  async getPokemonsList (url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=11') {
    let response = await fetch(url)
    let data = await response.json()

    this.setState({
      pokemons: this.state.pokemons.concat(data.results),
      nextPokemonsUrl: data.next
    })
  }

  render () {
    const { pokemons } = this.state

    return (
      <div id="content" class={style.home}>
        <div class={style.pokemons}>
          {pokemons.map(item => {
            const n = item.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
            item.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`
            return <Pokemon data={item} />
          })}
        </div>
      </div>
    )
  }
}
