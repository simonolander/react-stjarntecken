import React, {useEffect, useState} from "react";
import space from "./image/space.jpg"
import {Size} from "./size";
import {toViewBoxString} from "./rectangle";
import {Star} from "./constellation";
import {useDispatch, useSelector} from "react-redux";
import {
    starEnterAction,
    starLeaveAction,
    viewBoxAspectAction,
    viewBoxScaleAction,
    viewBoxTranslateAction
} from "./store";

interface SkyViewProps {
    size: Size
}

function StarView(props: { star: Star }) {
    const dispatch = useDispatch()
    const hoveredStarId = useSelector(state => state.sky.hoveredStarId);
    return (
        <g>
            <circle
                cx={props.star.x}
                cy={props.star.y}
                r={props.star.size * 10}
                fill="white"
            />
            <circle
                cx={props.star.x}
                cy={props.star.y}
                r={props.star.size * 30}
                fill={hoveredStarId === props.star.id ? "#ffffff80":"transparent"}
                onMouseEnter={() => dispatch(starEnterAction(props.star.id))}
                onMouseLeave={() => dispatch(starLeaveAction(props.star.id))}
                onMouseDown={() => undefined}
            />
        </g>
    )
}

export default function SkyView(props: SkyViewProps) {
    const sky = useSelector(state => state.sky);
    const dispatch = useDispatch();
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        dispatch(viewBoxAspectAction(props.size))
    }, [props.size, dispatch])

    const stars = [...sky.extraStars]
    for (const constellation of sky.constellations) {
        for (const star of constellation.constellation.stars) {
            stars.push({
                ...star,
                x: star.x + constellation.x,
                y: star.y + constellation.y
            })
        }
    }

    const edges = []
    for (const constellation of sky.constellations) {
        for (const edge of constellation.constellation.edges) {
            const star0 = constellation.constellation.stars.find(star => star.id === edge[0])
            if (!star0) {
                continue
            }
            const star1 = constellation.constellation.stars.find(star => star.id === edge[1])
            if (!star1) {
                continue
            }
            edges.push([star0.x + constellation.x, star0.y + constellation.y, star1.x + constellation.x, star1.y + constellation.y])
        }
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
            {sky.constellations.map(constellation => (
                <image href={constellation.constellation.image} x={constellation.x} y={constellation.y}/>
            ))}
            {edges.map(([x0, y0, x1, y1]) => (
                <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="white" strokeWidth={3}/>
            ))}
            {stars.map(star => <StarView key={star.id} star={star}/>)}
        </svg>
    )
}