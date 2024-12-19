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
  ReceiptLongOutlined,
} from "@mui/icons-material";

import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { NavLink } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "react-redux";
import "./Sidebar.css";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";

const navItems = [
  { text: "Trang chủ", icon: <HomeOutlined />, url: "dashboard" },
];

const subNavItemOrder = [
  { text: "Chờ phê duyệt", icon: <PendingOutlinedIcon />, url: "pending" },
  {
    text: "Đã giao hàng",
    icon: <DeliveryDiningOutlinedIcon />,
    url: "deliveried",
  },
];

const subNavItemExport = [
  { text: "Nhập kho", icon: <InventoryIcon />, url: "warehouse-receipt" },
  { text: "Xuất kho", icon: <LocalShippingIcon />, url: "warehouse-export" },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const mode = useSelector((state) => state.globalSlice.mode);
  const dispatch = useDispatch();
  const [backupRestoreMenuOpen, setBackupRestoreMenuOpen] = useState(false);

  const handleOrderClick = () => setOrderMenuOpen(!orderMenuOpen);
  const handleExportClick = () => setExportMenuOpen(!exportMenuOpen);
  const handleBackupRestoreClick = () =>
    setBackupRestoreMenuOpen(!backupRestoreMenuOpen);

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
              color: mode === "dark" ? "#ffffff" : "#000000",
              backgroundColor: mode === "dark" ? "#36648B" : "#0072bc",
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
                    position: "absolute",
                    left: collapsed ? "50%" : "initial",
                    right: collapsed ? "initial" : 10,
                    transform: collapsed ? "translateX(-50%)" : "none",
                    top: collapsed ? "1.5%" : "1.7%",
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

              {/* Danh sách order */}
              <ListItem
                disablePadding
                className="listItem__sidebar"
                onClick={handleOrderClick}
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
                  {!collapsed &&
                    (orderMenuOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>

              {/* Submenu Danh sách order */}
              <Collapse
                in={orderMenuOpen && !collapsed}
                timeout="auto"
                unmountOnExit
              >
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

              {/* Nhập/Xuất */}
              <ListItem
                disablePadding
                className="listItem__sidebar"
                onClick={handleExportClick}
                sx={{ color: "white" }}
              >
                <ListItemButton sx={{ pl: collapsed ? "1rem" : "2rem" }}>
                  <ListItemIcon
                    sx={{
                      color: "white",
                      "& svg": { fontSize: "30px !important" },
                    }}
                  >
                    <ImportExportIcon />
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary="Nhập / Xuất"
                      primaryTypographyProps={{
                        fontSize: "20px",
                        lineHeight: "1.5",
                      }}
                    />
                  )}
                  {!collapsed &&
                    (exportMenuOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>

              {/* Submenu Nhập/Xuất */}
              <Collapse
                in={exportMenuOpen && !collapsed}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding sx={{ color: "white" }}>
                  {subNavItemExport.map(({ text, icon, url }) => (
                    <ListItem
                      key={text}
                      disablePadding
                      className="listItem__sidebar"
                    >
                      <NavLink
                        to={`/admin/exports/${url}`}
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
