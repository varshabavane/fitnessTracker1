import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>()
  isAuth : boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.authChange.subscribe(
      authStatus =>{
        this.isAuth = authStatus;
      }
    )
  }
  onToggleSideNav(){
    this.sidenavToggle.emit();
  }
}
