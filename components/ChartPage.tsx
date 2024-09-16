import React, { useState } from 'react';
import CO2EmissionsChart from "@/components/CO2EmissionsChart";
import data from '@/data/data.json';


// Notes:
// We are importing the JSON file provided, however, this data could also be fetched from an API.
// An expansion of this project would include the usage of a useCallback and useMemo to optimize the rendering of the chart.
// The useMemo would be used to memoize the data filtering and the useCallback would be used to memoize the function that filters the data.
// More than happy to provide an example of this if needed.

export default function Home() {
  const years = Array.from(new Set(data.map(item => item.year))).sort().reverse();
  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col w-fit max-w-lg border rounded-md shadow-lg">
        <div className="flex bg-white text-black w-full p-4 rounded-t-md">
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>Y-{year}</option>
            ))}
          </select>
        </div>
        <CO2EmissionsChart data={data} selectedYear={selectedYear} />
      </div>
    </div>
  );
}