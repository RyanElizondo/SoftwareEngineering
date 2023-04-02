import '../../styles/styles.css'
import { Provider } from 'react-redux'

import { wrapper } from '../store'

function App({ Component, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  );
}

export default App;