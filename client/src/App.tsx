import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Login, Signup, Home, Dashboard, Error, Profile } from './pages';
import { Layout } from './components/Layout';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  console.log('userInfo', userInfo);

  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='*' element={<Error />} />
            <Route element={<PrivateRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='me' element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
