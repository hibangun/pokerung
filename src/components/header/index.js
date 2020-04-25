import { Link } from 'preact-router/match'
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <div class={style.container}>
      <Link class={style.logo} href="/">
        <img src="/assets/images/logo.png" alt="Pokerung Logo" />
        <h1>Pokerung</h1>
      </Link>
    </div>
  </header>
);

export default Header;
