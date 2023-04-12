import '../../styles/styles.css'
import { Provider } from 'react-redux'
import { wrapper } from '../store'
import { SessionProvider } from 'next-auth/react'

function App({ Component, session, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default App;