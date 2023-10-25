


import { AppProps } from 'next/app';
import { FC, useMemo } from 'react';

import { Layout } from '../components';

require('../styles/globals.css');



const App: FC<AppProps> = ({ Component, pageProps }) => {


  return (



    <Layout>
      <Component
        {...pageProps} />
    </Layout>




  );
};

export default App;
