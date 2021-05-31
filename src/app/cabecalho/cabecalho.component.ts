import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../usuarios/usuario.service';
import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  private authObserver!: Subscription;
  public autenticado: boolean = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;


  constructor(private usuarioService: UsuarioService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width:99999px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
 }
  ngOnInit(): void {
    this.autenticado = this.usuarioService.isAutenticado();
    this.authObserver =
      this.usuarioService.getStatusSubject().
        subscribe((autenticado) => {
          this.autenticado = autenticado;
        })
  }
  ngOnDestroy():void {
    this.authObserver.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(){
    this.usuarioService.logout();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
