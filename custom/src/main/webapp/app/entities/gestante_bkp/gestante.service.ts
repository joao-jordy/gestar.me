import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGestante } from 'app/shared/model/gestante.model';

type EntityResponseType = HttpResponse<IGestante>;
type EntityArrayResponseType = HttpResponse<IGestante[]>;

@Injectable({ providedIn: 'root' })
export class GestanteService {
  public resourceUrl = SERVER_API_URL + 'api/gestantes';

  constructor(protected http: HttpClient) {}

  create(gestante: IGestante): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gestante);
    return this.http
      .post<IGestante>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(gestante: IGestante): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gestante);
    return this.http
      .put<IGestante>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGestante>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGestante[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(gestante: IGestante): IGestante {
    const copy: IGestante = Object.assign({}, gestante, {
      dataDeCadastro: gestante.dataDeCadastro && gestante.dataDeCadastro.isValid() ? gestante.dataDeCadastro.toJSON() : undefined,
      dataDeNascimento: gestante.dataDeNascimento && gestante.dataDeNascimento.isValid() ? gestante.dataDeNascimento.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataDeCadastro = res.body.dataDeCadastro ? moment(res.body.dataDeCadastro) : undefined;
      res.body.dataDeNascimento = res.body.dataDeNascimento ? moment(res.body.dataDeNascimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((gestante: IGestante) => {
        gestante.dataDeCadastro = gestante.dataDeCadastro ? moment(gestante.dataDeCadastro) : undefined;
        gestante.dataDeNascimento = gestante.dataDeNascimento ? moment(gestante.dataDeNascimento) : undefined;
      });
    }
    return res;
  }
}
