import '../../styles/styles.css'
import { Provider } from 'react-redux'

import { storeWrapper } from '../store'

function App({ Component, ...rest }) {
    const { store, props } = storeWrapper.useWrappedStore(rest);
    const { pageProps } = props;
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  );
}

export default App;