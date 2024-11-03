export interface Course {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Class B CDL Training",
    description: "Single Vehicle",
    // icon: ClassB,
  },
  {
    id: "2",
    title: "Class A CDL Training",
    description: "Combination Vehicle",
    // icon: ClassA,
  },
  {
    id: "3",
    title: "Class B-A CDL Training",
    description: "Comination Vehicle",
    // icon: ClassBA,
  },
];

export interface Endorsement {
  id: string;
  title: string;
  icon?: React.ElementType;
}

export const endorsements: Endorsement[] = [
  { id: "1", title: "Hazmat" },
  { id: "2", title: "Passenger" },
  { id: "3", title: "School Bus" },
];
