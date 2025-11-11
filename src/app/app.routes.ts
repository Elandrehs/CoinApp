import { Routes } from '@angular/router';

import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';

const MainLayoutComponent =()=>import('./layout/main-layout/main-layout.component').then(m=>m.MainLayoutComponent);
const FriendRequestPageComponent =()=>import('./features/friend-requests/pages/friend-request-page/friend-request-page.component').then(m=>m.FriendRequestPageComponent);
const FriendsPageComponent =()=>import('./features/friendships/pages/friends-page/friends-page.component').then(m=>m.FriendsPageComponent);
const FeedPageComponent =()=>import('./features/posts/pages/feed-page/feed-page.component').then(m=>m.FeedPageComponent);
const ProfilePageComponent =()=>import('./features/user-profile/pages/profile-page/profile-page.component').then(m=>m.ProfilePageComponent);
const PostDetailPageComponent =()=>import('./features/posts/pages/post-detail-page/post-detail-page.component').then(m=>m.PostDetailPageComponent);

const PageNotFoundComponent =()=>import('./shared/pages/page-not-found/page-not-found.component').then(m=>m.PageNotFoundComponent);

export const routes: Routes = [
  { path: 'auth', component: AuthLayoutComponent},
  {path:'', redirectTo:'/auth',pathMatch:'full'},
  {path:'main',loadComponent:MainLayoutComponent,
    children:[
      {path:'requests',loadComponent:FriendRequestPageComponent},
      {path:'friends/:id',loadComponent:FriendsPageComponent},
      {path:'feed',loadComponent:FeedPageComponent},
      {path:'post/:id',loadComponent:PostDetailPageComponent},
      {path:'profile/:id',loadComponent:ProfilePageComponent}
    ]},
  {path:'**',loadComponent:PageNotFoundComponent},
];
