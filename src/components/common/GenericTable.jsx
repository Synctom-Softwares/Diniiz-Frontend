
import { useState } from "react";
import Dropdown from "./Dropdown";
import AddTenantForm from "../super/addTenant/AddTenantForm";
import UpgradeDowngradeForm from "../super/addTenant/UpgradeDowngradeForm";
import DeleteSuspendForm from "../super/addTenant/DeleteSuspendForm";
import ViewAccessEndPoint from "../super/addTenant/ViewAccessEndPoint";

const GenericTable = ({ columns = [], data = [] }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingRowData, setEditingRowData] = useState(null);
    
    const [showUpgradeDowngradeForm, setShowUpgradeDowngradeForm] = useState(false);
    const [showDeleteSuspendForm, setShowDeleteSuspendForm] = useState(false);
    const [showViewAccessEndPoint, setShowViewAccessEndPoint] = useState(false);

    const handleDropdownChange = (option, row) => {
        if (option === "Edit Detail") {
            setEditingRowData(row); // Set the data of the row being edited
            setShowEditForm(true);
        } else if (option === "Upgrade / Downgrade") {
            setShowUpgradeDowngradeForm(true)
        } else if (option === "Suspend / Delete") {
            setShowDeleteSuspendForm(true)
        } else if (option === "View Access Endpoint") {
            setShowViewAccessEndPoint(true)
        }
    };


    return (
        <div className="overflow-x-auto min-h-80">
            <table className="min-w-full  bg-white lg:text-[15px] text-[13px] text-left">
                <thead className=" text-textPrimary">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-3 border-b-2 border-gray-200 font-medium">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center p-4 text-textSecondary">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr key={idx} className=" hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-2 lg:text-[14px] text-[12px]">
                                        {col.type === 'action' ? (
                                            <div className="flex items-center gap-3">
                                                {col.actions?.includes('edit') && (
                                                    <button className="w-6 hover:underline flex">
                                                        <Dropdown
                                                            label=<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a2 2 0 1 0 2 2a2 2 0 0 0-2-2m-7 0a2 2 0 1 0 2 2a2 2 0 0 0-2-2m14 0a2 2 0 1 0 2 2a2 2 0 0 0-2-2" /></svg>
                                                            options={["Edit Detail", "Upgrade / Downgrade", "Suspend / Delete", "View Access Endpoint"]}
                                                            onChange={(option) => handleDropdownChange(option, row)}

                                                        />
                                                    </button>

                                                )}

                                            </div>
                                        ) : (
                                            row[col.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <AddTenantForm isOpen={showEditForm} onClose={() => setShowEditForm(false)} label={"Add Tenant"} />
            <UpgradeDowngradeForm isOpen={showUpgradeDowngradeForm} onClose={() => setShowUpgradeDowngradeForm(false)} label={"Upgrade / Downgrade Account"} />
            <DeleteSuspendForm isOpen={showDeleteSuspendForm} onClose={() => setShowDeleteSuspendForm(false)} label={"Delete / Suspend Account"} />
            <ViewAccessEndPoint isOpen={showViewAccessEndPoint} onClose={() => setShowViewAccessEndPoint(false)} label={"End Point Access"} />
        </div>
    );
};

export default GenericTable;
