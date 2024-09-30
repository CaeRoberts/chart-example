import React, { useMemo, useState, useCallback } from 'react';
import CO2EmissionsChart from "@/components/CO2EmissionsChart";
import data from '@/data/data.json';

export default function Home() {
  const years = Array.from(new Set(data.map(item => item.year))).sort().reverse();
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleYearChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
    console.log(`Year changed to ${newYear}`);

    // A good use of the useCallback called here would be to fetch data from an API.
    // const response = await fetch(`https://api.example.com/data/${newYear}`);

  }, []);

  // const expensiveFunction = useMemo(() => {
  //   console.log('Expensive function called');
  //   return data.filter(item => item.year === selectedYear);
  // }, [selectedYear]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col w-fit max-w-lg border rounded-md shadow-lg">
        <div className="flex bg-white text-black w-full p-4 rounded-t-md">
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedYear}
            onChange={handleYearChange} // Use the memoized function here
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