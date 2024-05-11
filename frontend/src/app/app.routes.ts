import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleComponent } from './pages/admin/article/article.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'product-detail',
        component: ProductDetailComponent
    },
    {
        path: 'product-list',
        component: ProductListComponent
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
    {
        path: 'article',
        component: ArticleComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
