import PageNotFound from "../components/pages/PageNotFound";
import UserFormPage from "../components/pages/UserFormPage";
import UserDetailsPage from "../components/pages/UserDetailsPage";

export const pageRoutes = [
  { path: 'https://shrikant9907.github.io/react-test-task1/', component: <UserFormPage /> },
  { path: 'https://shrikant9907.github.io/react-test-task1/user-details', component: <UserDetailsPage /> },
  { path: '*', component: <PageNotFound /> },
];
