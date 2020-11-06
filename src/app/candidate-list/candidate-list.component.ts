import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { CandidateService } from '../candidate.service';
import { CandidateView } from '../model/Candidate.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})

export class CandidateListComponent implements OnInit {
  candidates = [];
  shownCandidates = [];

  displayedColumns: string[] = ['name', 'username', 'email', 'phone', 'company', 'action'];
  dataSource = new MatTableDataSource<CandidateView>(this.candidates);

  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private candService: CandidateService, private router: Router) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    // console.log(filterValue)
  }

  ngOnInit() {
    this.candService.getCandidateViewList().then(list => {
      this.candidates.push(...(list as []));
      // console.log(this.candidates)
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.candidates);
      this.setDataSoruce();
      });

  }

  setDataSoruce() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const sortState: Sort = {active: 'name', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  showCandidate(candidate) {
    // this.router.navigate(['/candidate'], { queryParams: { id: candidate.id } });
  }

}
