export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  portal: string;
  dateApplied: string;
  status: 'Applied' | 'Interview' | 'Rejected' | 'Offer';
  notes: string;
  createdAt: number;
  updatedAt: number;
}
