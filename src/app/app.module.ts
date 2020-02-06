import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './user/client/form.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormCompanyComponent } from './user/company/form-company.component';
import { FormReporterComponent } from './user/reporter/form-reporter.component';
import { UsersComponent } from './user/admin/users/users.component';
import { ProductsComponent } from './user/company/products/products.component';
import { FormProductsComponent } from './user/company/products/form-products/form-products.component';
import { ProductDetailsComponent } from './user/company/products/product-details/product-details.component';
import { MyproductsComponent } from './user/company/products/myproducts/myproducts.component';
import { BasketComponent } from './user/client/basket/basket.component';
import { FacturesPendingComponent } from './user/client/facture/factures-pending/factures-pending.component';
import { FactureComponent } from './user/client/facture/facture/facture.component';
import { FactureDetailsComponent } from './user/client/facture/facture-details/facture-details.component';
import { FactureCompanyComponent } from './user/company/facture-company/facture-company.component';
import { FactureReporterComponent } from './user/reporter/facture-reporter/facture-reporter.component';



const routes: Routes = [
  {path: 'register', component: FormComponent},
  {path: 'edit', component: FormComponent},
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registerCompany', component: FormCompanyComponent},
  {path: 'editCompany', component: FormCompanyComponent},
  {path: 'registerReporter', component: FormReporterComponent},
  {path: 'editReporter', component: FormReporterComponent},
  {path: 'listUsers', component: UsersComponent},
  {path: 'products/:id', component: ProductsComponent},
  {path: 'myProducts', component: MyproductsComponent},
  {path: 'createProduct', component: FormProductsComponent},
  {path: 'edit/product/:id', component: FormProductsComponent},
  {path: 'detailsProduct/:id', component: ProductDetailsComponent},
  {path: 'myBasket', component: BasketComponent},
  {path: 'myFacture', component: FacturesPendingComponent},
  {path: 'detailsFacture/:id', component: FactureDetailsComponent},
  {path: 'myOrders', component: FactureComponent},
  {path: 'Orders', component: FactureCompanyComponent},
  {path: 'factures', component: FactureReporterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    LoginComponent,
    HomeComponent,
    FormCompanyComponent,
    FormReporterComponent,
    UsersComponent,
    UsersComponent,
    ProductsComponent,
    FormProductsComponent,
    ProductDetailsComponent,
    MyproductsComponent,
    BasketComponent,
    FacturesPendingComponent,
    FactureComponent,
    FactureDetailsComponent,
    FactureCompanyComponent,
    FactureReporterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
