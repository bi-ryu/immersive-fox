import SignUp from "../pages/Signup";
import Login from "../pages/Login";
import {VerifyEmail} from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import SetPassword from "../pages/SetPassword";
import {Editor, Saved} from "../pages/ProjectEditor";
import VideoPlayerPage from "../pages/VideoPlayer";
import DragableComponent from "../pages/ProjectEditor/Editor/components/DragableComponent";

export const platformRoutes = [
  {
    path: '/avatar',
    exact: true,
    component: Editor,
  },
  {
    path: '/saved',
    exact: true,
    component: Saved,
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/verify-email/:key/',
    exact: true,
    component: VerifyEmail,
  },
  {
    path: '/forgot-password',
    exact: true,
    component: ForgotPassword,
  },
  {
    path: '/password-reset/:id/:key/',
    exact: true,
    component: SetPassword,
  },
  {
    path: '/play/:video_id/:id/',
    exact: true,
    component: VideoPlayerPage,
  },
  {
    path: '/drag',
    exact: true,
    component: DragableComponent,
  },
]
