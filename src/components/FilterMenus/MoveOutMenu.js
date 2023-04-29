import { AppContext } from '/src/components/AppState.js'
import { useContext } from 'react'




export default function MoveOutMenu() {
    let { moveOut, setMoveOut } = useContext(AppContext)
    return (
        <>
            <input
                className="w-full rounded border p-2 border-gray-400"
                type="date"
                onChange={(e) => { setMoveOut(e.target.value) }}
            />
        </>
    )
}