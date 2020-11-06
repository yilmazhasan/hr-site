export interface CandidateView {
  id: string | number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: object;
}

export interface Candidate extends CandidateView {
  address: object;
  website: string;
}
