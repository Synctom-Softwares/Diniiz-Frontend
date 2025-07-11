import { useState } from "react";

import { CustomerTable } from "@/components/location/guestbook/CustomerTable";
import { CustomerDetailsDialog } from "@/components/location/guestbook/CutomerDetailsDialog";
import { SearchAndFilters } from "@/components/location/guestbook/SearchAndFilter";
import { generateDummyCustomers } from "@/constants/dummyGuestbookData";
import Layout from "@/components/common/Layout";

function GuestBook() {
  const [customers] = useState(generateDummyCustomers(256));
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientTypeFilter, setClientTypeFilter] = useState("all");
  const [lastVisitFilter, setLastVisitFilter] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

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

  return (
    <Layout title="Guestbook">
      <div className="p-3 bg-background rounded-lg">
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

        <CustomerDetailsDialog
          customer={selectedCustomer}
          open={!!selectedCustomer}
          onOpenChange={(open) => !open && setSelectedCustomer(null)}
        />
      </div>
    </Layout>
  );
}

export default GuestBook;
