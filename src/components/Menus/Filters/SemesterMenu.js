import { useContext } from "react"
import { AppContext } from "/src/components/AppState.js"


export default function SemesterMenu() {
    let { semesterPreference, setSemesterPreference } = useContext(AppContext)

    return (
        <>
            <select
                className="w-full rounded border p-2 mt-1 border-gray-400"
                onChange={(e) => { setSemesterPreference(e.target.value) }}
            >
                <option value="not-important">Any</option>
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
            </select>
        </>

    )
}
