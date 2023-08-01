import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { Dimensions, StyleSheet, Image } from "react-native";

const drawerCover = require("../../assets/playstore.png");
const deviceHeight = Dimensions.get("window").height;
//const deviceWidth = Dimensions.get("window").width;

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        source={drawerCover}
        style={[styles.drawerCover, {width: 100, height: 100 ,marginBottom: 10, marginHorizontal: 40 }]}
      />

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10,
  },
});
