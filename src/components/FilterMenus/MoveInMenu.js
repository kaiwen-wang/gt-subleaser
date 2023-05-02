import { AppContext } from '/src/components/AppState.js'
import { useContext } from 'react'



export default function MoveInMenu() {
    let { moveIn, setMoveIn } = useContext(AppContext)

    return (
        <>
            <span className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                    Move In Date
                </span>
            </span>
            <span className="block text-sm text-gray-500 mb-2">
                Earliest you'll be living here
            </span>


            <input
                className="w-full rounded border p-2 border-gray-400"
                type="date"
                onChange={(e) => { setMoveIn(e.target.value) }}
            />
        </>
    )
}