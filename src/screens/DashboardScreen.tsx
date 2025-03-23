import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Icon, useTheme } from "@rneui/themed";

interface DashboardScreenProps {
  navigation: any;
  isDarkMode: boolean;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  navigation,
  isDarkMode,
}) => {
  const { theme } = useTheme();

  const backgroundColor = isDarkMode
    ? theme.colors.secondary
    : theme.colors.background;
  const textColor = isDarkMode ? "#ffffff" : "#333333";
  const cardBackground = isDarkMode ? "#444444" : "#ffffff";

  const menuItems = [
    {
      id: 1,
      title: "Leave Request",
      icon: "calendar-clock",
      type: "material-community",
    },
    { id: 2, title: "Attendance History", icon: "history", type: "material" },
    {
      id: 3,
      title: "Attendance Report",
      icon: "chart-bar",
      type: "material-community",
    },
    {
      id: 4,
      title: "Organization Chart",
      icon: "account-group",
      type: "material-community",
    },
    {
      id: 5,
      title: "Work Schedule",
      icon: "calendar-month",
      type: "material-community",
    },
    {
      id: 6,
      title: "Announcements",
      icon: "bullhorn",
      type: "material-community",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Dashboard</Text>

      <ScrollView style={styles.menuGrid}>
        <View style={styles.gridContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { backgroundColor: cardBackground }]}
              onPress={() => {
                if (item.title === "Attendance History") {
                  navigation.navigate("History");
                }
              }}
            >
              <Icon
                name={item.icon}
                type={item.type}
                size={30}
                color="#e63946"
                containerStyle={styles.iconContainer}
              />
              <Text style={[styles.menuItemText, { color: textColor }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.unlockContainer}>
        <Button
          title="WORK CLOCK"
          icon={{
            name: "fingerprint",
            type: "material",
            size: 20,
            color: "white",
            style: { marginRight: 10 },
          }}
          buttonStyle={styles.unlockButton}
          containerStyle={styles.unlockButtonContainer}
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View style={styles.bottomButtonsContainer}>
        <Button
          icon={{
            name: "home",
            type: "material",
            size: 24,
            color: "white",
          }}
          buttonStyle={styles.bottomButton}
          containerStyle={styles.bottomButtonWrapper}
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          icon={{
            name: "dashboard",
            type: "material",
            size: 24,
            color: "white",
          }}
          buttonStyle={styles.bottomButton}
          containerStyle={styles.bottomButtonWrapper}
        />
        <Button
          icon={{
            name: "history",
            type: "material",
            size: 24,
            color: "white",
          }}
          buttonStyle={styles.bottomButton}
          containerStyle={styles.bottomButtonWrapper}
          onPress={() => navigation.navigate("History")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  menuGrid: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    marginBottom: 10,
  },
  menuItemText: {
    textAlign: "center",
    fontWeight: "500",
  },
  unlockContainer: {
    marginVertical: 20,
  },
  unlockButton: {
    backgroundColor: "#e63946",
    borderRadius: 25,
    paddingVertical: 12,
  },
  unlockButtonContainer: {
    borderRadius: 25,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  bottomButton: {
    backgroundColor: "#e63946",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bottomButtonWrapper: {
    borderRadius: 25,
  },
});

export default DashboardScreen;
