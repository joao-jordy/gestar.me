import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGestante } from 'app/shared/model/gestante.model';

@Component({
  selector: 'jhi-gestante-detail',
  templateUrl: './gestante-detail.component.html',
})
export class GestanteDetailComponent implements OnInit {
  gestante: IGestante | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestante }) => (this.gestante = gestante));
  }

  previousState(): void {
    window.history.back();
  }
}
