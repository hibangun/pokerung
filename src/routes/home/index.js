import { h, Component } from 'preact'
import style from './style'

import Pokemon from '../../components/pokemon'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemons: []
    }
  }

  // gets called when this route is navigated to
  componentDidMount () {
    this.getPokemonsList()
    // start a timer for the clock:
    this.timer = setInterval(this.updateTime, 1000)
  }

  async getPokemonsList () {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=11')
    let data = await response.json()

    this.setState({
      pokemons: this.state.pokemons.concat(data.results)
    })
  }

  render () {
    const { pokemons } = this.state

    return (
      <div class={style.home}>
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
