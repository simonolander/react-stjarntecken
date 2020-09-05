import {Size} from "./size";
import {DefaultRootState} from "react-redux";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import {Sky} from "./sky";
import {deg2rad} from "./math";
import {aspect, scale, translate} from "./viewPort";
import {girlConstellation} from "./constellation";


declare module "react-redux" {
    interface DefaultRootState {
        window: Size
        sky: Sky
    }
}

const initialWindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
}
console.log(initialWindowSize)

const initialState: DefaultRootState = {
    window: initialWindowSize,
    sky: {
        constellations: [{
            angle: 0,
            constellation: girlConstellation,
            x: 300,
            y: 300
        }],
        edges: [],
        extraStars: [
            {
                id: "4aefe6e2-172d-4518-b8ca-e7cc885cad82",
                x: 1344 + 150 * Math.cos(deg2rad(0 - 90)),
                y: 763.5 + 150 * Math.sin(deg2rad(0 - 90)),
                size: 1,
            },
            {
                id: "fe6349e2-9b12-4d6f-b04c-f6beaee5ff2f",
                x: 1344 + 150 * Math.cos(deg2rad(120 - 90)),
                y: 763.5 + 150 * Math.sin(deg2rad(120 - 90)),
                size: 0.4,
            },
            {
                id: "5df46211-e056-41e4-b46b-6b2c84a79ca5",
                x: 1344 + 150 * Math.cos(deg2rad(240 - 90)),
                y: 763.5 + 150 * Math.sin(deg2rad(240 - 90)),
                size: 0.6,
            },
            {
                id: "d14676c2-52e5-4313-ad1d-5ddbdff200d6",
                x: 0,
                y: 0,
                size: 5,
            },
            {
                id: "8eaa80e4-0886-416f-a644-f6a2e2d5020a",
                x: 2688,
                y: 0,
                size: 5,
            },
            {
                id: "91c0b565-de29-4831-9ea9-a6cf1b1cd261",
                x: 0,
                y: 1527,
                size: 5,
            },
            {
                id: "a7bea306-9564-4512-bfb8-7d3bf9ad9ef2",
                x: 2688,
                y: 1527,
                size: 5,
            },
        ],
        focusedStarId: null,
        hoveredStarId: null,
        viewPort: {
            bounds: {
                x: 0,
                y: 0,
                width: 2688,
                height: 1527,
            },
            viewBox: {
                x: 0,
                y: 0,
                ...initialWindowSize
            }
        }

    }
}

export const resizeAction = createAction<Size>("resize");

export const viewBoxAspectAction = createAction<Size>("viewBoxAspect")
export const viewBoxTranslateAction = createAction<{dx: number, dy: number}>("viewBoxTranslate")
export const viewBoxScaleAction = createAction<{fx: number, fy: number, ds: number}>("viewBoxScale")

export const starEnterAction = createAction<string | null>("starEnter")
export const starLeaveAction = createAction<string | null>("starLeave")
export const starMouseDownAction = createAction<string | null>("starMouseDown")


export const store = configureStore({
    reducer: createReducer(initialState, builder => builder
        .addCase(resizeAction, (state, action) => {
            state.window = action.payload
        })
        .addCase(viewBoxAspectAction, (state, action) => {
            aspect(state.sky.viewPort, action.payload.width, action.payload.height)
        })
        .addCase(viewBoxTranslateAction, (state, action) => {
            translate(state.sky.viewPort, action.payload.dx, action.payload.dy)
        })
        .addCase(viewBoxScaleAction, (state, action) => {
            scale(state.sky.viewPort, action.payload.fx, action.payload.fy, action.payload.ds)
        })
        .addCase(starEnterAction, (state, action) => {
            state.sky.hoveredStarId = action.payload
        })
        .addCase(starLeaveAction, (state, action) => {
            if (state.sky.hoveredStarId === action.payload) {
                state.sky.hoveredStarId = null
            }
        })
        .addCase(starMouseDownAction, (state, action) => {
            state.sky.focusedStarId = action.payload
        })
    )
});

