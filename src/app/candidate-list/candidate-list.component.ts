import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CandidateService } from '../candidate.service';

export interface PeriodicElement {
  name: string;
  username: string;
  email: string;
  phone: string;
  company: string;
}

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})

export class CandidateListComponent implements OnInit {
  candidates = [];
  shownCandidates = [];

  displayedColumns: string[] = ['name', 'username', 'email', 'phone', 'company'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.candidates);

  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private candService: CandidateService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(filterValue)
  }

  ngOnInit() {
    this.candidates.push(...this.candService.getCandidateList());
    console.log(this.candidates)
    // this.dataSource = new MatTableDataSource<PeriodicElement>(this.candidates);
    this.dataSource.paginator = this.paginator;
  }

}
