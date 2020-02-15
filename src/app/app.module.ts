import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxQRCodeModule} from 'ngx-qrcode2';
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
import { FacturesAllCompanyComponent } from './user/reporter/factures-all-company/factures-all-company.component';
import { MyClaimsComponent } from './user/reporter/claim/my-claims/my-claims.component';
import { ClaimsComponent } from './user/reporter/claim/claims/claims.component';
import { ClaimDetailsComponent } from './user/client/claim/claim-details/claim-details.component';
import { MyClaimsClientComponent } from './user/client/claim/my-claims-client/my-claims-client.component';
import { CreateClaimComponent } from './user/client/claim/create-claim/create-claim.component';
import { ListShippingComponent } from './user/admin/shipping/list-shipping/list-shipping.component';
import { DetailShippingComponent } from './user/admin/shipping/detail-shipping/detail-shipping.component';
import { ConfigurationListComponent } from './user/admin/configuration/configuration-list/configuration-list.component';
import { AboutFormComponent } from './user/company/about/about-form/about-form.component';
import { DetailsAboutComponent } from './user/company/about/details-about/details-about.component';
import { from } from 'rxjs';





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
  {path: 'factures', component: FactureReporterComponent},
  {path: 'facturesCompany', component: FacturesAllCompanyComponent},
  {path: 'claims', component: ClaimsComponent},
  {path: 'myClaims', component: MyClaimsComponent},
  {path: 'showClaim/:id', component: ClaimDetailsComponent},
  {path: 'myClaim', component: MyClaimsClientComponent},
  {path: 'createClaim/:id', component: CreateClaimComponent},
  {path: 'shippings', component: ListShippingComponent},
  {path: 'createShipping', component: DetailShippingComponent},
  {path: 'updateShipping/:id', component: DetailShippingComponent},
  {path: 'configuration', component: ConfigurationListComponent},
  {path: 'about/:id', component: DetailsAboutComponent},
  {path: 'about', component: AboutFormComponent}
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
    FactureReporterComponent,
    FacturesAllCompanyComponent,
    MyClaimsComponent,
    ClaimsComponent,
    ClaimDetailsComponent,
    MyClaimsClientComponent,
    CreateClaimComponent,
    ListShippingComponent,
    DetailShippingComponent,
    ConfigurationListComponent,
    AboutFormComponent,
    DetailsAboutComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxQRCodeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
