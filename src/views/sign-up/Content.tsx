import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DevicesIcon from "@mui/icons-material/Devices";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import LogoIcon from "../../assets/LogoIconELDT";
import { brandColors } from "../../styles/brandColors";

const items = [
  {
    icon: <VerifiedIcon sx={{ color: "text.secondary" }} />,
    title: "#1 Online ELDT Training Platform",
    description:
      "We set the standard for online ELDT training, trusted by over 300 Registered Training Providers.",
  },
  {
    icon: <SchoolIcon sx={{ color: "text.secondary" }} />,
    title: "Designed by CDL Instructors",
    description:
      "Courses created by certified CDL instructors to ensure you get the best training.",
  },
  {
    icon: <AttachMoneyIcon sx={{ color: "text.secondary" }} />,
    title: "Affordable and Flexible",
    description:
      "Complete your training with the most cost-effective courses, available 24/7 to fit your busy schedule.",
  },
  {
    icon: <DevicesIcon sx={{ color: "text.secondary" }} />,
    title: "Convenient and Mobile-Friendly",
    description:
      "Access and complete your training anytime, anywhere, on any device.",
  },
];

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <LogoIcon
          sx={{
            width: "250px",
            height: "55px",
            color: brandColors.cdlDarkBlue,
          }}
        />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
