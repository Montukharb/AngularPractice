import { Routes } from '@angular/router';
// import { ResolveFn } from '@angular/router';
import { About } from './about/about';
// import { Card } from './card/card';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Home } from './pages/home/home';
import { ChildA } from './core/layout/sidebar/child-a/child-a';
import { ChildB } from './core/layout/sidebar/child-b/child-b';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { canActivateGuard } from './core/guards/can-activate-guard';
import { Login } from './core/layout/login/login';
import { loginGuard } from './core/guards/login-guard';
import { canDeativateGuard } from './core/guards/can-deativate-guard';
import { userDetailResolver } from './core/resolver/user-detail-resolver';


// const titleResolver:ResolveFn<string> = (route) => route.queryParams['id'];  //dynamic title set karne ka liya
export const routes: Routes = [
   {
      path: '',  //home component path by default empty
      component: Home,
      title: 'Home'
   },
   {
      path: 'about', //normal route next component path
      component: About,
      title: 'About'
      //  redirectTo:'/contact' // redirect ka use tab karte hai koi route out of date ho zaye component available na to user ko page not found error na mile direct kisi na kisi router par redirect ho zaye jab reidirect ka use kar rahe to component property nahi di zaye gi.
   },
   {
      path: 'dashboard',
      component: Dashboard,
      title: 'Dashboard',
      canActivate: [canActivateGuard]
   },
   {
      path: 'login',
      component: Login,
      title: 'Login',
      canActivate: [loginGuard]
   },
   {
      path: 'card',  //parameter route ka liya phele colon lagane hote hai for example 'card/:id/:name' multiple parameter pass hote hai single bhi le sakte ha 'card/:id'
      title: 'Card',
      loadComponent: () => {
         return import('./card/card').then((load) => load.Card).catch(() => import('./pages/page-not-found/page-not-found').then((load) => load.PageNotFound));
      }     // ye lagy loading ho rahi isme phele component load nahi hoga jab tak clik na kare or error par dynamic notfound component fallback return ho zaye ga same aise hi children ka liya apply hota ha
   },
   {
      path: 'setting',
      loadComponent: () => {
         return import('./core/layout/sidebar/setting/setting').then((compo) => compo.Setting)
      },
      title: 'Setting',
      children: [
         {
            path: 'childA',
            title: 'ChildA',
            component: ChildA,
            canDeactivate: [canDeativateGuard]

         },
         {
            path: 'childB',
            title: 'ChildB',
            component: ChildB,
            resolve: {
               userDetails: userDetailResolver,
               // yaha par userDetails key hai or userDetailResolver eak resolver function hai jo abb childb componnent ma access hoga oninit me ya fir input binding me yaha multiple resolverFn bhi ho sakte hai
            },

         }
      ]
   },
   //    {
   //     path: 'product/:id',
   //     component: Product,
   //     children: [
   //       {
   //         path: 'info',
   //         component: ProductInfo,   //Example of Children routes. 
   //       },
   //       {
   //         path: 'reviews',
   //         component: ProductReviews,
   //       },
   //     ],
   //   },
   {
      path: '**', // wild card path page not found component always define in last in array,
      component: PageNotFound,
      title: 'Page-Not-Found'
   }
];
