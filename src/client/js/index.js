import '../scss/index.scss';
import { app, h } from 'hyperapp';

const state = {
  slug: '',
  blob: null
};

const actions = {
  uploadFile: () => {}
};

const view = (state, actions) => (
  <div className="container pt-5">haritasooooooooooooooo</div>
);

window.onload = () => app(state, actions, view, document.body);
