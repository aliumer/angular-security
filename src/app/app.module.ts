import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { CategoryListComponent } from './category/category-list.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './security/login.component';
import { SecurityService } from './security/security.service';
import { HttpInterceptorModule } from './security/http-interceptor';
import { HasClaimDirective } from './security/has-claim.directive';
import { AdminComponent } from './admin/admin.component';
import { UserDetailComponent } from './admin/user-detail.component';
import { AdminService } from './admin/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryListComponent,
    DashboardComponent,
    LoginComponent,
    HasClaimDirective,
    AdminComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpInterceptorModule
  ],
  providers: [ProductService,
    CategoryService,
    SecurityService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
