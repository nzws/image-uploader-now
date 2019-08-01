import '../scss/index.scss';
import { app, h } from 'hyperapp';
import { Login } from './views/login';
import { Uploader } from './views/upload';
import { List } from './views/list';

const state = {
  token: '',
  slug: '',
  blob: null,
  dataUrl: null,
  isReady: true,
  list: []
};

const actions = {
  setState: obj => obj
};

const view = (state, actions) => (
  <div className="container pt-5">
    <h2>Now Uploader</h2>
    <Login />
    <hr />
    <Uploader state={state} actions={actions} />
    <List state={state} actions={actions} />
  </div>
);

window.onload = () => {
  const App = app(state, actions, view, document.body);

  const list = localStorage.list;
  if (list) App.setState({ list: JSON.parse(list) });

  const token = localStorage.token;
  if (token) App.setState({ token });

  if (location.hash) {
    const token = location.hash.replace('#', '');
    localStorage.token = token;
    App.setState({ token });
    location.hash = '';
  }
};
