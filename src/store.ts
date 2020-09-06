import {Size} from "./size";
import {DefaultRootState} from "react-redux";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import {hasEdge, Sky, toggleEdge} from "./sky";
import {aspect, scale, translate} from "./viewPort";
import {girlConstellation, squirrelConstellation} from "./constellation";


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
            constellation: squirrelConstellation,
            x: 1100,
            y: 400
        }],
        edges: [],
        extraStars: [
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

export const skyMouseUpAction = createAction<void>("skyMouseUp")
export const starEnterAction = createAction<string>("starEnter")
export const starLeaveAction = createAction<string>("starLeave")
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
            if (state.sky.focusedStarId) {
                if (state.sky.focusedStarId !== action.payload) {
                    toggleEdge(state.sky, state.sky.focusedStarId, action.payload)
                }
                state.sky.focusedStarId = action.payload
            }
        })
        .addCase(starLeaveAction, (state, action) => {
            if (state.sky.hoveredStarId === action.payload) {
                state.sky.hoveredStarId = null
            }
        })
        .addCase(starMouseDownAction, (state, action) => {
            state.sky.focusedStarId = action.payload
        })
        .addCase(skyMouseUpAction, (state, action) => {
            state.sky.focusedStarId = null
        })
    )
});

