import { AppContext } from '/src/components/AppState.js'
import { useContext } from 'react'

export default function MaxRoommatesMenu() {
    let { maxRoommates, setMaxRoommates } = useContext(AppContext)

    return (
        <>
            <span className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                    Max Roommates
                </span>
            </span>
            <span className="block text-sm text-gray-500 mb-2">
                You'll live with __ people max
            </span>

            <input
                className="w-full rounded border p-1 border-gray-400"
                type="number"
                onChange={(e) => { setMaxRoommates(e.target.value) }}
            >
            </input>
        </>
    )
}