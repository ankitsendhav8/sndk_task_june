import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
