import { Component } from 'preact'
import style from './style.css'

export default class Pokemon extends Component {
  constructor () {
    super()

    this.state = {}
  }

  render ({data}) {
    console.log('Pokemon -> render -> data', data);
    return (
      <div class={style.container}>
        <div class={style.card}>
          <img src={data.image} alt=""/>
          <p>{data.name}</p>
        </div>
      </div>
    )
  }
}