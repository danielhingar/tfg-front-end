import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { ChartModule } from 'angular2-chartjs';
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
import { PaginatorComponent } from './paginators/paginatorCompany/paginator.component';
import { PaginatorProductsComponent } from './paginators/paginator-products/paginator-products.component';
import { PaginatorProductsListComponent } from './paginators/paginator-products-list/paginator-products-list.component';
// tslint:disable-next-line: max-line-length
import { PaginatorFacturesCompanyComponent } from './paginators/paginator-factures/paginator-factures-company/paginator-factures-company.component';
// tslint:disable-next-line: max-line-length
import { PaginatorFacturesClientComponent } from './paginators/paginator-factures/paginator-factures-client/paginator-factures-client.component';
// tslint:disable-next-line: max-line-length
import { PaginatorFacturesClientReporterComponent } from './paginators/paginator-factures/paginator-factures-client-reporter/paginator-factures-client-reporter.component';
// tslint:disable-next-line: max-line-length
import { PaginatorFacturesCompanyReporterComponent } from './paginators/paginator-factures/paginator-factures-company-reporter/paginator-factures-company-reporter.component';
import { PaginatorClaimsClientComponent } from './paginators/paginator-claims/paginator-claims-client/paginator-claims-client.component';
// tslint:disable-next-line: max-line-length
import { PaginatorClaimsReporterAllComponent } from './paginators/paginator-claims/paginator-claims-reporter-all/paginator-claims-reporter-all.component';
// tslint:disable-next-line: max-line-length
import { PaginatorClaimsReporterMeComponent } from './paginators/paginator-claims/paginator-claims-reporter-me/paginator-claims-reporter-me.component';
import { AuthGuard } from './user/guards/auth.guard';
import { RoleGuard } from './user/guards/role.guard';
import { CommentComponent } from './user/client/comment/comment/comment.component';
import { RecommendationComponent } from './user/company/products/recommendation/recommendation.component';
import { StatisticsComponent } from './user/admin/statistics/statisticsProductCompany/statistics.component';
import {StatisticsProductClientComponent} from './user/admin/statistics/statistics-product-client/statistics-product-client.component';
// tslint:disable-next-line: max-line-length
import { StatisticsProductSoldCompanyComponent } from './user/admin/statistics/statistics-product-sold-company/statistics-product-sold-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { TermsComponent } from './shared/terms/terms.component';
import { StatisticsByCategoryComponent } from './user/company/statistics/statistics-by-category/statistics-by-category.component';
import { StatisticsSoldComponent } from './user/company/statistics/statistics-sold/statistics-sold.component';
import { StatisticsOffertComponent } from './user/company/statistics/statistics-offert/statistics-offert.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConversationListComponent } from './user/client/conversation/conversation-list/conversation-list.component';
// tslint:disable-next-line: max-line-length
import { PaginatorMyConversationsComponent } from './paginators/paginator-conversations/paginator-my-conversations/paginator-my-conversations.component';
import { DetailConversationComponent } from './user/client/conversation/detail-conversation/detail-conversation.component';
// tslint:disable-next-line: max-line-length
import { ConversationListCompanyComponent } from './user/company/conversation/conversation-list-company/conversation-list-company.component';





const routes: Routes = [
  {path: 'register', component: FormComponent},
  {path: 'edit', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_CLIENT'}},
  {path: '', component: LoginComponent},
  {path: 'home/page/:page', component: HomeComponent},
  {path: 'registerCompany', component: FormCompanyComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'editCompany', component: FormCompanyComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'registerReporter', component: FormReporterComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'editReporter', component: FormReporterComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_REPORTER'}},
  {path: 'listUsers', component: UsersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'products/page/:page/:username', component: ProductsComponent},
  {path: 'myProducts/page/:page', component: MyproductsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'createProduct', component: FormProductsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'edit/product/:id', component: FormProductsComponent,  canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'detailsProduct/:id', component: ProductDetailsComponent},
  {path: 'myBasket', component: BasketComponent,  canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_CLIENT'}},
  {path: 'myFacture', component: FacturesPendingComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_CLIENT'}},
  {path: 'detailsFacture/:id', component: FactureDetailsComponent},
  {path: 'myOrders/page/:page', component: FactureComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_CLIENT'}},
  {path: 'Orders/page/:page', component: FactureCompanyComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'factures/page/:page', component: FactureReporterComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_REPORTER'}},
  {path: 'facturesCompany/page/:page', component: FacturesAllCompanyComponent,
   canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_REPORTER'}},
  {path: 'claims/page/:page', component: ClaimsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_REPORTER'}},
  {path: 'myClaims/page/:page', component: MyClaimsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_REPORTER'}},
  {path: 'showClaim/:id', component: ClaimDetailsComponent},
  {path: 'myClaim/page/:page', component: MyClaimsClientComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_CLIENT'}},
  {path: 'createClaim/:id', component: CreateClaimComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_CLIENT'}},
  {path: 'shippings', component: ListShippingComponent},
  {path: 'createShipping', component: DetailShippingComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'updateShipping/:id', component: DetailShippingComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'configuration', component: ConfigurationListComponent},
  {path: 'about/:id', component: DetailsAboutComponent},
  {path: 'about', component: AboutFormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'statistics1', component: StatisticsProductClientComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'statistics2', component: StatisticsProductSoldCompanyComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'terms', component: TermsComponent},
  {path: 'statistics3', component: StatisticsByCategoryComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'statistics4', component: StatisticsSoldComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'statistics5', component: StatisticsOffertComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_COMPANY'}},
  {path: 'myConversations/page/:page', component: ConversationListComponent, canActivate: [AuthGuard, RoleGuard],
   data: {role: 'ROLE_CLIENT'}},
  {path: 'Conversations/page/:page', component: ConversationListCompanyComponent, canActivate: [AuthGuard, RoleGuard],
   data: {role: 'ROLE_COMPANY'}}
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
    PaginatorComponent,
    PaginatorProductsComponent,
    PaginatorProductsListComponent,
    PaginatorFacturesCompanyComponent,
    PaginatorFacturesClientComponent,
    PaginatorFacturesClientReporterComponent,
    PaginatorFacturesCompanyReporterComponent,
    PaginatorClaimsClientComponent,
    PaginatorClaimsReporterAllComponent,
    PaginatorClaimsReporterMeComponent,
    CommentComponent,
    RecommendationComponent,
    StatisticsComponent,
    StatisticsProductClientComponent,
    StatisticsProductSoldCompanyComponent,
    TermsComponent,
    StatisticsByCategoryComponent,
    StatisticsSoldComponent,
    StatisticsOffertComponent,
    ConversationListComponent,
    PaginatorMyConversationsComponent,
    DetailConversationComponent,
    ConversationListCompanyComponent,

  ],
  entryComponents: [DetailConversationComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxQRCodeModule,
    ChartModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
