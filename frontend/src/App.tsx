import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import CreateListing from './pages/CreateListing';
import Profile from './pages/Profile';
import Negotiation from './pages/Negotiation';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  component: Marketplace,
});

const createListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create-listing',
  component: CreateListing,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const negotiationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/negotiation',
  component: Negotiation,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  marketplaceRoute,
  createListingRoute,
  profileRoute,
  negotiationRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
