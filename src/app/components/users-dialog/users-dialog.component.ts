import { ProfileService } from './../../services/profile.service';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserDetail } from '../../interfaces/user-detail';
import { Observable, timer } from 'rxjs';
import { ProfileDetail } from '../../interfaces/profile-detail';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/snackbar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.css'
})
export class UsersDialogComponent implements OnInit {
  userDetail!: UserDetail;
  profileService = inject(ProfileService);
  snackbar = inject(SnackbarService);
  profilesDetail!: Observable<ProfileDetail[]>;
  isLoadingResults = true;

  constructor(
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.userDetail = this.data.userDetail;
    this.loadData();
  }

  loadData(): void {
    this.isLoadingResults = true;
    this.profilesDetail = this.profileService.getAllProfiles();
    //SIMULA DELAY
    timer(250).subscribe(() => 
      this.profilesDetail.subscribe({
        next: () => {
          this.isLoadingResults = false;    
        }
      })
    );    
  }

  deleteProfile(id: string) {
    this.profileService.deleteProfile(id).subscribe({
      next: (response) => {
        this.snackbar.showMessage("Usuário deletado com sucesso!");
        console.log(response);
      },
      error: (err) => {
        this.snackbar.showMessage('Erro ao deletar!');
        console.error(err);
      },
      complete: () => {
        this.loadData();
      }
    });
  }

}

