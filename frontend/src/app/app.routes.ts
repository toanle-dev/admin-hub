import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ManagerContainerComponent } from './pages/manager/manager-container/manager-container.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { EcommerceContainerComponent } from './pages/ecommerce/ecommerce-container/ecommerce-container.component';
import { CheckoutContainerComponent } from './pages/checkout/checkout-container/checkout-container.component';
import { CheckoutComponent } from './pages/checkout/checkout/checkout.component';
import { LoginEcommerceComponent } from './pages/login-ecommerce/login-ecommerce.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login-ecommerce',
    component: LoginEcommerceComponent,
  },
  {
    path: '',
    component: EcommerceContainerComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/ecommerce/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: CheckoutContainerComponent,
    children: [
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },
  {
    path: '',
    component: ManagerContainerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'user-management',
        loadComponent: () =>
          import('./pages/manager/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
      {
        path: 'user-edit/:id',
        loadComponent: () =>
          import('./pages/manager/user-edit/user-edit.component').then(
            (m) => m.UserEditComponent
          ),
      },
      {
        path: 'product-management',
        loadComponent: () =>
          import('./pages/manager/product/product.component').then(
            (m) => m.ProductComponent
          ),
      },
      {
        path: 'product-add',
        loadComponent: () =>
          import('./pages/manager/product-add/product-add.component').then(
            (m) => m.ProductAddComponent
          ),
      },
      {
        path: 'product-edit/:id',
        loadComponent: () =>
          import('./pages/manager/product-edit/product-edit.component').then(
            (m) => m.ProductEditComponent
          ),
      },
      {
        path: 'category-management',
        loadComponent: () =>
          import('./pages/manager/category/category.component').then(
            (m) => m.CategoryComponent
          ),
      },
      {
        path: 'category-add',
        loadComponent: () =>
          import('./pages/manager/category-add/category-add.component').then(
            (m) => m.CategoryAddComponent
          ),
      },
      {
        path: 'category-edit/:id',
        loadComponent: () =>
          import('./pages/manager/category-edit/category-edit.component').then(
            (m) => m.CategoryEditComponent
          ),
      },
    ],
  },
];
