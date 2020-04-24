import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <div class={style.container}>
      <div class={style.logo}>
        <img src="/assets/images/logo.png" alt="Pokerung Logo"/>
        <h1>Pokerung</h1>
      </div>
    </div>
  </header>
);

export default Header;
