import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { Profile, SupabaseService } from '../../services/supabase'

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account implements OnInit {
  loading = false
  profile!: Profile
  updateProfileForm!: FormGroup
  @Input()
  session!: AuthSession

  constructor(
    private readonly supabase: SupabaseService,
    private formBuilder: FormBuilder
  ) {
    this.updateProfileForm = this.formBuilder.group({
      username: '',
      website: '',
    })
  }
  async ngOnInit(): Promise<void> {
    await this.getProfile()
    const { username, website } = this.profile
    this.updateProfileForm.patchValue({
      username,
      website,
    })
  }
  async getProfile() {
    try {
      this.loading = true
      const { user } = this.session
      const { data: profile, error, status } = await this.supabase.profile(user)
      if (error && status !== 406) {
        throw error
      }
      if (profile) {
        this.profile = profile
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }
  async updateProfile(): Promise<void> {
    try {
      this.loading = true
      const { user } = this.session
      const username = this.updateProfileForm.value.username as string
      const website = this.updateProfileForm.value.website as string
      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username,
        website,
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }
  async signOut() {
    await this.supabase.signOut()
  }
}
