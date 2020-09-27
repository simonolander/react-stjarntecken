import { Size } from "./size";
import { DefaultRootState } from "react-redux";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { makeSky, Sky, toggleEdge } from "./sky";
import { aspect, scale, translate } from "./viewPort";
import { constellationIsComplete } from "./constellation";

declare module "react-redux" {
  interface DefaultRootState {
    window: Size;
    sky: Sky;
  }
}

const initialWindowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const initialState: DefaultRootState = {
  window: initialWindowSize,
  sky: makeSky(initialWindowSize.width / initialWindowSize.height),
};

export const resizeAction = createAction<Size>("resize");

export const viewBoxAspectAction = createAction<Size>("viewBoxAspect");
export const viewBoxTranslateAction = createAction<{ dx: number; dy: number }>(
  "viewBoxTranslate"
);
export const viewBoxScaleAction = createAction<{
  fx: number;
  fy: number;
  ds: number;
}>("viewBoxScale");

export const skyMouseUpAction = createAction<void>("skyMouseUp");
export const starEnterAction = createAction<string>("starEnter");
export const starLeaveAction = createAction<string>("starLeave");
export const starMouseDownAction = createAction<string | null>("starMouseDown");

export const store = configureStore({
  reducer: createReducer(initialState, (builder) =>
    builder
      .addCase(resizeAction, (state, action) => {
        state.window = action.payload;
      })
      .addCase(viewBoxAspectAction, (state, action) => {
        aspect(state.sky.viewPort, action.payload.width, action.payload.height);
      })
      .addCase(viewBoxTranslateAction, (state, action) => {
        translate(state.sky.viewPort, action.payload.dx, action.payload.dy);
      })
      .addCase(viewBoxScaleAction, (state, action) => {
        scale(
          state.sky.viewPort,
          action.payload.fx,
          action.payload.fy,
          action.payload.ds
        );
      })
      .addCase(starEnterAction, (state, action) => {
        state.sky.hoveredStarId = action.payload;
        if (state.sky.focusedStarId) {
          if (state.sky.focusedStarId !== action.payload) {
            toggleEdge(state.sky, state.sky.focusedStarId, action.payload);
          }
          state.sky.focusedStarId = action.payload;
          const constellation = state.sky.constellations.find((constellation) =>
            constellation.constellation.stars.some(
              (star) => star.id === action.payload
            )
          );
          if (
            constellation &&
            constellationIsComplete(
              constellation.constellation,
              state.sky.edges
            )
          ) {
            state.sky.focusedStarId = null;
          }
        }
      })
      .addCase(starLeaveAction, (state, action) => {
        if (state.sky.hoveredStarId === action.payload) {
          state.sky.hoveredStarId = null;
        }
      })
      .addCase(starMouseDownAction, (state, action) => {
        state.sky.focusedStarId = action.payload;
      })
      .addCase(skyMouseUpAction, (state, action) => {
        state.sky.focusedStarId = null;
      })
  ),
});
