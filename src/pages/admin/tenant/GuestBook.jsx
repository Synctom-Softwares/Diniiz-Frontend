import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "@/components/common/Layout";
import { SearchAndFilters } from "@/components/tenant/guestbook/SearchAndFilter";
import { CustomerTable } from "@/components/tenant/guestbook/CustomerTable";
import tenantApi from "@/config/tenantApi";
import { CustomerDetailsDialog } from "@/components/tenant/guestbook/CutomerDetailsDialog";

function GuestBook() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientTypeFilter, setClientTypeFilter] = useState("all");
  const [lastVisitFilter, setLastVisitFilter] = useState("all");
  const [customers, setCustomers] = useState([]);

  const {
    userData: { locationId, tenantId },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await tenantApi.get(`/${tenantId}/customers`);
        const data = response?.data || response;
        setCustomers(data.customers || []);
      } catch (error) {
        console.error(error);
        setCustomers([]);
      }
    }
    fetchCustomers();
  }, []);

  const filteredCustomers = customers?.filter((customer) => {
    const matchesSearch =
      customer.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerEmail
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.customerPhone?.includes(searchTerm);

    const matchesClientType =
      clientTypeFilter === "all" || customer.customerType === clientTypeFilter;

    const matchesLastVisit =
      lastVisitFilter === "all" ||
      (lastVisitFilter === "recent" &&
        new Date(customer.lastVisited) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (lastVisitFilter === "old" &&
        new Date(customer.lastVisited) <=
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesClientType && matchesLastVisit;
  });

  const updateCustomers = (customers) => setCustomers(customers);

  return (
    <Layout title="Guestbook">
      <div className="p-3 bg-background rounded-3xl overflow-x-auto">
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          clientTypeFilter={clientTypeFilter}
          onClientTypeChange={setClientTypeFilter}
          lastVisitFilter={lastVisitFilter}
          onLastVisitChange={setLastVisitFilter}
        />

        <CustomerTable
          customers={filteredCustomers}
          onCustomerSelect={setSelectedCustomer}
          restartPagination={
            !!(
              searchTerm ||
              clientTypeFilter !== "all" ||
              lastVisitFilter !== "all"
            )
          }
        />

        {!!selectedCustomer && (
          <CustomerDetailsDialog
            customer={selectedCustomer}
            open={!!selectedCustomer}
            onOpenChange={(open) => !open && setSelectedCustomer(null)}
            updateCustomers={updateCustomers}
            customers={customers}
          />
        )}
      </div>
    </Layout>
  );
}

export default GuestBook;
