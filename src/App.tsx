import React, {useEffect} from 'react';
import SkyView from "./SkyView";
import {resizeAction, store} from "./store";
import {useSelector} from "react-redux";

interface SideBarProps {

}

function SideBar(props: SideBarProps) {
    return null
}

export default function App() {
    const windowSize = useSelector(state => state.window);
    useEffect(() => {
        const onResize = () => {
            store.dispatch(resizeAction({
                width: window.innerWidth,
                height: window.innerHeight,
            }))
        }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])
    return (
        <div>
            <SkyView size={windowSize}/>
        </div>
    );
}