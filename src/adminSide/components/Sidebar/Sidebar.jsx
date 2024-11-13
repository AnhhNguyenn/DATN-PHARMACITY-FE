import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  useTheme,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  Menu as MenuIcon,
  HomeOutlined,
  ShoppingCartOutlined,
  CategoryOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { NavLink } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import "./Sidebar.css";

const navItems = [
  { text: "Trang chủ", icon: <HomeOutlined />, url: "dashboard" },
  { text: "Sản phẩm", icon: <ShoppingCartOutlined />, url: "products" },
  { text: "Loại sản phẩm", icon: <CategoryOutlined />, url: "categories" },
  { text: "Tài khoản", icon: <Groups2Outlined />, url: "users" },
];

const subNavItemOrder = [
  { text: "Chờ phê duyệt", icon: <PendingOutlinedIcon />, url: "pending" },
  {
    text: "Đã giao hàng",
    icon: <DeliveryDiningOutlinedIcon />,
    url: "deliveried",
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();

  const handleClick = () => setOpen(!open);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: collapsed ? 80 : drawerWidth,
            "& .MuiDrawer-paper": {
              color: "white",
              backgroundColor: "#0072bc",
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: collapsed ? 80 : drawerWidth,
              transition: "width 0.3s",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  style={{ display: collapsed ? "none" : "block" }}
                >
                  PHARMACITY
                </Typography>
                <IconButton
                  onClick={() => setCollapsed(!collapsed)}
                  sx={{
                    color: "white",
                    position: "absolute", // Đặt icon ở vị trí tuyệt đối
                    left: collapsed ? "50%" : "initial", // Căn vào giữa khi thu gọn
                    right: collapsed ? "initial" : 10, // Căn vào góc phải khi chưa thu gọn
                    transform: collapsed ? "translateX(-50%)" : "none", // Căn chính giữa khi thu gọn
                    top: collapsed ? "3%" : "1.7%", // Điều chỉnh top khi chưa thu gọn
                    transform: collapsed ? "translate(-50%, -50%)" : "none", // Căn chính giữa hoàn toàn
                  }}
                >
                  {collapsed ? <MenuIcon /> : <ChevronLeft />}
                </IconButton>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, url }) => (
                <ListItem
                  key={text}
                  disablePadding
                  className="listItem__sidebar"
                >
                  <NavLink
                    to={`/admin/${url}`}
                    className="nav__link--sidebar"
                    style={({ isActive }) => ({
                      color: "white",
                      backgroundColor: isActive
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                      textDecoration: "none",
                    })}
                  >
                    <ListItemButton sx={{ pl: collapsed ? "1rem" : "2rem" }}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                          "& svg": { fontSize: "30px !important" },
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      {!collapsed && (
                        <ListItemText
                          primary={text}
                          primaryTypographyProps={{
                            fontSize: "20px",
                            lineHeight: "1.5",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}

              <ListItem
                disablePadding
                className="listItem__sidebar"
                onClick={handleClick}
                sx={{ color: "white" }}
              >
                <ListItemButton sx={{ pl: collapsed ? "1rem" : "2rem" }}>
                  <ListItemIcon
                    sx={{
                      color: "white",
                      "& svg": { fontSize: "30px !important" },
                    }}
                  >
                    <ReceiptLongOutlined />
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary="Danh sách order"
                      primaryTypographyProps={{
                        fontSize: "20px",
                        lineHeight: "1.5",
                      }}
                    />
                  )}
                  {!collapsed && (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>

              <Collapse in={open && !collapsed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ color: "white" }}>
                  {subNavItemOrder.map(({ text, icon, url }) => (
                    <ListItem
                      key={text}
                      disablePadding
                      className="listItem__sidebar"
                    >
                      <NavLink
                        to={`/admin/orders/${url}`}
                        className="nav__link--sidebar"
                        style={({ isActive }) => ({
                          color: "white",
                          backgroundColor: isActive
                            ? "rgba(255, 255, 255, 0.2)"
                            : "transparent",
                          textDecoration: "none",
                          paddingLeft: "20px",
                        })}
                      >
                        <ListItemButton
                          sx={{ pl: collapsed ? "1rem" : "2rem" }}
                        >
                          <ListItemIcon
                            sx={{
                              color: "white",
                              "& svg": { fontSize: "30px !important" },
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          {!collapsed && (
                            <ListItemText
                              primary={text}
                              primaryTypographyProps={{
                                fontSize: "20px",
                                lineHeight: "1.5",
                              }}
                            />
                          )}
                        </ListItemButton>
                      </NavLink>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
