import React, {useState, useLayoutEffect} from 'react'
//clsx
import clsx from 'clsx';
// mui v4
import { Box, Card, CardContent, 
         Typography, Badge, Dialog, 
         DialogTitle, DialogContent, 
         List, ListItem } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Person, PersonOutline } from '@material-ui/icons';
import {convertTimeFromIsoToLocale, splitWithComma} from '../../util/stringUtil';
const styles = {
    root: {
       '& .MuiCardContent-root': {
            padding: "0.5em",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            color: "#686868",
            '&:hover': {
                cursor: "pointer",
                color: "#1f1f1f"
            }
       },
    },
    card: {
        margin: "1.2em 1em"
    },
    cardContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    muiIconRedColor: {
        color: "red",
        position: "absolute",
        fontSize: "1.6em"
    },
    phoneIconBox: {
        display: "flex",
        flexDirection: "row",
        width: "10%",
        alignItems: "center",
    },
    from: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        paddingRight: "0.5em",
    },
    to: {
        display: "flex",
        flexDirection: "column",
        width: "35%",
        paddingLeft: "0.5em",
    },
    created_at: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
        fontSize: "0.6em"
    },
    textBold: {
        fontWeight: "bold"
    },
    dialog: {
        '& .MuiDialogTitle-root ': {
            padding: "1em 0 0 0",
            display: "flex",
            justifyContent: "center",
        },
        '& .MuiDialogContent-root':{
            padding: "0"
        },
        '& .MuiDialog-paperWidthXl': {
            minWidth: "280px",
        }
    }
}
const airCallLogo =  
  <svg width='100px' height='50px' viewBox='0 0 486 168' version='1.1' xmlns='http://www.w3.org/2000/svg'>
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(207.000000, 24.000000)'>
          <rect fill='#424242' x='270' y='6' width='9' height='90' rx='4.5'/>
          <rect fill='#424242' x='249' y='6' width='9' height='90' rx='4.5'/>
          <path d='M228,44.5757016 L228,40.5097518 C228,38.0190847 230.019776,36 232.5,36 C234.985281,36 237,38.0134641 237,40.5097518 L237,91.4902482 C237,93.9809153 234.980224,96 232.5,96 C230.014719,96 228,93.9865359 228,91.4902482 L228,87.4242984 C222.588748,92.729045 215.17636,96 207,96 C190.431458,96 177,82.5685425 177,66 C177,49.4314575 190.431458,36 207,36 C215.17636,36 222.588748,39.270955 228,44.5757016 Z M207,87 C218.59798,87 228,77.5979797 228,66 C228,54.4020203 218.59798,45 207,45 C195.40202,45 186,54.4020203 186,66 C186,77.5979797 195.40202,87 207,87 Z' fill='#424242'/>
          <path d='M171.566757,44.4332432 C159.655766,32.5222523 140.344234,32.5222523 128.433243,44.4332432 C116.522252,56.3442341 116.522252,75.6557659 128.433243,87.5667568 C140.344234,99.4777477 159.655766,99.4777477 171.566757,87.5667568 C173.324116,85.8093975 173.324116,82.9601551 171.566757,81.2027958 C169.809398,79.4454365 166.960155,79.4454365 165.202796,81.2027958 C156.806524,89.5990681 143.193476,89.5990681 134.797204,81.2027958 C126.400932,72.8065235 126.400932,59.1934765 134.797204,50.7972042 C143.193476,42.4009319 156.806524,42.4009319 165.202796,50.7972042 C166.960155,52.5545635 169.809398,52.5545635 171.566757,50.7972042 C173.324116,49.0398449 173.324116,46.1906025 171.566757,44.4332432 Z' fill='#424242' fillRule='nonzero'/>
          <path d='M102,41.650086 L102,40.5097518 C102,38.0190847 99.9802243,36 97.5,36 C95.0147186,36 93,38.0134641 93,40.5097518 L93,91.4902482 C93,93.9809153 95.0197757,96 97.5,96 C99.9852814,96 102,93.9865359 102,91.4902482 L102,65.0800149 C102.269821,52.772034 107.976408,45.0292969 116.914551,45.0292969 C119.399832,45.0292969 121.414551,43.0145782 121.414551,40.5292969 C121.414551,38.0440155 119.399832,36.0292969 116.914551,36.0292969 C110.916968,36.0292969 105.88006,38.0781857 102,41.650086 L102,41.650086 Z' fill='#424242'/>
          <rect fill='#424242' x='72' y='36' width='9' height='60' rx='4.5'/>
          <circle fill='#2AC420' cx='76.5' cy='10.5' r='10.5'/>
          <path d='M51,44.5757016 L51,40.5097518 C51,38.0190847 53.0197757,36 55.5,36 C57.9852814,36 60,38.0134641 60,40.5097518 L60,91.4902482 C60,93.9809153 57.9802243,96 55.5,96 C53.0147186,96 51,93.9865359 51,91.4902482 L51,87.4242984 C45.588748,92.729045 38.1763602,96 30,96 C13.4314575,96 0,82.5685425 0,66 C0,49.4314575 13.4314575,36 30,36 C38.1763602,36 45.588748,39.270955 51,44.5757016 Z M30,87 C41.5979797,87 51,77.5979797 51,66 C51,54.4020203 41.5979797,45 30,45 C18.4020203,45 9,54.4020203 9,66 C9,77.5979797 18.4020203,87 30,87 Z' fill='#424242'/>
      </g>
      <path d='M84,168 C37.8,168 0,130.2 0,84 C0,37.8 37.8,0 84,0 C130.2,0 168,37.8 168,84 C168,130.2 130.2,168 84,168 Z M84,12 C44.4,12 12,44.4 12,84 C12,123.6 44.4,156 84,156 C123.6,156 156,123.6 156,84 C156,44.4 123.6,12 84,12 Z M122.342895,100.615799 C120.353028,98.7917542 118.031517,97.4651764 115.710006,96.3044208 C112.227739,94.6461985 107.08725,91.9930429 103.273338,94.4803763 C101.946761,95.3094874 100.951827,96.8018875 99.7910717,97.7968209 C98.2986716,99.2892209 96.6404493,100.781621 94.6505826,101.776554 C86.1936489,106.087932 75.0835595,104.263888 68.1190259,97.7968209 C64.1392924,93.6512651 61.651959,87.6816649 61.8177812,81.8778869 C61.9836034,77.4006867 63.4760035,72.7576643 66.2949814,69.1095752 C67.455737,67.6171752 68.948137,66.2905973 70.2747149,64.7981973 C71.6012927,63.4716194 72.4304039,61.9792194 72.4304039,59.9893526 C72.4304039,57.5020192 71.2696482,55.180508 70.2747149,52.8589968 C69.2797815,50.7033078 68.2848481,48.3817966 66.7924481,46.5577521 C65.4658702,44.7337075 63.4760035,42.7438408 61.3203145,41.9147296 C60.3253811,41.5830852 59.3304477,41.4172629 58.3355144,41.7489074 C57.0089365,42.0805519 56.0140032,43.0754852 55.0190698,43.9045964 C50.7076918,47.221041 46.2304916,51.0349522 44.0748027,56.0096191 C40.4267136,63.9690861 42.0849359,73.0893087 45.2355583,80.8829535 C48.8836473,89.6715316 54.8532476,97.6309986 61.8177812,104.098066 C65.9633369,108.243621 70.6063593,112.057533 75.5810262,115.208155 C82.0480931,119.187888 89.5100935,122.504333 97.137916,123.333444 C102.444227,123.996733 108.082183,123.167622 112.725206,120.680289 C114.715072,119.519533 116.539117,118.192955 118.197339,116.534733 C120.021384,114.710688 122.01125,112.720821 123.50365,110.730955 C124.498584,109.570199 125.825162,108.409444 125.990984,106.585399 C126.156806,104.263888 124.001117,102.108199 122.342895,100.615799 Z' fill='#2AC420'/>
    </g>
  </svg>
function CallCard(props) {
    const {classes} = props
    const [data, setData] = useState(null);
    const [selectedCall, setSelectedCall] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    useLayoutEffect(() => {
        if(props.data) setData(props.data);
    }, [props.data])
    console.log('data:', data);
    const handleCallDetail = (call, index) => {
        setSelectedCall(call);
        handleDialogOpen();
    }
    const handleDialogOpen = () => {
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    console.log('selectedCall:', selectedCall);
    const inbound = (
        <Box className={clsx(classes.muiIconGreyColor)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone-inbound" viewBox="0 0 16 16"> 
                <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0zm-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/> 
            </svg>
        </Box>
    )
    const outbound = (
        <Box className={clsx(classes.muiIconGreyColor)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone-outbound" viewBox="0 0 16 16"> 
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z"/> 
            </svg>
        </Box>
    )
    return (
        <Box className={classes.root}>
            {
                data && data.map((e, index) => (
                    <Card 
                        className={classes.card} 
                        key={index}
                        onClick={() => handleCallDetail(e, index)}>
                        <CardContent className={classes.cardContent}>
                            <Box className={classes.phoneIconBox}>
                                {
                                    e.direction === "inbound"?(inbound):
                                    e.direction === "outbound"?(outbound):null
                                }
                            </Box>
                            <Box className={classes.from}>
                                <Typography className={classes.textBold} variant='caption'>From</Typography>
                                {   e.call_type === "missed"?
                                    <Badge badgeContent={2} color="error">
                                        <Typography variant='caption'>{e.from}</Typography>
                                    </Badge>:
                                    <Typography variant='caption'>{e.from}</Typography>
                                } 
                            </Box>
                            <Box className={classes.to}>
                                <Typography  className={classes.textBold} variant='caption'>To</Typography>
                                <Typography variant='caption'>{e.to}</Typography>
                            </Box>
                            <Box className={classes.created_at}>
                                {splitWithComma(convertTimeFromIsoToLocale(e.created_at))[1]}
                            </Box>
                        </CardContent>
                    </Card>
                    )) 
            }
            {
                selectedCall && (
                    <Dialog 
                        onClose={handleDialogClose} 
                        open={dialogOpen}
                        maxWidth="xl"
                        className={classes.dialog}
                        >
                        <DialogTitle>
                           {airCallLogo}
                        </DialogTitle>
                        <DialogContent>
                            <List>
                                <ListItem>
                                    {   
                                        selectedCall.direction === "inbound"?(inbound):
                                        selectedCall.direction === "outbound"?(outbound):null
                                    }
                                </ListItem>
                                <ListItem>
                                    <Typography  className={classes.textBold} variant='caption'>FROM : </Typography>
                                    <Typography variant='caption' style={{paddingLeft:"0.5em"}}>{selectedCall.from}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography  className={classes.textBold} variant='caption'>TO : </Typography>
                                    <Typography variant='caption' style={{paddingLeft:"0.5em"}}>{selectedCall.to}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography  className={classes.textBold} variant='caption'>CALL TYPE : </Typography>
                                    <Typography variant='caption' style={{paddingLeft:"0.5em"}}>{selectedCall.call_type}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography  className={classes.textBold} variant='caption'>DURATION : </Typography>
                                    <Typography variant='caption' style={{paddingLeft:"0.5em"}}>{selectedCall.duration}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography  className={classes.textBold} variant='caption'>ARCHIVE : </Typography>
                                    <Typography variant='caption' style={{paddingLeft:"0.5em"}}>{String(selectedCall.is_archived)}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography  className={classes.textBold} variant='caption'>TIME : </Typography>
                                    <Typography variant='caption' style={{paddingLeft:"0.5em"}}>{splitWithComma(convertTimeFromIsoToLocale(selectedCall.created_at))[1]}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography  className={classes.textBold} variant='caption'>variant : </Typography>
                                    <Typography variant='caption' style={{paddingLeft:"0.5em"}}>{selectedCall.via}</Typography>
                                </ListItem>
                            </List>
                        </DialogContent>
                    </Dialog>
                )
            }
        </Box>
    )
}

export default withStyles(styles)(CallCard)
