import {useSelector} from "react-redux";
import React, {CSSProperties} from "react";
import SkyView from "./SkyView";
import {Size} from "./size";

interface GameViewProps {
}

export function GameView(props: GameViewProps) {
    const windowSize = useSelector(state => state.window);
    const portrait = windowSize.width < windowSize.height
    let style: CSSProperties = {
        display: "flex",
        flexDirection: "row"
    }
    if (portrait) {
        style.flexDirection = "column"
        const sideBarSize = windowSize.height / 6
        const skySize: Size = {
            width: windowSize.width,
            height: windowSize.height - sideBarSize
        }
        return (
            <div style={style}>
                <SkyView size={skySize}/>
                <SideBar portrait={portrait} size={sideBarSize}/>
            </div>
        )
    } else {
        const sideBarSize = windowSize.width / 6
        const skySize: Size = {
            width: windowSize.width - sideBarSize,
            height: windowSize.height
        }
        return (
            <div style={style}>
                <SideBar portrait={portrait} size={sideBarSize}/>
                <SkyView size={skySize}/>
            </div>
        )
    }
}

interface SideBarProps {
    portrait: boolean
    size: number
}

function SideBar(props: SideBarProps) {
    const placedConstellations = useSelector((state) => state.sky.positionedConstellations);
    const style: CSSProperties = {
        display: "flex",
        flexDirection: props.portrait ? "row" : "column"
    }
    style[props.portrait ? "height" : "width"] = props.size
    return (
        <div style={style}>
            {placedConstellations.map((placedConstellation) => (
                <p>{placedConstellation.constellation.name}</p>
            ))}
        </div>
    );
}
