import React, {useEffect, useState} from "react";
import space from "./image/space.jpg"
import {Size} from "./size";
import {toViewBoxString} from "./rectangle";
import {constellationIsComplete, constellations, Star} from "./constellation";
import {useDispatch, useSelector} from "react-redux";
import {
    skyMouseUpAction,
    starEnterAction,
    starLeaveAction,
    starMouseDownAction,
    viewBoxAspectAction,
    viewBoxScaleAction,
    viewBoxTranslateAction
} from "./store";
import {createMap} from "./misc";

interface SkyViewProps {
    size: Size
}

function StarView(props: { star: Star }) {
    const dispatch = useDispatch()
    const hoveredStarId = useSelector(state => state.sky.hoveredStarId);
    const focusedStarId = useSelector(state => state.sky.focusedStarId);
    return (
        <g>
            <circle
                style={{animation: "2s fadeIn"}}
                cx={props.star.x}
                cy={props.star.y}
                r={props.star.size * 10}
                fill="white"
            />
            <circle
                cx={props.star.x}
                cy={props.star.y}
                r={30}
                fill={focusedStarId === props.star.id ? "#ffffffc0" : hoveredStarId === props.star.id ? "#ffffff80" : "transparent"}
                onMouseEnter={() => dispatch(starEnterAction(props.star.id))}
                onMouseLeave={() => dispatch(starLeaveAction(props.star.id))}
                onMouseDown={() => dispatch(starMouseDownAction(props.star.id))}
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
    const starMap = createMap(stars)

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
            onMouseDown={e => {
                if (!sky.hoveredStarId) {
                    setDragging(true)
                }
            }}
            onMouseUp={() => {
                setDragging(false)
                dispatch(skyMouseUpAction())
            }}
            onMouseMove={e => {
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
            {sky.constellations
                .filter(constellation => constellationIsComplete(constellation.constellation, sky.edges))
                .map(constellation => (
                    <image
                        onDragStart={e => e.preventDefault()}
                        href={constellation.constellation.image}
                        x={constellation.x}
                        y={constellation.y}
                        style={{animation: "2s fade-in"}}
                    />
                ))
            }
            {sky.edges.map(([id1, id2]) => (
                <line
                    x1={starMap[id1].x}
                    y1={starMap[id1].y}
                    x2={starMap[id2].x}
                    y2={starMap[id2].y}
                    stroke="white"
                    strokeWidth={3}
                />
            ))}
            {stars.map(star => <StarView key={star.id} star={star}/>)}
        </svg>
    )
}