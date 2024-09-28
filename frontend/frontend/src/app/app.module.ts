import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryAddComponent } from './components/category/category-add/category-add.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SumaryOrderComponent } from './components/orders/sumary-order/sumary-order.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/logout/logout.component'
import { authGuard } from './guards/auth.guard';
import { TicketComponent } from './components/ticket/ticket.component';
import { OrderHistoryComponent } from './components/orders/order-history/order-history.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UserEditComponent } from './components/admin/user-edit/user-edit.component';
import { UserOrdersComponent } from './components/admin/user-orders/user-orders.component';

const routes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin/product', component: ProductListComponent},
  {path: 'admin/product/addproduct', component: ProductAddComponent},
  {path: 'admin/product/update/:id', component: ProductAddComponent},
  {path: 'admin/category', component: CategoryListComponent },
  {path: 'admin/category/add', component: CategoryAddComponent},
  {path: 'admin/category/update/:id', component: CategoryAddComponent},
  {path: 'cart/detailproduct/:id', component: DetailProductComponent},
  {path: 'cart/sumary', component: SumaryOrderComponent, canActivate: [authGuard]},
  {path: 'payment/success', component: PaymentSuccessComponent},
  {path: 'user/register', component: RegistrationComponent},
  {path: 'user/login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'payment/success/ticket', component: TicketComponent, canActivate: [authGuard]},
  {path: 'user/orders', component: OrderHistoryComponent, canActivate: [authGuard]},
  {path: 'orders/detail/:id', component: OrderDetailsComponent},
  {path: 'admin/users', component: UserListComponent},
  {path: 'admin/edit-user/:id', component: UserEditComponent}


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    HeaderAdminComponent,
    ProductAddComponent,
    CategoryListComponent,
    CategoryAddComponent,
    DetailProductComponent,
    HeaderUserComponent,
    SumaryOrderComponent,
    PaymentSuccessComponent,
    RegistrationComponent,
    LoginComponent,
    LogoutComponent,
    TicketComponent,
    OrderHistoryComponent,
    FooterComponent,
    OrderDetailsComponent,
    UserListComponent,
    UserEditComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
