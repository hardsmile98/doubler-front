import { lazy, Suspense } from 'react';
import { Route, Routes as RactRoutes } from 'react-router-dom';
import { Layout, Notification } from './components';

const Main = lazy(() => import('@/pages/Main'));

function Routes() {
  return (
    <Suspense fallback={<div />}>
      <Notification />

      <Layout>
        <RactRoutes>
          <Route path='*' element={<Main />} />
        </RactRoutes>
      </Layout>
    </Suspense>
  );
}

export default Routes;
