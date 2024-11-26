import React, { useState } from "react"; // Import React và hook useState để quản lý trạng thái.
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
} from "@mui/material"; // Import các thành phần từ Material-UI để xây dựng giao diện Sidebar.
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
} from "@mui/icons-material"; // Import các icon từ Material-UI để hiển thị biểu tượng trong Sidebar.
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DiscountIcon from "@mui/icons-material/Discount";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined"; // Import icon dành cho trạng thái "Chờ phê duyệt".
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined"; // Import icon dành cho trạng thái "Đã giao hàng".
import { NavLink } from "react-router-dom"; // Import NavLink từ React Router để tạo các đường dẫn điều hướng.
import FlexBetween from "../FlexBetween"; // Import component FlexBetween tùy chỉnh (giả sử để căn chỉnh các thành phần theo hàng ngang).
import { useDispatch, useSelector } from "react-redux"; // Import các hook để truy cập và dispatch trạng thái từ Redux.
import { setMode } from "react-redux"; // Import action creator setMode từ Redux để thay đổi trạng thái chế độ sáng/tối.
import "./Sidebar.css"; // Import file CSS tùy chỉnh cho Sidebar.

const navItems = [
  { text: "Trang chủ", icon: <HomeOutlined />, url: "dashboard" },
  { text: "Sản phẩm", icon: <ShoppingCartOutlined />, url: "products" },
  { text: "Loại sản phẩm", icon: <CategoryOutlined />, url: "categories" },
  { text: "Khuyến mãi", icon: <DiscountIcon />, url: "promotions" },
  { text: "Kho", icon: <WarehouseIcon />, url: "warehouses" },
  { text: "Nhà cung cấp", icon: <AirportShuttleIcon />, url: "suppliers" },
  {
    text: "Nhập Xuất Hàng",
    icon: <ReceiptLongIcon />,
    url: "receiptexports",
  },
  { text: "Tài khoản", icon: <Groups2Outlined />, url: "users" },
]; // Danh sách các mục chính trong Sidebar, mỗi mục có tiêu đề, biểu tượng và đường dẫn.

const subNavItemOrder = [
  { text: "Chờ phê duyệt", icon: <PendingOutlinedIcon />, url: "pending" },
  {
    text: "Đã giao hàng",
    icon: <DeliveryDiningOutlinedIcon />,
    url: "deliveried",
  },
]; // Danh sách các mục con trong phần "Danh sách order".

// Component Sidebar
const Sidebar = ({
  drawerWidth, // Chiều rộng của Sidebar khi mở rộng.
  isSidebarOpen, // Trạng thái mở/đóng của Sidebar.
  setIsSidebarOpen, // Hàm thay đổi trạng thái mở/đóng của Sidebar.
  isNonMobile, // Trạng thái xem ứng dụng trên màn hình không phải di động.
}) => {
  const [open, setOpen] = useState(false); // Trạng thái đóng/mở của mục con (collapse) trong "Danh sách order".
  const [collapsed, setCollapsed] = useState(false); // Trạng thái thu gọn/mở rộng Sidebar.
  const theme = useTheme(); // Hook useTheme để sử dụng các giá trị chủ đề của Material-UI.
  const mode = useSelector((state) => state.globalSlice.mode); // Lấy trạng thái chế độ sáng/tối từ Redux.
  const dispatch = useDispatch(); // Hook để gửi các action đến Redux.
  const handleClick = () => setOpen(!open); // Hàm thay đổi trạng thái mở/đóng của mục con.

  return (
    <Box component="nav">
      {" "}
      {/* Vùng chứa chính của Sidebar */}
      {isSidebarOpen && ( // Chỉ hiển thị Drawer khi Sidebar đang mở.
        <Drawer
          open={isSidebarOpen} // Trạng thái mở/đóng của Drawer.
          onClose={() => setIsSidebarOpen(false)} // Hàm đóng Drawer khi người dùng nhấp ra ngoài.
          variant="persistent" // Loại Drawer (không bị tự động đóng khi nhấp ra ngoài).
          anchor="left" // Căn chỉnh Drawer ở bên trái màn hình.
          sx={{
            width: collapsed ? 80 : drawerWidth, // Chiều rộng Drawer thay đổi theo trạng thái thu gọn/mở rộng.
            "& .MuiDrawer-paper": {
              color: mode === "dark" ? "#ffffff" : "#000000", // Màu chữ tùy theo chế độ sáng/tối.
              backgroundColor: mode === "dark" ? "#36648B" : "#0072bc", // Màu nền tùy theo chế độ sáng/tối.
              boxSizing: "border-box", // Đặt kích thước dựa trên border-box.
              borderWidth: isNonMobile ? 0 : "2px", // Đặt độ rộng viền dựa trên trạng thái màn hình.
              width: collapsed ? 80 : drawerWidth, // Đặt chiều rộng Drawer.
              transition: "width 0.3s", // Thêm hiệu ứng chuyển đổi khi thay đổi chiều rộng.
            },
          }}
        >
          <Box width="100%">
            {" "}
            {/* Vùng chứa bên trong Drawer */}
            <Box m="1.5rem 2rem 2rem 3rem">
              {" "}
              {/* Khoảng cách lề bên trong */}
              <FlexBetween>
                {" "}
                {/* Căn chỉnh logo và nút thu gọn */}
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  style={{ display: collapsed ? "none" : "block" }} // Ẩn logo khi Sidebar thu gọn.
                >
                  PHARMACITY
                </Typography>
                <IconButton
                  onClick={() => setCollapsed(!collapsed)} // Thay đổi trạng thái thu gọn/mở rộng.
                  sx={{
                    color: "white",
                    position: "absolute",
                    left: collapsed ? "50%" : "initial", // Căn giữa khi thu gọn.
                    right: collapsed ? "initial" : 10, // Căn góc phải khi mở rộng.
                    transform: collapsed ? "translateX(-50%)" : "none", // Điều chỉnh vị trí khi thu gọn.
                    top: collapsed ? "1.5%" : "1.7%", // Điều chỉnh khoảng cách top.
                  }}
                >
                  {collapsed ? <MenuIcon /> : <ChevronLeft />}{" "}
                  {/* Icon thay đổi theo trạng thái */}
                </IconButton>
              </FlexBetween>
            </Box>
            <List>
              {" "}
              {/* Danh sách các mục trong Sidebar */}
              {navItems.map(
                (
                  { text, icon, url } // Duyệt qua danh sách navItems để tạo các mục.
                ) => (
                  <ListItem
                    key={text} // Đặt key duy nhất cho mỗi mục.
                    disablePadding
                    className="listItem__sidebar" // Thêm class CSS để tùy chỉnh.
                  >
                    <NavLink
                      to={`/admin/${url}`} // Đường dẫn của mục.
                      className="nav__link--sidebar" // Class CSS.
                      style={({ isActive }) => ({
                        // Tùy chỉnh style dựa trên trạng thái active.
                        color: "white",
                        backgroundColor: isActive
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                        textDecoration: "none",
                      })}
                    >
                      <ListItemButton sx={{ pl: collapsed ? "1rem" : "2rem" }}>
                        {" "}
                        {/* Khoảng cách padding */}
                        <ListItemIcon
                          sx={{
                            color: "white",
                            "& svg": { fontSize: "30px !important" }, // Định kích thước icon.
                          }}
                        >
                          {icon} {/* Biểu tượng của mục */}
                        </ListItemIcon>
                        {!collapsed && (
                          <ListItemText
                            primary={text} // Tiêu đề của mục.
                            primaryTypographyProps={{
                              fontSize: "20px",
                              lineHeight: "1.5",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                )
              )}
              {/* Mục danh sách order có thể mở rộng */}
              <ListItem
                disablePadding
                className="listItem__sidebar"
                onClick={handleClick} // Thay đổi trạng thái mở/đóng danh sách con.
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
                  {!collapsed && (open ? <ExpandLess /> : <ExpandMore />)}{" "}
                  {/* Icon trạng thái mở/đóng */}
                </ListItemButton>
              </ListItem>
              {/* Danh sách con của mục order */}
              <Collapse in={open && !collapsed} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ color: "white" }}>
                  {subNavItemOrder.map(
                    (
                      { text, icon, url } // Duyệt qua danh sách con.
                    ) => (
                      <ListItem
                        key={text} // Key duy nhất.
                        disablePadding
                        className="listItem__sidebar"
                      >
                        <NavLink
                          to={`/admin/orders/${url}`} // Đường dẫn của mục con.
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
                    )
                  )}
                </List>
              </Collapse>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar; // Xuất component để sử dụng ở các nơi khác.
