import { Component } from 'preact'
import style from './style.css'

export default class Pokemon extends Component {
  constructor () {
    super()

    this.state = {}
  }

  render ({data}) {
    return (
      <div class={style.container}>
        <div class={style.card}>
          <img src={data.image} alt={data.name}/>
          <p>{data.name}</p>
        </div>
      </div>
    )
  }
}