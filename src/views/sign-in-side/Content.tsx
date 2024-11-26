import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DevicesIcon from "@mui/icons-material/Devices";
import SchoolIcon from "@mui/icons-material/School";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoIcon from "../../assets/LogoIconELDT";
import { brandColors } from "../../styles/brandColors";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GradingIcon from "@mui/icons-material/Grading";
import PhoneIcon from "@mui/icons-material/Phone";

const items = [
  {
    icon: <SentimentVerySatisfiedIcon sx={{ color: "text.secondary" }} />,
    title: "Step by Step, Mile by Mile—Our Team Has Your Back",
    description: (
      <span>
        You’ve made the right choice with ELDT.com. Our team is here to help
        anytime.{" "}
        <a
          href="tel:+15092413987"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <PhoneIcon
            sx={{
              marginLeft: "4px",
              verticalAlign: "middle",
              fontSize: "1rem",
              color: "inherit",
            }}
          />
          (509) 241-3987
        </a>
      </span>
    ),
  },
  {
    icon: <AddTaskIcon sx={{ color: "text.secondary" }} />,
    title: "Trusted by 300+ Training Providers Nationwide",
    description:
      "ELDT.com is recognized in all 50 states for FMCSA-compliant theory training.",
  },
  {
    icon: <LocalShippingIcon sx={{ color: "text.secondary" }} />,
    title: "Need Help Finding Behind-The-Wheel Training?",
    description:
      "We can connect you with a trusted local CDL training school near you.",
  },
  {
    icon: <GradingIcon sx={{ color: "text.secondary" }} />,
    title: "Receive Your Certificate with Confidence",
    description:
      "Complete the course, score 80% or higher, and get your certificate.",
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
