import React from 'react'
// mui v4 
import { Box, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Phone,
         PersonOutline,
         Settings,
         Dialpad,
         RadioButtonUnchecked,
         FiberManualRecord} from '@material-ui/icons';
//clsx
import clsx from 'clsx';
const styles = {
    root: {
        height: "40px",
        margin: "0 auto",
        padding: "10px 0",
        textAlign: "center",
        boxShadow: " 0 -1px 1px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "row", 
        justifyContent: "space-around"
    },
    muiIcon:  {
        display: "flex",
        alignItems: "center",
        '&:hover': {
            cursor: "pointer"
        }
    },
    dialPadIconBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5em",
        '&:hover': {
            cursor: "pointer"
        }
    },
    dialPadIconInnerCircle: {
        width:"5em",
        height: "5em",
        backgroundColor: "green",
        borderRadius: "50%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dialPadIconBoxOuterCircle: {
        width:"5.5em",
        height: "5.5em",
        backgroundColor: "#fff",
        borderRadius: "50%",
        border: "1px solid rgba(0, 0, 0, 0.3)"
    },
    dialpad: {
        fontSize: "3.5em",
        color: "#fff",
    },
    muiIconGreyColor: {
        color: "#686868"
    },
    radioFiberIconBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
  }
function Footer(props) {
    const { classes } = props
    return (
        <Box className={classes.root}>
            <Box className={clsx(classes.muiIcon)}>
                <Badge badgeContent={6} color="error">
                    <Phone/>
                </Badge>
            </Box>
            <Box className={clsx(classes.muiIcon, classes.muiIconGreyColor)}>
                <PersonOutline/>
            </Box>
            <Box className={classes.dialPadIconBox}>
                <Box className={classes.dialPadIconInnerCircle}>
                    <Dialpad className={classes.dialpad}/>
                </Box>
                <Box className={classes.dialPadIconBoxOuterCircle}/>
            </Box>
            <Box className={clsx(classes.muiIcon, classes.settingsBox, classes.muiIconGreyColor)}>
                <Settings/>
            </Box>
            <Box className={clsx(classes.muiIcon, classes.muiIconGreyColor, classes.radioFiberIconBox)}>
                <FiberManualRecord style={{position: "absolute", fontSize:"10px", color:"green"}}/>
                <RadioButtonUnchecked/>
            </Box>
        </Box>
    )
}
export default withStyles(styles)(Footer);
