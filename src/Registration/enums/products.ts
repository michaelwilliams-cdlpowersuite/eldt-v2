import { ReactComponent as Hazmat } from "../assets/icons-01.svg";
import { ReactComponent as Schoolbus } from "../assets/icons-02.svg";
import { ReactComponent as Passenger } from "../assets/icons-03.svg";
import { ReactComponent as ClassA } from "../assets/icons-04.svg";
import { ReactComponent as ClassB } from "../assets/icons-05.svg";
import { ReactComponent as ClassBA } from "../assets/icons-06.svg";
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
