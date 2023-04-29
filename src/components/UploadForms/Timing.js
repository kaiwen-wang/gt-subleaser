
import { getCurrentDate } from '@/utils/date.js'
import { useState } from 'react'

export default function Timing() {
    const [moveInDate, setMoveInDate] = useState(getCurrentDate());

    const handleMoveInChange = (event) => {
        setMoveInDate(event.target.value);
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="move_in"
                        className="mb-2 block text-lg font-medium"
                        id="move_in"
                    >
                        Earliest Move-in
                    </label>
                    <input
                        type="date"
                        name="move_in"
                        className="w-full rounded border p-2 border-gray-400"
                        min={getCurrentDate()}
                        onChange={handleMoveInChange}

                    />
                </div>
                <div>
                    <label
                        htmlFor="move_out"
                        className="mb-2 block text-lg font-medium"
                        id="move_out"

                    >
                        Latest Move-out
                    </label>
                    <input
                        type="date"
                        name="move_out"
                        className="w-full rounded border p-2 border-gray-400"
                        min={moveInDate}
                        // max date is moveInDate plus 1 year
                        max={new Date(new Date(moveInDate).setFullYear(new Date(moveInDate).getFullYear() + 1)).toISOString().split('T')[0]}
                    />
                </div>


            </div>

            {/* <div className="mt-2">
                <label
                    className="mb-2 block text-lg font-medium"
                    id="semester"
                    htmlFor="semester"
                >
                    Semester
                </label>
                <select
                    multiple
                    name="semester"
                    className="w-full rounded border p-2 border-gray-400"
                >
                    <option value="fall">Fall</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                </select>
            </div> */}
        </>
    )
}