import { Injectable } from '@angular/core';


@Injectable()
export class Oggetto {
  barcode = '';
  descrizione = '';
  fissomobile = '';
  idoggetto = '';
  nomeoggetto = '';
}

@Injectable()
export class Con {
  descrX = '';
  idcondizione = '';
  idoggetto = '';
  tabcond = '';
  tipocond = '';
  valcond = '';
}

@Injectable()
export class Condizione {
  cc: sting;
  con: Con;
  constructor ( ) {
    this.cc = '';
    this.con = new Con;
  }
}

@Injectable()
export class FullOggetto {
  oggetto: Oggetto;
  condizioni: Array<Condizione>;
  constructor ( ) {
    this.oggetto = new Oggetto;
    this.condizioni = [];
  }
}
