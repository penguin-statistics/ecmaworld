import { store } from '@exusiai-dev/coredata/src/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import './App.css';

let rerenderCounter = 0;

const App = observer(() => {
  const stages = store.cache.stages

  useEffect(() => {
    rerenderCounter++;
  });

  return (
    <div className="App">
      <h1>{store.preferences.server}</h1>
      <h2>Rerenders: {rerenderCounter}</h2>
      <div className="card">
        <button
          onClick={() => {
            store.preferences.changeServer("US");
            store.cache.invalidateFoundationalDataset();
          }}
        >
          revalidate
        </button>

        <button
          onClick={() => {
            store.preferences.changeLanguage("zh");
          }}
        >
          change language: zh
        </button>

        <button
          onClick={() => {
            store.preferences.changeLanguage("en");
          }}
        >
          change language: en
        </button>

        <div>Total {stages.size} stages</div>
        <div>main_01-07: {JSON.stringify(stages.get("main_01-07"))}</div>
        <div>
          randomMaterial_1 code: {stages.get("randomMaterial_1")?.localizedCode}
        </div>
      </div>
    </div>
  );
})

export default App
