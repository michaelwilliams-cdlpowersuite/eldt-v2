import { Alert, Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormikContext } from "formik";
import { brandColors } from "../../styles/brandColors";
import { CourseCard, EndorsementCard } from "./components/ProductCards";
import { useSelectCourse } from "./hooks/useSelectCourse";
import { useSelectEndorsement } from "./hooks/useSelectEndorsement";
import {
  Course,
  courses,
  Endorsement,
  endorsements,
} from "./utilities/products";
import { pxContainer, titleStyles } from "./utilities/styles";
import Checkout from "./Checkout";

interface Step1Props {}

const Step1: React.FC<Step1Props> = () => {
  const { values, errors, touched } = useFormikContext<{
    step1: { selectedCourse: string; selectedEndorsements: string[] };
  }>();

  const selectCourse = useSelectCourse();
  const selectEndorsement = useSelectEndorsement();

  const handleSelectCourse = (id: Course["id"]) => {
    selectCourse(id);
  };

  const handleSelectEndorsement = (id: Endorsement["id"]) => {
    selectEndorsement(id);
  };

  return (
    <Checkout />
  );
};

export default Step1;
