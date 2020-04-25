import { h, Component } from 'preact';
import style from './style';

import Pokemon from '../../components/pokemon'

export default class Profile extends Component {
  state = {
    time: Date.now(),
    count: 10,
    profile: {},
    profileTypes: [],
    similars: []
  }

  // gets called when this route is navigated to
  componentDidMount() {
    this.getPokemonProfile()
  }

  componentWillReceiveProps (nextProps) {
    this.getPokemonProfile(nextProps.name)
    window.scrollTo(0, 0)
  }

  componentWillMount () {
    if (!Object.keys(this.state.profile).length) {
      this.getPokemonProfile()
    }
  }

  async getPokemonProfile (name = null) {
    const pokemonName = name || this.props.name

    const pokemonId = pokemonName.split('•--')[1]

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    let data = await response.json()

    let profileTypes = []
    data.types && data.types.map(item => {
      return profileTypes.push(item.type.name)
    })

    this.setState({
      profile: data,
      profileTypes
    })

    this.getSimilarPokemon(profileTypes)
  }

  async getSimilarPokemon (arr) {
    arr.map(async (item) => {
      let response = await fetch(`https://pokeapi.co/api/v2/type/${item}`)
      let data = await response.json()

      const joined = this.state.similars.concat(data)
      this.setState({
        similars: this.shuffle(joined)
      })
    })
  }

  // gets called just before navigating away from the route
  componentWillUnmount () {
    this.setState({
      profile: {}
    })
  }

  capitalize (str) {
    return str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  shuffle (a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }

    return a;
  }

  // Note: `name` comes from the URL, courtesy of our router
  render ({ name }, { profile, similars }) {
    const id = name.split('•--')[1]

    return (
      <div id="profile" class={style.profile}>
        <div class={style.container}>
          <div class={style.header}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="" />
          </div>
          <div class={style.card}>
            <h1>{this.capitalize(profile.name)}</h1>
            <div class={style.summary}>
              <div class={style.type}>
                <p>
                  {profile.types && profile.types.map((item, i) => {
                    return <span>{item.type.name}</span>
                  })}
                </p>
                <small>Type</small>
              </div>
              <div class={style.weight}>
                <p>{profile.weight}</p>
                <small>weight</small>
              </div>
              <div class={style.height}>
                <p>{profile.height}</p>
                <small>height</small>
              </div>
            </div>
          </div>
          <div class={style.similars}>
            <h2>Other similar types</h2>
            {similars.length && similars[0].pokemon.map(item => {
              const n = item.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
              item.pokemon.n = n
              item.pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`
              return <Pokemon data={item.pokemon} />
            })}
          </div>
        </div>
      </div>
    );
  }
}
