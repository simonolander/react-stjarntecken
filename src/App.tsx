import React, {useEffect} from "react";
import {resizeAction, store} from "./store";
import {GameView} from "./GameView";


export default function App() {
    useEffect(() => {
        const onResize = () => {
            store.dispatch(
                resizeAction({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            );
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div>
            <GameView/>
        </div>
    );
}
