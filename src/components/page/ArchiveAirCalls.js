import React, {useState, useLayoutEffect, useCallback} from 'react'
import { useDispatch, useSelector} from "react-redux";
import { Box  } from '@material-ui/core'
import { retrieveCalls } from "../../slices/airCallSlice";
import CallCard from "../moudle/CallCard";

function ArchiveAirCalls() {
    const airCalls = useSelector(state => state.airCalls);
    const dispatch = useDispatch();
    const initFetch = useCallback(() => {
        dispatch(retrieveCalls());
      }, [dispatch])
    const [archiveAirCalls, setArchiveAirCalls]= useState(null);
    useLayoutEffect(() => {
        initFetch()
        if(airCalls) {
            let _archiveAirCalls = [];
            airCalls.forEach(e => {
                if(e.is_archived === true)
                {
                    _archiveAirCalls.push(e);
                }
            })
            setArchiveAirCalls(_archiveAirCalls);
        }
    }, [ initFetch])
    // console.log('archiveAirCalls:', archiveAirCalls);
    return (
        <Box>
            <CallCard data={archiveAirCalls}/>
        </Box>
        
    )
}
export default ArchiveAirCalls