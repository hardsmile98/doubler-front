import { lazy, Suspense } from 'react';
import { Route, Routes as RactRoutes } from 'react-router-dom';

const Main = lazy(() => import('@/pages/Main'));

function Routes() {
  return (
    <Suspense fallback={<div />}>
      <RactRoutes>
        <Route path='*' element={<Main />} />
      </RactRoutes>
    </Suspense>
  );
}

export default Routes;
