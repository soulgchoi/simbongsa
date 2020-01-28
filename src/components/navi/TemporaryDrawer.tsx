import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: "auto"
  }
};

interface Iprops {
  classes: {
    root: string;
    menuButton: string;
  };
}
interface Istate {
  toggle: boolean;
}

class TemporaryDrawer extends React.Component<Iprops, Istate> {
  state = {
    toggle: false
  };
  handleDrawerToggle = () => this.setState({ toggle: !this.state.toggle });
  sideList = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root} onClick={this.handleDrawerToggle}>
        <List>
          {["로그인", "로그아웃", "게시판1", "게시판2"].map(
            (text: string, index: number) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["만든이", "설정", "통계"].map((text: string, index: number) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={this.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </AppBar>
        <Drawer open={this.state.toggle}>{this.sideList()}</Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(TemporaryDrawer);

// const TemporaryDrawer = () => {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false
//   });

//   type DrawerSide = "top" | "left" | "bottom" | "right";
//   const toggleDrawer = (side: DrawerSide, open: boolean) => (
//     event: React.KeyboardEvent | React.MouseEvent
//   ) => {
//     if (
//       event.type === "keydown" &&
//       ((event as React.KeyboardEvent).key === "Tab" ||
//         (event as React.KeyboardEvent).key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [side]: open });
//   };

//   const sideList = (side: DrawerSide) => (
//     <div
//       className={classes.list}
//       role="presentation"
//       onClick={toggleDrawer(side, false)}
//       onKeyDown={toggleDrawer(side, false)}
//     >
//       <List>
//         {["로그인", "로그아웃", "게시판1", "게시판2"].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["만든이", "설정", "통계"].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <div>
//       <AppBar position="static">
//         <IconButton
//           className={classes.menuButton}
//           color="inherit"
//           onClick={toggleDrawer("left", true)}
//         >
//           <MenuIcon />
//         </IconButton>
//       </AppBar>
//       <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
//         {sideList("left")}
//       </Drawer>
//     </div>
//   );
// };
// export default TemporaryDrawer;
