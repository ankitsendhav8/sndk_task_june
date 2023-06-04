import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [SharedModule, UserRoutingModule, NgxPaginationModule],
})
export class UserModule {}
