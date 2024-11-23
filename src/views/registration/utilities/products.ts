import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import DevicesIcon from "@mui/icons-material/Devices";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ReactComponent as Hazmat } from "../../../assets/icons-01.svg";
import { ReactComponent as Passenger } from "../../../assets/icons-02.svg";
import { ReactComponent as Schoolbus } from "../../../assets/icons-03.svg";
import { ReactComponent as ClassB } from "../../../assets/icons-04.svg";
import { ReactComponent as ClassA } from "../../../assets/icons-05.svg";
import { ReactComponent as ClassBA } from "../../../assets/icons-06.svg";
import {CartItem} from "./validationSchema";

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
    title: "Class A CDL Training",
    description: "Combination Vehicle",
    icon: ClassA,
    type: "Class A",
  },
  {
    id: "2",
    title: "Class B CDL Training",
    description: "Single Vehicle",
    icon: ClassB,
    type: "Class B",
  },
  {
    id: "3",
    title: "Class B-A CDL Training",
    description: "Combination Vehicle",
    icon: ClassBA,
    type: "Class B-A",
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};

export const getCourseByType = (type: string): Course | undefined => {
  return courses.find((course) => course.type === type);
};

export interface Endorsement {
  id: string;
  title: string;
  icon?: React.ElementType;
  iconStyles?: React.CSSProperties;
  apiKey: string;
  sku: string;
  price: number;
}

export const endorsements: Endorsement[] = [
  {
    id: "1",
    title: "Hazmat",
    icon: Hazmat,
    iconStyles: { maxHeight: "30px" },
    price: 25,
    apiKey: "haz",
    sku: "hazmat_theory",
  },
  {
    id: "2",
    title: "Passenger",
    icon: Passenger,
    price: 25,
    apiKey: "passenger",
    sku: "passenger_theory",
  },
  {
    id: "3",
    title: "School Bus",
    icon: Schoolbus,
    price: 25,
    apiKey: "schoolBus",
    sku: "school_bus_theory",
  },
];

export const getEndorsementsByIds = (ids: string[]): Endorsement[] => {
  return endorsements.filter((endorsement) => ids.includes(endorsement.id));
};

export const getEndorsementsByApiKeys = (apiKeys: string[]): Endorsement[] => {
  return endorsements.filter((endorsement) => apiKeys.includes(endorsement.apiKey));
};

export interface Product {
  type: string;
  title: string;
  description?: string;
  benefits?: Array<{
    icon: React.ElementType;
    title: string;
  }>;
  skuMap: {
    [k: string]: string;
  }
  price: number;
}

export const products: Product[] = [
  {
    type: "master",
    price: 75,
    title: "ELDT Video MasterCourse",
    skuMap: {
      "Class A": "class_a_theory_master",
      "Class B": "class_b_theory_master",
      "Class B-A": "class_b-a_theory_master",
    },
    description:
      "An immersive learning experience with real CDL instructors—perfect for visual learners who want to see and hear their training come to life.",
    benefits: [
      {
        icon: DirectionsRunIcon,
        title: "Self-Paced",
      },
      {
        icon: AccessTimeIcon,
        title: "Available 24/7",
      },

      {
        icon: VerifiedIcon,
        title: "Includes certificate of completion",
      },
      {
        icon: AssuredWorkloadIcon,
        title: "Submits to TPR",
      },
      {
        icon: EngineeringIcon,
        title: "Learn by Watching Real CDL Instructors",
      },
      {
        icon: ThumbUpIcon,
        title: "Over 1,200 reviews and counting",
      },
      {
        icon: DevicesIcon,
        title: "For Visual Learners",
      },
    ],
  },
  {
    type: "reading",
    price: 50,
    title: "ELDT Written Course",
    skuMap: {
      "Class A": "class_a_theory",
      "Class B": "class_b_theory",
      "Class B-A": "class_b-a_theory",
    },
    description:
      "The Original Online Theory, designed and written by CDL instructors—perfect for those who prefer to learn through reading.",
    benefits: [
      {
        icon: DirectionsRunIcon,
        title: "Self-Paced",
      },
      {
        icon: AccessTimeIcon,
        title: "Available 24/7",
      },

      {
        icon: VerifiedIcon,
        title: "Includes certificate of completion",
      },
      {
        icon: AssuredWorkloadIcon,
        title: "Submits to TPR",
      },
    ],
  },
];
