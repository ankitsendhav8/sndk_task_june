import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [SharedModule, UserRoutingModule, NgxPaginationModule],
})
export class UserModule {}
