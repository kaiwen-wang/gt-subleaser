import Description from "@/components/UploadForms/Subsections/Description";
import Title from "@/components/UploadForms/Subsections/Title";
import { FormContext } from "/src/components/FormState";
import { useContext } from "react";

export default function BigPicture({ daReffy }) {
  let { formNeighborhood: neighborhood, setFormNeighborhood: setNeighborhood } =
    useContext(FormContext);

  return (
    <div className="">
      <Title daReffy={daReffy} />
      <Description daReffy={daReffy} />
      <div className="">
        <label
          htmlFor="Neighborhood"
          id="neighborhood"
          className=" block mb-2 text-lg font-medium"
        >
          Neighborhood
        </label>

        <select
          name="neighborhood"
          className="w-full p-2 mt-2 border border-gray-400 rounded"
          required
          value={neighborhood}
          onChange={(e) => {
            setNeighborhood(e.target.value);
          }}
        >
          <option value="">Please choose an option</option>
          <option value="Midtown">Midtown</option>
          <option value="Home Park">Home Park</option>
          <option value="Atlantic Station">Atlantic Station</option>
          <option value="North Avenue NW">North Avenue NW</option>
          <option value="West Midtown">West Midtown</option>
          <option value="Downtown">Downtown</option>
          <option value="Metro Atlanta (ITP)">Metro Atlanta (ITP)</option>
          <option value="Metro Atlanta (OTP)">Metro Atlanta (OTP)</option>
        </select>
      </div>
    </div>
  );
}
