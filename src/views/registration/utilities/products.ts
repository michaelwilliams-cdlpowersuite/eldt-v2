import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DevicesIcon from "@mui/icons-material/Devices";
import KeyIcon from "@mui/icons-material/Key";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { ReactComponent as Hazmat } from "../../../assets/icons-01.svg";
import { ReactComponent as Passenger } from "../../../assets/icons-02.svg";
import { ReactComponent as Schoolbus } from "../../../assets/icons-03.svg";
import { ReactComponent as ClassB } from "../../../assets/icons-04.svg";
import { ReactComponent as ClassA } from "../../../assets/icons-05.svg";
import { ReactComponent as ClassBA } from "../../../assets/icons-06.svg";

export interface Course {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  iconStyles?: React.CSSProperties;
  type: string;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Class B CDL Training",
    description: "Single Vehicle",
    icon: ClassB,
    type: "Class B",
  },
  {
    id: "2",
    title: "Class A CDL Training",
    description: "Combination Vehicle",
    icon: ClassA,
    type: "Class A",
  },
  {
    id: "3",
    title: "Class B-A CDL Training",
    description: "Comination Vehicle",
    icon: ClassBA,
    type: "Class B-A",
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};

export interface Endorsement {
  id: string;
  title: string;
  icon?: React.ElementType;
  iconStyles?: React.CSSProperties;
  price?: number;
}

export const endorsements: Endorsement[] = [
  {
    id: "1",
    title: "Hazmat",
    icon: Hazmat,
    iconStyles: { maxHeight: "30px" },
    price: 50,
  },
  { id: "2", title: "Passenger", icon: Passenger, price: 25 },
  { id: "3", title: "School Bus", icon: Schoolbus, price: 25 },
];

export const getEndorsementsByIds = (ids: string[]): Endorsement[] => {
  return endorsements.filter((endorsement) => ids.includes(endorsement.id));
};

export interface CourseType {
  id: string;
  type: string;
  title: string;
  description?: string;
  benefits?: Array<{
    icon: React.ElementType;
    title: string;
  }>;
  price: number;
}

export const courseTypes: CourseType[] = [
  {
    id: "1",
    type: "video",
    price: 75,
    title: "Theory Video Version",
    description:
      "Our Video Master Course goes above and beyond industry standard to help you build a solid foundation as a new driver.",
    benefits: [
      {
        icon: AccessTimeIcon,
        title: "Available 24/7",
      },
      {
        icon: DevicesIcon,
        title: "Available on All Devices",
      },
      {
        icon: KeyIcon,
        title: "Lifetime Access",
      },
      {
        icon: OndemandVideoIcon,
        title: "On-Demand Video Streaming",
      },
    ],
  },
  {
    id: "2",
    type: "text",
    price: 50,
    title: "Theory Reading Version",
    description:
      "If you don't mind doing some reading, our Literature Course is just what you're looking for. Packed with great content that will help you begin your career as a commercial driver.",
    benefits: [
      {
        icon: AccessTimeIcon,
        title: "Available 24/7",
      },
      {
        icon: DevicesIcon,
        title: "Available on All Devices",
      },
      {
        icon: KeyIcon,
        title: "Lifetime Access",
      },
    ],
  },
];
