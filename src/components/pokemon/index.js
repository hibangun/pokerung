import { Component } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'

export default class Pokemon extends Component {
  capitalize (str) {
    return str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  render ({data}) {
    return (
      <div class={style.container}>
        <Link class={style.card} href={`/pokemon/${data.name}•--${data.n}`}>
          <img src={data.image} alt={data.name} />
          <p>{this.capitalize(data.name)}</p>
        </Link>
      </div>
    )
  }
}