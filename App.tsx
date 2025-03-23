import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import HomeScreen from "./src/screens/HomeScreen";
import AttendanceHistoryScreen from "./src/screens/AttendanceHistoryScreen";
import DashboardScreen from "./src/screens/DashboardScreen";

const Tab = createBottomTabNavigator();

const theme = createTheme({
  lightColors: {
    primary: "#e63946",
    secondary: "#f1faee",
    background: "#ffffff",
    success: "#4caf50",
    warning: "#ffc107",
  },
  darkColors: {
    primary: "#e63946",
    secondary: "#333333",
    background: "#222222",
    success: "#4caf50",
    warning: "#ffc107",
  },
  mode: "light",
});

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    theme.mode = isDarkMode ? "dark" : "light";
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = "home";
                } else if (route.name === "History") {
                  iconName = "history";
                } else if (route.name === "Dashboard") {
                  iconName = "dashboard";
                }

                return (
                  <Icon
                    name={iconName}
                    type="material"
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "#e63946",
              tabBarInactiveTintColor: "gray",
              headerShown: false,
              tabBarStyle: {
                backgroundColor: isDarkMode ? "#222222" : "#ffffff",
                borderTopColor: isDarkMode ? "#333333" : "#f1f1f1",
              },
            })}
          >
            <Tab.Screen name="Home" options={{ title: "Home" }}>
              {(props) => (
                <HomeScreen
                  {...props}
                  isDarkMode={isDarkMode}
                  toggleTheme={toggleTheme}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="History" options={{ title: "History" }}>
              {(props) => (
                <AttendanceHistoryScreen {...props} isDarkMode={isDarkMode} />
              )}
            </Tab.Screen>
            <Tab.Screen name="Dashboard" options={{ title: "Dashboard" }}>
              {(props) => (
                <DashboardScreen {...props} isDarkMode={isDarkMode} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
