import { AppContext } from '/src/components/AppState.js'
import { useContext } from 'react'



export default function MoveInMenu() {
    let { moveIn, setMoveIn } = useContext(AppContext)

    return (
        <>
            <input
                className="w-full rounded border p-2 border-gray-400"
                type="date"
                onChange={(e) => { setMoveIn(e.target.value) }}
            />
        </>
    )
}