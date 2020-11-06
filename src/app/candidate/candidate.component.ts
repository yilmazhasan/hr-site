import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../model/Candidate.model';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  sub: any;
  id = 0;
  candidate: Candidate = {} as Candidate;

  constructor(private route: ActivatedRoute, private router: Router, private candidateServ: CandidateService) {

  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['id'];
        this.candidate = this.candidateServ.getCandidateDetailById(this.id);
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
