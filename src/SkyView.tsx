import React, {useEffect, useState} from "react";
import space from "./image/space.jpg"
import {Size} from "./size";
import {toViewBoxString} from "./rectangle";
import {Star} from "./constellation";
import {useDispatch, useSelector} from "react-redux";
import {viewBoxAspectAction, viewBoxScaleAction, viewBoxTranslateAction} from "./store";

interface SkyViewProps {
    size: Size
}

function StarView(props: { star: Star }) {
    return (
        <circle
            cx={props.star.x}
            cy={props.star.y}
            r={props.star.size * 10}
            fill="white"
        />
    )
}

export default function SkyView(props: SkyViewProps) {
    const sky = useSelector(state => state.sky);
    const dispatch = useDispatch();
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        dispatch(viewBoxAspectAction(props.size))
    }, [props.size, dispatch])

    return (
        <svg
            style={{
                width: props.size.width,
                height: props.size.height,
                backgroundImage: `url(${space})`,
                backgroundSize: "cover",
                backgroundBlendMode: "color-burn"
            }}
            viewBox={toViewBoxString(sky.viewPort.viewBox)}
            onMouseDownCapture={e => {
                e.preventDefault()
                setDragging(true)
            }}
            onMouseUpCapture={e => setDragging(false)}
            onMouseMoveCapture={e => {
                if (!dragging) {
                    return
                }
                const dx = -e.movementX * sky.viewPort.viewBox.width / props.size.width
                const dy = -e.movementY * sky.viewPort.viewBox.height / props.size.height
                dispatch(viewBoxTranslateAction({dx, dy}))
            }}
            onWheel={e => {
                e.preventDefault()
                const scrollSensitivity = 0.01
                const fx = sky.viewPort.viewBox.x + e.clientX * sky.viewPort.viewBox.width / props.size.width
                const fy = sky.viewPort.viewBox.y + e.clientY * sky.viewPort.viewBox.height / props.size.height
                const ds = Math.exp(scrollSensitivity * e.deltaY)
                dispatch(viewBoxScaleAction({fx, fy, ds}))
            }}
        >
            {sky.extraStars.map(star => <StarView key={star.id} star={star}/>)}
        </svg>
    )
}