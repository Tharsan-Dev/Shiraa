// // import React from "react";
// // import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
// // import { Column } from "@ant-design/plots";
// // import { Table } from "antd";
// // const columns = [
// //   {
// //     title: "SNo",
// //     dataIndex: "key",
// //   },
// //   {
// //     title: "Name",
// //     dataIndex: "name",
// //   },
// //   {
// //     title: "Product",
// //     dataIndex: "product",
// //   },
// //   {
// //     title: "Status",
// //     dataIndex: "staus",
// //   },
// // ];
// // const data1 = [];
// // for (let i = 0; i < 46; i++) {
// //   data1.push({
// //     key: i,
// //     name: `Edward King ${i}`,
// //     product: 32,
// //     staus: `London, Park Lane no. ${i}`,
// //   });
// // }
// // const Dashboard = () => {
// //   const data = [
// //     {
// //       type: "Jan",
// //       sales: 38,
// //     },
// //     {
// //       type: "Feb",
// //       sales: 52,
// //     },
// //     {
// //       type: "Mar",
// //       sales: 61,
// //     },
// //     {
// //       type: "Apr",
// //       sales: 145,
// //     },
// //     {
// //       type: "May",
// //       sales: 48,
// //     },
// //     {
// //       type: "Jun",
// //       sales: 38,
// //     },
// //     {
// //       type: "July",
// //       sales: 38,
// //     },
// //     {
// //       type: "Aug",
// //       sales: 38,
// //     },
// //     {
// //       type: "Sept",
// //       sales: 38,
// //     },
// //     {
// //       type: "Oct",
// //       sales: 38,
// //     },
// //     {
// //       type: "Nov",
// //       sales: 38,
// //     },
// //     {
// //       type: "Dec",
// //       sales: 38,
// //     },
// //   ];
// //   const config = {
// //     data,
// //     xField: "type",
// //     yField: "sales",
// //     color: ({ type }) => {
// //       return "#ffd333";
// //     },
// //     label: {
// //       position: "middle",
// //       style: {
// //         fill: "#FFFFFF",
// //         opacity: 1,
// //       },
// //     },
// //     xAxis: {
// //       label: {
// //         autoHide: true,
// //         autoRotate: false,
// //       },
// //     },
// //     meta: {
// //       type: {
// //         alias: "Month",
// //       },
// //       sales: {
// //         alias: "Income",
// //       },
// //     },
// //   };
// //   return (
// //     <div>
// //       <h3 className="mb-4 title">Dashboard</h3>
// //       <div className="d-flex justify-content-between align-items-center gap-3">
// //         <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
// //           <div>
// //             <p className="desc">Total</p>
// //             <h4 className="mb-0 sub-title">$1100</h4>
// //           </div>
// //           <div className="d-flex flex-column align-items-end">
// //             <h6>
// //               <BsArrowDownRight /> 32%
// //             </h6>
// //             <p className="mb-0  desc">Compared To April 2022</p>
// //           </div>
// //         </div>
// //         <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
// //           <div>
// //             <p className="desc">Total</p>
// //             <h4 className="mb-0 sub-title">$1100</h4>
// //           </div>
// //           <div className="d-flex flex-column align-items-end">
// //             <h6 className="red">
// //               <BsArrowDownRight /> 32%
// //             </h6>
// //             <p className="mb-0  desc">Compared To April 2022</p>
// //           </div>
// //         </div>
// //         <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
// //           <div>
// //             <p className="desc">Total</p>
// //             <h4 className="mb-0 sub-title">$1100</h4>
// //           </div>
// //           <div className="d-flex flex-column align-items-end">
// //             <h6 className="green">
// //               <BsArrowDownRight /> 32%
// //             </h6>
// //             <p className="mb-0 desc">Compared To April 2022</p>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="mt-4">
// //         <h3 className="mb-5 title">Income Statics</h3>
// //         <div>
// //           <Column {...config} />
// //         </div>
// //       </div>
// //       <div className="mt-4">
// //         <h3 className="mb-5 title">Recent Orders</h3>
// //         <div>
// //           <Table columns={columns} dataSource={data1} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useState } from 'react'
// import {
//   AppBar,
//   Box,
//   CssBaseline,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
//   useTheme,
// } from '@mui/material'
// import {
//   Menu as MenuIcon,
//   Dashboard as DashboardIcon,
//   ShoppingCart as ShoppingCartIcon,
//   People as PeopleIcon,
//   BarChart as BarChartIcon,
// } from '@mui/icons-material'
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts'

// const drawerWidth = 240

// const salesData = [
//   { name: 'Jan', sales: 4000 },
//   { name: 'Feb', sales: 3000 },
//   { name: 'Mar', sales: 5000 },
//   { name: 'Apr', sales: 4500 },
//   { name: 'May', sales: 6000 },
//   { name: 'Jun', sales: 5500 },
// ]

// export default function Dashboard() {
//   const theme = useTheme()
//   const [open, setOpen] = useState(false)

//   const handleDrawerOpen = () => {
//     setOpen(true)
//   }

//   const handleDrawerClose = () => {
//     setOpen(false)
//   }

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             E-commerce Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             {[
//               { text: 'Dashboard', icon: <DashboardIcon /> },
//               { text: 'Orders', icon: <ShoppingCartIcon /> },
//               { text: 'Customers', icon: <PeopleIcon /> },
//               { text: 'Reports', icon: <BarChartIcon /> },
//             ].map((item, index) => (
//               <ListItem key={item.text} disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   <ListItemText primary={item.text} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         <Typography variant="h4" gutterBottom>
//           Dashboard
//         </Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
//           <Box sx={{ width: '30%', bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
//             <Typography variant="h6">Total Sales</Typography>
//             <Typography variant="h4">$24,000</Typography>
//           </Box>
//           <Box sx={{ width: '30%', bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
//             <Typography variant="h6">Total Orders</Typography>
//             <Typography variant="h4">1,200</Typography>
//           </Box>
//           <Box sx={{ width: '30%', bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
//             <Typography variant="h6">Total Customers</Typography>
//             <Typography variant="h4">5,000</Typography>
//           </Box>
//         </Box>
//         <Box sx={{ height: 300, bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
//           <Typography variant="h6" gutterBottom>
//             Sales Overview
//           </Typography>
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
//               data={salesData}
//               margin={{
//                 top: 10,
//                 right: 30,
//                 left: 0,
//                 bottom: 0,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </Box>
//         <Box sx={{ mt: 4, bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
//           <Typography variant="h6" gutterBottom>
//             Recent Orders
//           </Typography>
//           <List>
//             {[
//               { id: '1', customer: 'John Doe', total: '$120.50', status: 'Delivered' },
//               { id: '2', customer: 'Jane Smith', total: '$75.00', status: 'Processing' },
//               { id: '3', customer: 'Bob Johnson', total: '$200.25', status: 'Shipped' },
//             ].map((order) => (
//               <ListItem key={order.id} divider>
//                 <ListItemText
//                   primary={`Order #${order.id}`}
//                   secondary={`${order.customer} - ${order.total}`}
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {order.status}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Box>
//     </Box>
//   )
// }