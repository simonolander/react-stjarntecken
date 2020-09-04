import React from "react";
import space from "./image/space.jpg"
import {Size} from "./size";
import {Sky} from "./sky";

interface SkyViewProps {
    size: Size,
    sky?: Sky
}

function StarView() {

}

export default function SkyView(props: SkyViewProps) {
    function onDown(x: number, y: number) {
        console.log(x, y)
    }
    return (
        <svg
            style={{
                width: props.size.width,
                height: props.size.height,
                backgroundImage: `url(${space})`,
                backgroundSize: "cover",
                backgroundBlendMode: "color-burn"
            }}
            viewBox={`0 0 1000 1000`}
            onMouseDown={e => onDown(e.clientX, e.clientY)}
        >
            <circle
                cx={300}
                cy={300}
                r={10}
                fill="white"
            />

        </svg>
    )
}