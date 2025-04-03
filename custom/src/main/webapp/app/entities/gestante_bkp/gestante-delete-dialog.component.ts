import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGestante } from 'app/shared/model/gestante.model';
import { GestanteService } from './gestante.service';

@Component({
  templateUrl: './gestante-delete-dialog.component.html',
})
export class GestanteDeleteDialogComponent {
  gestante?: IGestante;

  constructor(protected gestanteService: GestanteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gestanteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gestanteListModification');
      this.activeModal.close();
    });
  }
}
