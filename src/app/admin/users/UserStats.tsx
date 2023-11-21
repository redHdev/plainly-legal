"use client";
import { type UserFlatStat } from '~/data/admin';
import { DataTable } from '~/components/ui/shadcn/data-table';
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from '~/components/ui/shadcn/button';
import { exportCSV } from '~/utils/exportCSV';

//Create a new component called Client that just takes whatever is passed in and colsole logs it
export default function UserStats({ stats } : { stats: UserFlatStat[] }) {
    if (!stats[0]) throw new Error("No stats found");

    //Create a columns array out of the keys of the first object in the stats array
    const columns = Object.keys(stats[0]).map((key) => {
        //Create a new column object for each key
        const column: ColumnDef<UserFlatStat, string> = {
            id: key,
            accessorKey: key,
            header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  >
                    {key}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                )
              },
            };
        //Return the column object
        return column;
    });

    //Create a function to download the stats as a CSV
    const downloadCsv = () => {
        //Create a new array of objects with the keys we want
        exportCSV(stats);
    }

    return (
        <div className="max-w-6xl py-10">
            {/* Show a header with a download as CSV button */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">User Stats</h1>
                <Button onClick={downloadCsv}>Download as CSV</Button>
            </div>

            <DataTable columns={columns} data={stats} />
        </div>
    )
}