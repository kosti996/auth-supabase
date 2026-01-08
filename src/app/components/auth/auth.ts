import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { SupabaseService } from '../../services/supabase'

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  signInForm!: FormGroup
  mode: 'signin' | 'signup' = 'signin'
  loading = false

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: '',
      password: '',
    })
  }

  toggleMode(mode: 'signin' | 'signup') {
    this.mode = mode
    this.signInForm.reset()
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const password = this.signInForm.value.password as string

      if (this.mode === 'signup') {
        const { error } = await this.supabase.signUp(email, password)
        if (error) throw error
        alert('Sign up successful — check your email to confirm if required.')
      } else {
        const { error } = await this.supabase.signInWithPassword(email, password)
        if (error) throw error
        alert('Signed in successfully')
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }
}