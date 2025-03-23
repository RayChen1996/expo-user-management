import type React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button, Icon, useTheme } from "@rneui/themed";
import Svg, { Circle } from "react-native-svg";

interface HomeScreenProps {
  navigation: any;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  isDarkMode,
  toggleTheme,
}) => {
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      setCurrentDate(
        `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleAttendance = () => {
    setIsPresent(!isPresent);
  };

  const backgroundColor = isDarkMode
    ? theme.colors.secondary
    : theme.colors.background;
  const textColor = isDarkMode ? "#ffffff" : "#333333";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Icon
            name="account-circle"
            type="material-community"
            size={40}
            color={isDarkMode ? "#ffffff" : "#333333"}
          />
          <View style={styles.userTextContainer}>
            <Text style={[styles.heyText, { color: textColor }]}>
              HEY, HOME DOG
            </Text>
            <Text style={[styles.userRole, { color: textColor }]}>
              Verified
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleTheme}>
          <Icon
            name={isDarkMode ? "sunny" : "moon"}
            type="ionicon"
            size={24}
            color={isDarkMode ? "#ffffff" : "#333333"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, { color: textColor }]}>
          {currentTime}
        </Text>
        <Text style={[styles.dateText, { color: textColor }]}>
          {currentDate}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.attendanceCircle}
        onPress={toggleAttendance}
      >
        {isPresent ? (
          <View style={styles.circleContent}>
            <Svg height="160" width="160" viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#f0f0f0"
                strokeWidth="5"
                fill="transparent"
              />
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#ffc107"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={283}
                strokeDashoffset={70}
                strokeLinecap="round"
              />
            </Svg>
            <View style={styles.circleTextContainer}>
              <Icon
                name="check-circle"
                type="material-community"
                size={30}
                color="#4caf50"
              />
              <Text style={styles.presentText}>PRESENT</Text>
            </View>
          </View>
        ) : (
          <View style={styles.circleContent}>
            <View
              style={[
                styles.innerCircle,
                { backgroundColor: isDarkMode ? "#333333" : "#f0f0f0" },
              ]}
            >
              <Icon
                name="close-circle"
                type="material-community"
                size={30}
                color="#e63946"
              />
              <Text style={styles.absentText}>ABSENT</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon
            name="clock-time-four"
            type="material-community"
            size={24}
            color="#e63946"
          />
          <Text style={styles.actionText}>09:00 AM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon
            name="clock-time-seven"
            type="material-community"
            size={24}
            color="#e63946"
          />
          <Text style={styles.actionText}>06:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon
            name="clock"
            type="material-community"
            size={24}
            color="#e63946"
          />
          <Text style={styles.actionText}>09:00 h</Text>
        </TouchableOpacity>
      </View>

      {!isPresent ? (
        <Button
          title="Single sign in (Touch it)"
          icon={{
            name: "fingerprint",
            type: "material-community",
            size: 20,
            color: "white",
          }}
          iconRight
          buttonStyle={styles.signInButton}
          containerStyle={styles.signInButtonContainer}
          onPress={toggleAttendance}
        />
      ) : (
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
          />
          <Button
            title="SIGN"
            buttonStyle={styles.signButton}
            containerStyle={styles.signButtonContainer}
            onPress={toggleAttendance}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userTextContainer: {
    marginLeft: 10,
  },
  heyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 12,
    opacity: 0.7,
  },
  timeContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  timeText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 5,
  },
  attendanceCircle: {
    alignSelf: "center",
    marginTop: 40,
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  innerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  circleTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  presentText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
  },
  absentText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#e63946",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: "#e63946",
  },
  signInButton: {
    backgroundColor: "#e63946",
    borderRadius: 25,
    paddingVertical: 12,
  },
  signInButtonContainer: {
    marginTop: 40,
    borderRadius: 25,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
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
  signButton: {
    backgroundColor: "#e63946",
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  signButtonContainer: {
    borderRadius: 25,
  },
});

export default HomeScreen;
