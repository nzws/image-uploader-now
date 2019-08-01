import { h } from 'hyperapp';
import { resizer } from '../utils/resizer';

export const Uploader = ({ state, actions }) => {
  const upload = () => {
    actions.setState({ isReady: false });

    const data = new FormData();
    data.append('file', state.blob);
    data.append('slug', state.slug);
    data.append('auth', state.token);

    fetch('/api/upload', {
      method: 'POST',
      body: data
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        actions.setState({ isReady: true });
        throw new Error('Network response was not ok.');
      })
      .then(json => {
        if (json.error) {
          actions.setState({ isReady: true });
          return alert(json.error);
        }

        state.list.unshift(json.url);
        localStorage.list = JSON.stringify(state.list);

        actions.setState({
          list: state.list,
          blob: null,
          dataUrl: null,
          isReady: true
        });
      });
  };

  const blob = data => {
    resizer(data)
      .then(resized => {
        var fileReader = new FileReader();
        fileReader.onload = f => actions.setState({ dataUrl: f.target.result });
        fileReader.readAsDataURL(resized);

        actions.setState({ blob: resized });
      })
      .catch(error => prompt(error));
  };

  const drop = e => {
    e.preventDefault();

    if (e.dataTransfer && e.dataTransfer.files.length === 1) {
      blob(e.dataTransfer.files[0]);
    }
  };

  const clipboard = e => {
    if (e.clipboardData && e.clipboardData.files.length === 1) {
      blob(e.clipboardData.files[0]);
    }
    e.preventDefault();
  };

  const input = e => {
    if (e.target.files.length === 1) {
      blob(e.target.files[0]);
    }
    e.preventDefault();
  };

  const openInput = () => document.querySelector('input[type=file]').click();

  return (
    <div class={`text-center ${!state.token && 'disabled'}`}>
      <div class="mt-4 mb-2 textarea">
        <textarea
          class="form-control"
          rows="10"
          onpaste={e => clipboard(e)}
          ondrop={e => drop(e)}
        />
      </div>

      <button class="btn btn-link mt-2 mb-2" onclick={openInput}>
        ...or open the select dialog
      </button>

      <input
        type="text"
        class="form-control mt-2 mb-4"
        placeholder="directory slug"
        onkeyup={e => actions.setState({ slug: e.target.value })}
        value={state.slug}
      />
      <input type="file" class="d-none" onchange={e => input(e)} />

      <button
        class="btn btn-success btn-block btn-lg"
        onclick={upload}
        disabled={
          !state.isReady || !state.slug || !state.blob || !state.dataUrl
        }
      >
        Upload
      </button>

      <img src={state.dataUrl} class="sample" />
    </div>
  );
};
