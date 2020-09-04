import React from 'react';
import SkyView from "./SkyView";
import {useSelector} from "react-redux";

interface SideBarProps {

}

function SideBar(props: SideBarProps) {
    return null
}

export default function App() {
    const window = useSelector(state => state.window);
    return (
        <div>
            <SkyView size={window}/>
        </div>
    );
}