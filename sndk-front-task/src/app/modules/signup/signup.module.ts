import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [SharedModule, SignupRoutingModule],
})
export class SignupModule {}
