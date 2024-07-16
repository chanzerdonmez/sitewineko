import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleComponent } from './pages/admin/article/article.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserComponent } from './pages/admin/user/user.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component'
import { OrderComponent } from './pages/admin/order/order.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressComponent } from './pages/address/address.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'address',
        component: AddressComponent
    },
    // {
    //     path: '',
    //     redirectTo: '/all',
    //     pathMatch: 'full'
    // },
    { 
        path: 'category/:categoryTitle',
        component: CategoryPageComponent 
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'article', pathMatch: 'full' },
            { path: 'article', component: ArticleComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'user', component: UserComponent },
            { path: 'order', component: OrderComponent }

        ]
    },
    {
        path: 'my-account',
        component: MyAccountComponent,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent },
            { path: 'address', component: AddressComponent },
            { path: 'order', component: OrderComponent },

        ]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'article/:id',
        component: ArticleDetailComponent
    },
    // {
    //     path: 'dashboard/category',
    //     component: CategoryComponent
    // },
    {
        path: 'article-list',
        component: ArticleListComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    // {
    //     path: 'dashboard/article',
    //     component: ArticleComponent
    // },
    {
        path: '**',
        component: NotFoundComponent
    },
];
