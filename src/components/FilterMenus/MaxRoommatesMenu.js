import { AppContext } from '/src/components/AppState.js'
import { useContext } from 'react'

export default function MaxRoommatesMenu() {
    let { maxRoommates, setMaxRoommates } = useContext(AppContext)

    return (

        <>
            <input
                className="w-full rounded border p-2 border-gray-400"
                type="number"
                onChange={(e) => { setMaxRoommates(e.target.value) }}
            >
            </input>
        </>
    )
}