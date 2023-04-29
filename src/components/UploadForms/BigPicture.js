
import Title from "@/components/UploadForms/Title"
import Description from "@/components/UploadForms/Description"
import Neighborhood from "./Neighborhood"


export default function BigPicture() {
    return (
        <>
            <div className="">
                <Title />
            </div>
            <div className="">
                <Description />
            </div>
            <div className="">
                <label
                    htmlFor="Neighborhood"
                    id="neighborhood"
                    className="mb-2 text-lg font-medium  block "
                >
                    Neighborhood
                </label>

                <select
                    name="neighborhood"
                    className="w-full rounded border p-2 mt-2 border-gray-400"
                    required
                >
                    <option value="">Please choose an option</option>
                    <option value="Home Park">Home Park</option>
                    <option value="Atlantic Station">Atlantic Station</option>
                    <option value="North Avenue NW">North Avenue NW</option>
                    <option value="Midtown">Midtown</option>
                    <option value="West Midtown">West Midtown</option>
                    <option value="Downtown">Downtown</option>
                    <option value="Metro Atlanta (ITP)">Metro Atlanta (ITP)</option>
                    <option value="Metro Atlanta (OTP)">Metro Atlanta (OTP)</option>
                </select>
            </div>
        </>
    )
}