import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase';
import { Account } from "./components/account/account";
import { CommonModule } from '@angular/common';
import { Auth } from './components/auth/auth';

@Component({
  selector: 'app-root',
  imports: [Auth, Account, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private readonly supabase: SupabaseService) {}
  title = 'angular-user-management'
  session: any
  ngOnInit() {
    this.session = this.supabase.session
    this.supabase.authChanges((_, session) => (this.session = session))
  }
}
