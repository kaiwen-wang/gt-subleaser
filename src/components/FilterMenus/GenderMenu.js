import { useContext } from "react"
import { AppContext } from "/src/components/AppState.js"

export default function GenderMenu() {
    let { genderPreference, setGenderPreference } = useContext(AppContext)

    return (
        <>
            <select
                className="w-full rounded border p-2 mt-1 border-gray-400"
                onChange={(e) => { setGenderPreference(e.target.value) }}
            >
                <option value="not-important">Any</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select>
        </>
    )

}
