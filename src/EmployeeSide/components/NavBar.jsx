import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../../redux/slices/globalSlice";
import icon from "../../assets/images/user-icon.png";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location = "http://localhost:3000/";
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.mode === "dark" ? "#003B5C" : "#00A1E4", // Màu nền giống Pharmacity
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo ở giữa */}
        <Box
          component="img"
          alt="Logo"
          src="https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/6t5y9BJZRPqPxhP6SrGKqCfeUnkfZWzI_1710229330____23fe1378bc48e9308eb4f4d3ac891290.png"
          height="40px" // Bạn có thể thay đổi chiều cao logo
          width="auto"
          sx={{ objectFit: "contain", mx: "auto" }}
        />

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {/* avatar */}
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={user.pathImg ? user.pathImg : icon}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "white"
                        : theme.palette.secondary[100],
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "white"
                      : theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
