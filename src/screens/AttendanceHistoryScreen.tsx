"use client";

import type React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Icon, useTheme } from "@rneui/themed";
import { Calendar } from "react-native-calendars";

interface AttendanceHistoryScreenProps {
  navigation: any;
  isDarkMode: boolean;
}

const AttendanceHistoryScreen: React.FC<AttendanceHistoryScreenProps> = ({
  navigation,
  isDarkMode,
}) => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState("");

  const backgroundColor = isDarkMode
    ? theme.colors.secondary
    : theme.colors.background;
  const textColor = isDarkMode ? "#ffffff" : "#333333";

  // Sample attendance data
  const attendanceData = [
    {
      date: "2023-12-04",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "present",
    },
    {
      date: "2023-12-05",
      checkIn: "09:15 AM",
      checkOut: "06:10 PM",
      status: "present",
    },
    {
      date: "2023-12-06",
      checkIn: "08:55 AM",
      checkOut: "05:45 PM",
      status: "present",
    },
    {
      date: "2023-12-07",
      checkIn: "09:05 AM",
      checkOut: "06:05 PM",
      status: "present",
    },
  ];

  // Mark dates on calendar
  const markedDates = {
    "2023-12-04": { selected: true, marked: true, selectedColor: "#4caf50" },
    "2023-12-05": { selected: true, marked: true, selectedColor: "#4caf50" },
    "2023-12-06": { selected: true, marked: true, selectedColor: "#4caf50" },
    "2023-12-07": { selected: true, marked: true, selectedColor: "#4caf50" },
    "2023-12-09": { selected: true, marked: true, selectedColor: "#e63946" },
    "2023-12-10": { selected: true, marked: true, selectedColor: "#e63946" },
    "2023-12-16": { selected: true, marked: true, selectedColor: "#e63946" },
    "2023-12-17": { selected: true, marked: true, selectedColor: "#e63946" },
  };

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: markedDates[selectedDate]?.selectedColor || "#ffc107",
    };
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "#4caf50";
      case "absent":
        return "#e63946";
      default:
        return "#ffc107";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Attendance History
      </Text>

      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: isDarkMode ? "#333333" : "#ffffff",
          textSectionTitleColor: isDarkMode ? "#ffffff" : "#333333",
          dayTextColor: isDarkMode ? "#ffffff" : "#333333",
          todayTextColor: "#e63946",
          selectedDayTextColor: "#ffffff",
          monthTextColor: isDarkMode ? "#ffffff" : "#333333",
          indicatorColor: "#e63946",
          textDisabledColor: isDarkMode ? "#666666" : "#d9e1e8",
          arrowColor: "#e63946",
        }}
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        monthFormat={"MMMM yyyy"}
        hideExtraDays={true}
        firstDay={1}
        enableSwipeMonths={true}
      />

      <ScrollView style={styles.attendanceList}>
        {attendanceData.map((item, index) => (
          <Card
            key={index}
            containerStyle={[
              styles.attendanceCard,
              { backgroundColor: isDarkMode ? "#444444" : "#ffffff" },
            ]}
          >
            <View style={styles.attendanceItem}>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text style={styles.statusDate}>{item.date.split("-")[2]}</Text>
                <Text style={styles.statusMonth}>DEC</Text>
              </View>
              <View style={styles.attendanceDetails}>
                <View style={styles.timeRow}>
                  <Icon
                    name="login"
                    type="material-community"
                    size={16}
                    color="#666"
                  />
                  <Text style={styles.timeText}>{item.checkIn}</Text>
                </View>
                <View style={styles.timeRow}>
                  <Icon
                    name="logout"
                    type="material-community"
                    size={16}
                    color="#666"
                  />
                  <Text style={styles.timeText}>{item.checkOut}</Text>
                </View>
              </View>
              <View style={styles.hoursContainer}>
                <Text style={styles.hoursText}>09:00 h</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

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
            name: "apps",
            type: "material",
            size: 24,
            color: "white",
          }}
          buttonStyle={styles.bottomButton}
          containerStyle={styles.bottomButtonWrapper}
          onPress={() => navigation.navigate("Dashboard")}
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
  calendar: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  attendanceList: {
    flex: 1,
  },
  attendanceCard: {
    borderRadius: 10,
    padding: 0,
    marginHorizontal: 0,
    marginBottom: 10,
  },
  attendanceItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  statusIndicator: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statusDate: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  statusMonth: {
    color: "white",
    fontSize: 12,
  },
  attendanceDetails: {
    flex: 1,
    marginLeft: 15,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  timeText: {
    marginLeft: 5,
    fontSize: 14,
  },
  hoursContainer: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  hoursText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
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

export default AttendanceHistoryScreen;
