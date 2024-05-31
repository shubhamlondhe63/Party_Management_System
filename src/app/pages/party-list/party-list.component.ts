import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../services/party.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
  parties: any[] = [];

  constructor(private partyService: PartyService, private router : Router, private toast: HotToastService) {}

  ngOnInit(): void {
    this.loadParties();
  }

  loadParties(): void {
    this.partyService.getParties().subscribe({
      next: (data: any[]) => {
        this.parties = data;
      },
      error: (err: any) => {
        console.error('Error loading parties:', err);
      }
    });
  }

  addParty() {
    this.router.navigate(['/parties/new']);
    this.toast.success('👍 Yeah!!');
  }

}
