import React, {useLayoutEffect, useCallback} from "react";
import { useDispatch, useSelector} from "react-redux";
import { Box  } from '@material-ui/core'
import { retrieveCalls } from "../../slices/airCallSlice";
import CallCard from "../moudle/CallCard";
function AllAirCalls() {
    const airCalls = useSelector(state => state.airCalls);
    const dispatch = useDispatch();
    const initFetch = useCallback(() => {
        dispatch(retrieveCalls());
      }, [dispatch])
    useLayoutEffect(() => {
        initFetch()
    }, [ initFetch])
    return (
        <Box>
            <CallCard data={airCalls}/>
        </Box>
        
    )
}
export default AllAirCalls;