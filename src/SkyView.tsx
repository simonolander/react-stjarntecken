import React, {useEffect, useState} from "react";
import space from "./image/space.jpg"
import {Size} from "./size";
import {rectangleCenter, toViewBoxString} from "./rectangle";
import {constellationIsComplete, Star} from "./constellation";
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
import {PlacedConstellation} from "./sky";
import {rad2deg} from "./math";

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

function ConstellationView(props: { constellation: PlacedConstellation }) {
    const edges = useSelector(state => state.sky.edges)
    const complete = constellationIsComplete(props.constellation.constellation, edges)
    const [cx, cy] = rectangleCenter({
        x: props.constellation.x,
        y: props.constellation.y,
        width: props.constellation.constellation.width,
        height: props.constellation.constellation.height,
    })
    return (
        <g transform={`
            translate(${props.constellation.x}, ${props.constellation.y})
            rotate(${rad2deg(props.constellation.angle)}, ${cx}, ${cy}) 
        `}>
            {props.constellation.constellation.stars.map(star => <StarView key={star.id} star={star}/>)}
            {complete && (
                <image
                    onDragStart={e => e.preventDefault()}
                    href={props.constellation.constellation.image}
                    style={{animation: "2s fade-in"}}
                />
            )}
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
    const starMap: Record<string, [number, number]> = {}
    
    for (const {id, x, y} of stars) {
        starMap[id] = [x, y];
    }
    for (const constellation of sky.constellations) {
        for (const {id, x, y} of constellation.constellation.stars) {
            starMap[id] = [x + constellation.x, y + constellation.y];
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
                if (e.ctrlKey) {
                    const scrollSensitivity = 0.01
                    const fx = sky.viewPort.viewBox.x + e.clientX * sky.viewPort.viewBox.width / props.size.width
                    const fy = sky.viewPort.viewBox.y + e.clientY * sky.viewPort.viewBox.height / props.size.height
                    const ds = Math.exp(scrollSensitivity * e.deltaY)
                    dispatch(viewBoxScaleAction({fx, fy, ds}))
                } else {
                    const dx = e.deltaX * sky.viewPort.viewBox.width / props.size.width
                    const dy = e.deltaY * sky.viewPort.viewBox.height / props.size.height
                    dispatch(viewBoxTranslateAction({dx, dy}))
                }
            }}
        >
            <rect
                x={sky.viewPort.bounds.x}
                y={sky.viewPort.bounds.y}
                width={sky.viewPort.bounds.width}
                height={sky.viewPort.bounds.height}
                stroke="white"
                strokeWidth={5}
            />
            {sky.constellations.map(constellation => (
                <ConstellationView
                    key={constellation.constellation.id}
                    constellation={constellation}
                />
            ))}
            {sky.edges.map(([id1, id2]) => (
                <line
                    x1={starMap[id1][0]}
                    y1={starMap[id1][1]}
                    x2={starMap[id2][0]}
                    y2={starMap[id2][1]}
                    stroke="white"
                    strokeWidth={3}
                />
            ))}
            {stars.map(star => <StarView key={star.id} star={star}/>)}
        </svg>
    )
}
