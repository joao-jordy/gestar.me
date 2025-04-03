import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGestante, Gestante } from 'app/shared/model/gestante.model';
import { GestanteService } from './gestante.service';
import { GestanteComponent } from './gestante.component';
import { GestanteDetailComponent } from './gestante-detail.component';
import { GestanteUpdateComponent } from './gestante-update.component';

@Injectable({ providedIn: 'root' })
export class GestanteResolve implements Resolve<IGestante> {
  constructor(private service: GestanteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGestante> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gestante: HttpResponse<Gestante>) => {
          if (gestante.body) {
            return of(gestante.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Gestante());
  }
}

export const gestanteRoute: Routes = [
  {
    path: '',
    component: GestanteComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gestarmeApp.gestante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GestanteDetailComponent,
    resolve: {
      gestante: GestanteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestarmeApp.gestante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GestanteUpdateComponent,
    resolve: {
      gestante: GestanteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestarmeApp.gestante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GestanteUpdateComponent,
    resolve: {
      gestante: GestanteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gestarmeApp.gestante.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
