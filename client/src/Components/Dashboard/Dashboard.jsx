// the whole design is from https://www.youtube.com/watch?v=D88K1esxwuo&t=98s
import styles from './Dashboard.module.css'

import Sidebar from './Sidebar';
import MainContentNav from './MainContentNav'
import MainContentAuthor from './MainContentAuthor';

import { createContext, useState, useEffect, useRef } from 'react';

export const dashBoardContext = createContext(null);


const isAuthor = true;
const COLLAPSE_WIDTH = 768;

const Dashboard = () => {

    //this part is for changing dark and white theme
    const [isChecked, setChecked] = useState(false);  
    const handleToggle = () => {
        setChecked((prev) => !prev);
    };

    //this part is to handle window resizing
    //codes learn and copy from https://dev.to/musselmanth/re-rendering-react-components-at-breakpoint-window-resizes-a-better-way-4343
    const [isClose, setIsClose] = useState(window.innerWidth <= COLLAPSE_WIDTH);
    const prevWidth = useRef(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            //this help re-render only triggers
            //when the current window size and previous window size are on different sides of the threshold of COLLAPSE_WIDTH
            const currWidth = window.innerWidth;
            if (currWidth <= COLLAPSE_WIDTH && prevWidth.current > COLLAPSE_WIDTH){
                setIsClose(true)
            } else if (currWidth > COLLAPSE_WIDTH && prevWidth.current <= COLLAPSE_WIDTH) {
                setIsClose(false)
            }

            prevWidth.current = currWidth;
        }    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    },[]);


    return (

        <dashBoardContext.Provider value = {{isChecked, handleToggle, isClose}}>
            <div className = {`${styles.dashBoardContainer} ${isChecked ? styles.dark : ''}`}>
                <Sidebar />
                <MainContentNav/>
                {isAuthor && <MainContentAuthor />}
            </div>      
        </dashBoardContext.Provider>
    );
};

export default Dashboard;