export interface Course {
  id: string;
  title: string;
  description: string;
}

export const courses: Course[] = [
  { id: "1", title: "Class B CDL Training", description: "Single Vehicle" },
  {
    id: "2",
    title: "Class A CDL Training",
    description: "Combination Vehicle",
  },
  {
    id: "3",
    title: "Class B-A CDL Training",
    description: "Comination Vehicle",
  },
];

export interface Endorsement {
  id: string;
  title: string;
}

export const endorsements: Endorsement[] = [
  { id: "1", title: "Hazmat" },
  { id: "2", title: "Passenger" },
  { id: "3", title: "School Bus" },
];
