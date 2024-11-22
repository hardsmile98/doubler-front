import { lazy, Suspense } from 'react';
import { Route, Routes as RactRoutes } from 'react-router-dom';
import { Layout } from './components';

const Main = lazy(() => import('@/pages/Main'));

function Routes() {
  return (
    <Suspense fallback={<div />}>
      <Layout>
        <RactRoutes>
          <Route path='*' element={<Main />} />
        </RactRoutes>
      </Layout>
    </Suspense>
  );
}

export default Routes;
