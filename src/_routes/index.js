import PageNotFound from "../components/pages/PageNotFound";
import UserFormPage from "../components/pages/UserFormPage";
import UserDetailsPage from "../components/pages/UserDetailsPage";

export const pageRoutes = [
  { path: '/', component: <UserFormPage /> },
  { path: '/user-details', component: <UserDetailsPage /> },
  { path: '*', component: <PageNotFound /> },
];
