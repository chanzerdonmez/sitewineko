import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ArticleListComponent } from "./pages/article-list/article-list.component";
import { CartComponent } from "./pages/cart/cart.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { LoginComponent } from "./pages/login/login.component";
import { ArticleComponent } from "./pages/admin/article/article.component";
import { CategoryComponent } from "./pages/admin/category/category.component";
import { RegisterComponent } from "./pages/register/register.component";
import { DashboardComponent } from "./pages/admin/dashboard/dashboard.component";
import { UserComponent } from "./pages/admin/user/user.component";
import { CategoryPageComponent } from "./pages/category-page/category-page.component";
import { ArticleDetailComponent } from "./pages/article-detail/article-detail.component";
import { OrderComponent } from "./pages/admin/order/order.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { MyAccountComponent } from "./pages/my-account/my-account.component";
import { PaymentComponent } from "./pages/payment/payment.component";
import { SuccessComponent } from "./pages/success/success.component";
import { CancelComponent } from "./pages/cancel/cancel.component";
import { MyOrdersComponent } from "./pages/my-orders/my-orders.component";
import { MyReturnsComponent } from "./pages/my-returns/my-returns.component";
import { ForgottenPasswordComponent } from "./pages/forgotten-password/forgotten-password.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";
import { WhyChooseUsComponent } from "./pages/why-choose-us/why-choose-us.component";
import { adminGuard } from "./guards/admin.guard";
import { authGuard } from "./guards/auth.guad";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "category/:categoryTitle",
    component: CategoryPageComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [adminGuard], // Utilisation de la guard pour les admins
    children: [
      { path: "", redirectTo: "article", pathMatch: "full" },
      { path: "article", component: ArticleComponent },
      { path: "category", component: CategoryComponent },
      { path: "user", component: UserComponent },
      { path: "order", component: OrderComponent },
    ],
  },
  {
    path: "my-account",
    component: MyAccountComponent,
    canActivate: [authGuard], // Guard pour les utilisateurs connectés
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      { path: "profile", component: ProfileComponent },
      { path: "my-orders", component: MyOrdersComponent },
      { path: "my-returns", component: MyReturnsComponent },
    ],
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "article/:id",
    component: ArticleDetailComponent,
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
  {
    path: "forgotten-password",
    component: ForgottenPasswordComponent,
  },
  {
    path: "why-choose-us",
    component: WhyChooseUsComponent,
  },
  {
    path: "success",
    component: SuccessComponent,
  },
  {
    path: "cancel",
    component: CancelComponent,
  },
  {
    path: "article-list",
    component: ArticleListComponent,
  },
  {
    path: "payment",
    component: PaymentComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard], // Guard pour les utilisateurs connectés
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
