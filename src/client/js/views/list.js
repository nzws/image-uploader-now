import { h } from 'hyperapp';

export const List = ({ state, actions }) => {
  const copy = data => navigator.clipboard.writeText(data);

  const clh = () => {
    if (!confirm('Are you sure?')) return;

    localStorage.list = JSON.stringify([]);
    actions.setState({
      list: []
    });
  };

  return (
    <div class="table-responsive mt-4 mb-4">
      <table class="table">
        <tbody>
          {state.list.map(data => (
            <tr>
              <td>
                <img src={data} />
              </td>
              <td>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    readonly
                    value={data}
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      onclick={() => copy(data)}
                    >
                      link
                    </button>
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      onclick={() => copy(`![image](${data})`)}
                    >
                      md
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {state.list[0] && (
        <button class="btn btn-danger btn-block" onclick={clh}>
          Clear history
        </button>
      )}
    </div>
  );
};
