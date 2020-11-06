import { Injectable } from '@angular/core';
import { environment, EnvType } from 'src/environments/environment';
import { Candidate, CandidateView } from './model/Candidate.model';
import { MockCandidateList } from 'src/app/model/MockCandidates';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidateList: Candidate[] = [];
  candidateViewList: CandidateView[] = [];

  constructor(http: HttpClient) {
    if (environment.type === EnvType.test || environment.type === EnvType.dev) {
      this.candidateList = MockCandidateList;
      this.arrangeCandidateList();
    } else {
      http.get('https://jsonplaceholder.typicode.com/users').subscribe(list => {
        this.candidateList = list as Candidate[];
        this.arrangeCandidateList();
      });
    }
  }

  arrangeCandidateList() {
    this.candidateList.sort((x, y) => x.name > y.name ? 1 : -1);

    this.candidateViewList = this.candidateList.map(
      el => ({ id: el.id, name: el.name, email: el.email, phone: el.phone, username: el.username, company: el.company }));
  }

  async getCandidateViewList() {
    return new Promise<object>((res, rej) => {
        const timer = setInterval(() => {
          if (this.candidateList.length > 0) {
            clearInterval(timer);
            res(this.candidateViewList);
          }
        }, 100);
      });
  }

  getCandidateDetailById(id) {
    id = String(id);
    return this.candidateList.find(x => String(x.id) === String(id));
  }

}
