// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Icons from 'react-native-vector-icons/FontAwesome5';
// import Proicons from 'react-native-vector-icons/FontAwesome5Pro';
// // import { NavigationContainer } from '@react-navigation/native';

// import Dashboard from './Dashboard'
// import AttendanceScreen from './AttendanceScreen'
// import Announcement from './Announcement'
// import Message from './Message'
// import AllMessage from './AllMessageScreen'
// import TabNavigationTop from './TabNavigationTop'
// import TimeTableScreen from './TimeTableScreen'
// import Results from './ResultsScreen'
// import Marks from './MarksScreen'

  
// const Drawer = createDrawerNavigator();

// export default function DashboardDrawer() {
//   return (
//   //   <NavigationContainer>
//       <Drawer.Navigator drawerStyle={{
//           backgroundColor: '#222324'
//       }}
//       drawerContentOptions={{
//           inactiveTintColor: "#fff"
//       }}
//       >
//         <Drawer.Screen name="Dashboard" component={Dashboard}
//           options={{
//               drawerIcon: ({focused, size}) => (
//                   <Icons name='tachometer-alt' size={size} color={focused ? '#7cc' : '#ccc'} />
//               )
//           }}
//         />
//         <Drawer.Screen name="Attendance" component={AttendanceScreen}
//           options={{
//               drawerIcon: ({ focused, size }) => (
//                   <Icons name='marker' size={size} color={focused ? '#7cc' : '#ccc'} />
//               )
//             }} 
//         />
//         <Drawer.Screen name="Announcements" component={Announcement}
//           options={{
//               title: 'Announcements',
//               drawerIcon: ({ focused, size }) => (
//                   <Icons name='edit' size={size} color={focused ? '#7cc' : '#ccc'} />
//               )
//             }} 
//         />
//         {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
//       </Drawer.Navigator>
//   //   </NavigationContainer>
//   );
// }