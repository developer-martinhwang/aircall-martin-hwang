import React, {useState, useLayoutEffect, useCallback} from 'react'
import { useDispatch, useSelector} from "react-redux";
import { Box  } from '@material-ui/core'
import { retrieveCalls } from "../../slices/airCallSlice";
import CallCard from "../moudle/CallCard";

function InBoxAirCalls() {
    const airCalls = useSelector(state => state.airCalls);
    const dispatch = useDispatch();
    const initFetch = useCallback(() => {
        dispatch(retrieveCalls());
      }, [dispatch])
    const [inBoxAirCalls, setInBoxAirCall]= useState(null);
    useLayoutEffect(() => {
        initFetch()
        if(airCalls) {
            let _inBoxAirCalls = [];
            airCalls.forEach(e => {
                if(e.direction === "inbound")
                {
                    _inBoxAirCalls.push(e);
                }
            })
            setInBoxAirCall(_inBoxAirCalls);
        }
    }, [ initFetch])
    // console.log('inBoxAirCalls:', inBoxAirCalls);
    return (
        <Box>
            <CallCard data={inBoxAirCalls}/>
        </Box>
        
    )
}
export default InBoxAirCalls