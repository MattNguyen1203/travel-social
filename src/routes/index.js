import NotFound from "~/components/NotFound/NotFound";
import AuthenLayout from "~/layouts/Auth/AuthenLayout";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Login from "~/modules/auth/Login/Login";
import Register from "~/modules/auth/Register/Register";
import Overview from "~/modules/auth/Update/Overview/Overview";
import Personal from "~/modules/auth/Update/Personal/Personal";
import Security from "~/modules/auth/Update/Security/Security";
import UpdateUser from "~/modules/auth/Update/UpdateUser";
import NewFeed from "~/modules/newfeed/NewFeed";
import Album from "~/modules/vacation/Album/Album";
import Posts from "~/modules/vacation/Posts/Posts";
import Vacation from "~/modules/vacation/Vacation";

import {
  LOGIN_ROUTE,
  OVERVIEW_ROUTE,
  PERSONAL_ROUTE,
  REGISTER_ROUTE,
  SECURITY_ROUTE,
  SETTING_ROUTE,
  VACATION_ALBUM_ROUTE,
  VACATION_POSTS_ROUTE,
  VACATION_ROUTE,
} from "~/utils/constants";

export const publicRoutes = [
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
  {
    path: VACATION_ROUTE,
    component: Vacation,
    layout: DefaultLayout,
    child: [
      {
        path: "",
        component: Posts,
      },
      {
        path: VACATION_POSTS_ROUTE,
        component: Posts,
      },
      {
        path: VACATION_ALBUM_ROUTE,
        component: Album,
      },
    ],
  },
  { path: "/", component: NewFeed, layout: DefaultLayout },

  { path: "*", component: NotFound },
];
