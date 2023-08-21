import { Component, inject, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  //? Injecciones ´´´´
  private authService = inject( AuthService );
  //? ´´´´
  //Todos:  En lugar de usar el get
  public user = computed( () => this.authService.currentUser() );
  public estado = computed( () => this.authService.authStatus());

  logout(){
    this.authService.logout();
  }

}
