import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IGestante, Gestante } from 'app/shared/model/gestante.model';
import { GestanteService } from './gestante.service';
import { IProfissao } from 'app/shared/model/profissao.model';
import { ProfissaoService } from 'app/entities/profissao/profissao.service';
import { IOcupacao } from 'app/shared/model/ocupacao.model';
import { OcupacaoService } from 'app/entities/ocupacao/ocupacao.service';
import { INivelDeEscolaridade } from 'app/shared/model/nivel-de-escolaridade.model';
import { NivelDeEscolaridadeService } from 'app/entities/nivel-de-escolaridade/nivel-de-escolaridade.service';
import { IEstadoCivil } from 'app/shared/model/estado-civil.model';
import { EstadoCivilService } from 'app/entities/estado-civil/estado-civil.service';
import { ITipoSanguineo } from 'app/shared/model/tipo-sanguineo.model';
import { TipoSanguineoService } from 'app/entities/tipo-sanguineo/tipo-sanguineo.service';
import { IUF } from 'app/shared/model/uf.model';
import { UFService } from 'app/entities/uf/uf.service';
import { IPlanoDeSaude } from 'app/shared/model/plano-de-saude.model';
import { PlanoDeSaudeService } from 'app/entities/plano-de-saude/plano-de-saude.service';

type SelectableEntity = IProfissao | IOcupacao | INivelDeEscolaridade | IEstadoCivil | ITipoSanguineo | IUF | IPlanoDeSaude;

@Component({
  selector: 'jhi-gestante-update',
  templateUrl: './gestante-update.component.html',
})
export class GestanteUpdateComponent implements OnInit {
  isSaving = false;
  profissaos: IProfissao[] = [];
  ocupacaos: IOcupacao[] = [];
  niveldeescolaridades: INivelDeEscolaridade[] = [];
  estadocivils: IEstadoCivil[] = [];
  tiposanguineos: ITipoSanguineo[] = [];
  ufs: IUF[] = [];
  planodesaudes: IPlanoDeSaude[] = [];

  editForm = this.fb.group({
    id: [],
    dataDeCadastro: [],
    nomeCompleto: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    rg: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    dataDeNascimento: [null, [Validators.required]],
    email: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')],
    ],
    celular: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    telefoneFixo: [null, [Validators.minLength(10), Validators.maxLength(10)]],
    whatsapp: [null, [Validators.minLength(11), Validators.maxLength(11)]],
    instagram: [null, [Validators.minLength(3), Validators.maxLength(15)]],
    logradouro: [null, [Validators.required, Validators.maxLength(25)]],
    numero: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    complemento: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    bairro: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    cidade: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    profissao: [null, Validators.required],
    ocupacao: [null, Validators.required],
    nivelDeEscolaridade: [],
    estadoCivil: [],
    tipoSanguineo: [],
    uF: [],
    planoDeSaude: [],
  });

  constructor(
    protected gestanteService: GestanteService,
    protected profissaoService: ProfissaoService,
    protected ocupacaoService: OcupacaoService,
    protected nivelDeEscolaridadeService: NivelDeEscolaridadeService,
    protected estadoCivilService: EstadoCivilService,
    protected tipoSanguineoService: TipoSanguineoService,
    protected uFService: UFService,
    protected planoDeSaudeService: PlanoDeSaudeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gestante }) => {
      if (!gestante.id) {
        const today = moment().startOf('day');
        gestante.dataDeCadastro = today;
        gestante.dataDeNascimento = today;
      }

      this.updateForm(gestante);

      this.profissaoService
        .query({ filter: 'gestante-is-null' })
        .pipe(
          map((res: HttpResponse<IProfissao[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IProfissao[]) => {
          if (!gestante.profissao || !gestante.profissao.id) {
            this.profissaos = resBody;
          } else {
            this.profissaoService
              .find(gestante.profissao.id)
              .pipe(
                map((subRes: HttpResponse<IProfissao>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IProfissao[]) => (this.profissaos = concatRes));
          }
        });

      this.ocupacaoService
        .query({ filter: 'gestante-is-null' })
        .pipe(
          map((res: HttpResponse<IOcupacao[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IOcupacao[]) => {
          if (!gestante.ocupacao || !gestante.ocupacao.id) {
            this.ocupacaos = resBody;
          } else {
            this.ocupacaoService
              .find(gestante.ocupacao.id)
              .pipe(
                map((subRes: HttpResponse<IOcupacao>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IOcupacao[]) => (this.ocupacaos = concatRes));
          }
        });

      this.nivelDeEscolaridadeService
        .query({ filter: 'gestante-is-null' })
        .pipe(
          map((res: HttpResponse<INivelDeEscolaridade[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: INivelDeEscolaridade[]) => {
          if (!gestante.nivelDeEscolaridade || !gestante.nivelDeEscolaridade.id) {
            this.niveldeescolaridades = resBody;
          } else {
            this.nivelDeEscolaridadeService
              .find(gestante.nivelDeEscolaridade.id)
              .pipe(
                map((subRes: HttpResponse<INivelDeEscolaridade>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: INivelDeEscolaridade[]) => (this.niveldeescolaridades = concatRes));
          }
        });

      this.estadoCivilService
        .query({ filter: 'gestante-is-null' })
        .pipe(
          map((res: HttpResponse<IEstadoCivil[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEstadoCivil[]) => {
          if (!gestante.estadoCivil || !gestante.estadoCivil.id) {
            this.estadocivils = resBody;
          } else {
            this.estadoCivilService
              .find(gestante.estadoCivil.id)
              .pipe(
                map((subRes: HttpResponse<IEstadoCivil>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEstadoCivil[]) => (this.estadocivils = concatRes));
          }
        });

      this.tipoSanguineoService
        .query({ filter: 'gestante-is-null' })
        .pipe(
          map((res: HttpResponse<ITipoSanguineo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITipoSanguineo[]) => {
          if (!gestante.tipoSanguineo || !gestante.tipoSanguineo.id) {
            this.tiposanguineos = resBody;
          } else {
            this.tipoSanguineoService
              .find(gestante.tipoSanguineo.id)
              .pipe(
                map((subRes: HttpResponse<ITipoSanguineo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITipoSanguineo[]) => (this.tiposanguineos = concatRes));
          }
        });

      this.uFService
        .query({ filter: 'gestante-is-null' })
        .pipe(
          map((res: HttpResponse<IUF[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUF[]) => {
          if (!gestante.uF || !gestante.uF.id) {
            this.ufs = resBody;
          } else {
            this.uFService
              .find(gestante.uF.id)
              .pipe(
                map((subRes: HttpResponse<IUF>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUF[]) => (this.ufs = concatRes));
          }
        });

      this.planoDeSaudeService.query().subscribe((res: HttpResponse<IPlanoDeSaude[]>) => (this.planodesaudes = res.body || []));
    });
  }

  updateForm(gestante: IGestante): void {
    this.editForm.patchValue({
      id: gestante.id,
      dataDeCadastro: gestante.dataDeCadastro ? gestante.dataDeCadastro.format(DATE_TIME_FORMAT) : null,
      nomeCompleto: gestante.nomeCompleto,
      cpf: gestante.cpf,
      rg: gestante.rg,
      dataDeNascimento: gestante.dataDeNascimento ? gestante.dataDeNascimento.format(DATE_TIME_FORMAT) : null,
      email: gestante.email,
      celular: gestante.celular,
      telefoneFixo: gestante.telefoneFixo,
      whatsapp: gestante.whatsapp,
      instagram: gestante.instagram,
      logradouro: gestante.logradouro,
      numero: gestante.numero,
      complemento: gestante.complemento,
      bairro: gestante.bairro,
      cep: gestante.cep,
      cidade: gestante.cidade,
      profissao: gestante.profissao,
      ocupacao: gestante.ocupacao,
      nivelDeEscolaridade: gestante.nivelDeEscolaridade,
      estadoCivil: gestante.estadoCivil,
      tipoSanguineo: gestante.tipoSanguineo,
      uF: gestante.uF,
      planoDeSaude: gestante.planoDeSaude,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gestante = this.createFromForm();
    if (gestante.id !== undefined) {
      this.subscribeToSaveResponse(this.gestanteService.update(gestante));
    } else {
      this.subscribeToSaveResponse(this.gestanteService.create(gestante));
    }
  }

  private createFromForm(): IGestante {
    return {
      ...new Gestante(),
      id: this.editForm.get(['id'])!.value,
      dataDeCadastro: this.editForm.get(['dataDeCadastro'])!.value
        ? moment(this.editForm.get(['dataDeCadastro'])!.value, DATE_TIME_FORMAT)
        : undefined,
      nomeCompleto: this.editForm.get(['nomeCompleto'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      rg: this.editForm.get(['rg'])!.value,
      dataDeNascimento: this.editForm.get(['dataDeNascimento'])!.value
        ? moment(this.editForm.get(['dataDeNascimento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      email: this.editForm.get(['email'])!.value,
      celular: this.editForm.get(['celular'])!.value,
      telefoneFixo: this.editForm.get(['telefoneFixo'])!.value,
      whatsapp: this.editForm.get(['whatsapp'])!.value,
      instagram: this.editForm.get(['instagram'])!.value,
      logradouro: this.editForm.get(['logradouro'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      complemento: this.editForm.get(['complemento'])!.value,
      bairro: this.editForm.get(['bairro'])!.value,
      cep: this.editForm.get(['cep'])!.value,
      cidade: this.editForm.get(['cidade'])!.value,
      profissao: this.editForm.get(['profissao'])!.value,
      ocupacao: this.editForm.get(['ocupacao'])!.value,
      nivelDeEscolaridade: this.editForm.get(['nivelDeEscolaridade'])!.value,
      estadoCivil: this.editForm.get(['estadoCivil'])!.value,
      tipoSanguineo: this.editForm.get(['tipoSanguineo'])!.value,
      uF: this.editForm.get(['uF'])!.value,
      planoDeSaude: this.editForm.get(['planoDeSaude'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGestante>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
