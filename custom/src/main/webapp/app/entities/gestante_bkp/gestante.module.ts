import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestarmeSharedModule } from 'app/shared/shared.module';
import { GestanteComponent } from './gestante.component';
import { GestanteDetailComponent } from './gestante-detail.component';
import { GestanteUpdateComponent } from './gestante-update.component';
import { GestanteDeleteDialogComponent } from './gestante-delete-dialog.component';
import { gestanteRoute } from './gestante.route';

@NgModule({
  imports: [GestarmeSharedModule, RouterModule.forChild(gestanteRoute)],
  declarations: [GestanteComponent, GestanteDetailComponent, GestanteUpdateComponent, GestanteDeleteDialogComponent],
  entryComponents: [GestanteDeleteDialogComponent],
})
export class GestarmeGestanteModule {}
