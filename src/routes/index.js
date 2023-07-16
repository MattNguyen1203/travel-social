import NotFound from "~/components/NotFound/NotFound";
import AuthenLayout from "~/layouts/Auth/AuthenLayout";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Login from "~/modules/auth/Login/Login";
import Register from "~/modules/auth/Register/Register";
import Profile from "~/modules/profile/Profile";
import Vacation from "~/modules/vacation/Vacation";
import UpdateUser from "~/modules/auth/Update/UpdateUser";
import Security from "~/modules/auth/Update/Security/Security";
import Personal from "~/modules/auth/Update/Personal/Personal";
import Overview from "~/modules/auth/Update/Overview/Overview";
import NewFeed from "~/modules/newfeed/NewFeed";
// import AlbumProfile from "~/modules/profile/Album";
import NewAlbum from "~/modules/album/NewAlbum/NewAlbum";

import {
  LOGIN_ROUTE,
  OVERVIEW_ROUTE,
  PERSONAL_ROUTE,
  REGISTER_ROUTE,
  SECURITY_ROUTE,
  SETTING_ROUTE,
  VACATION_ROUTE,
} from "~/utils/constants";

export const publicRoutes = [
  { path: "/", component: NewFeed, layout: DefaultLayout },
  {
    path: LOGIN_ROUTE,
    component: Login,
    layout: AuthenLayout,
  },
  { path: REGISTER_ROUTE, component: Register, layout: AuthenLayout },
  {
    path: SETTING_ROUTE,
    component: UpdateUser,
    layout: DefaultLayout,
    child: [
      {
        path: "",
        component: Overview,
      },
      {
        path: OVERVIEW_ROUTE,
        component: Overview,
      },
      {
        path: PERSONAL_ROUTE,
        component: Personal,
      },
      {
        path: SECURITY_ROUTE,
        component: Security,
      },
    ],
  },

  { path: "/profile", component: Profile, layout: DefaultLayout },
  { path: "/newAlbum", component: NewAlbum, layout: DefaultLayout },

  {
    path: VACATION_ROUTE,
    component: Vacation,
    layout: DefaultLayout,
  },

  { path: "*", component: NotFound },
];
