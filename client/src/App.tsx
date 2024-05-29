import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Login, Signup, Home, Dashboard, Error, Profile } from './pages';
import { Layout } from './components/Layout';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';

// Component to handle redirection for the root path
const HomeRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  console.log('userInfo', userInfo);

  // If user is logged in, redirect to dashboard, otherwise show the home page
  return userInfo ? <Navigate to='/dashboard' replace /> : <Home />;
};

// Component to handle redirection for login and signup pages
const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  console.log('userInfo', userInfo);

  // If user is logged in, redirect to dashboard, otherwise render the child component (Login or Signup)
  return userInfo ? <Navigate to='/dashboard' replace /> : children;
};

// Component to protect routes that require authentication
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  console.log('userInfo', userInfo);

  // If user is logged in, render the child components (Dashboard or Profile), otherwise redirect to login
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomeRoute />} />
            <Route
              path='login'
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path='signup'
              element={
                <AuthRoute>
                  <Signup />
                </AuthRoute>
              }
            />
            <Route path='*' element={<Error />} />
            <Route element={<ProtectedRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='me' element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
