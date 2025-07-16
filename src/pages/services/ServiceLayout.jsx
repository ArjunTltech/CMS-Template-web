import { useState } from "react";
import { Search } from "lucide-react";
import ServiceCard from "./ServiceCard";
import ServiceForm from "./CreateForm";
import dummyService from "../../components/data/dummyService";

function ServiceLayout() {
  const [services, setServices] = useState(dummyService);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [mode, setMode] = useState("add");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteService = (serviceId) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
  };

  const handleEditService = (service) => {
    setEditService(service);
    setMode("edit");
    setIsDrawerOpen(true);
  };

  const handleAddNewService = () => {
    setEditService(null);
    setMode("add");
    setIsDrawerOpen(true);
  };

  const handleServiceSubmit = (serviceData, mode) => {
    if (mode === "add") {
      setServices(prev => [...prev, serviceData]);
    } else if (mode === "edit") {
      setServices(prev => 
        prev.map(service => 
          service.id === serviceData.id ? serviceData : service
        )
      );
    }
    setIsDrawerOpen(false);
  };

  const filteredServices = services.filter((service) =>
    service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative">
      <div className="drawer drawer-end">
        <input
          id="new-service-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => setIsDrawerOpen(!isDrawerOpen)}
        />
        <div className="drawer-content">
          <div className="md:flex space-y-2 md:space-y-0 block justify-between items-center mb-8">
            <div className='space-y-2'>
              <h1 className="text-3xl font-bold text-neutral-content">Services</h1>
              <p>Total Services: {services.length}</p>
            </div>
            <button
              className="btn btn-primary text-white gap-2"
              onClick={handleAddNewService}
            >
              + Add new service
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search service..."
                className="input input-bordered w-full focus:outline-none pl-10 bg-base-100 text-neutral-content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onDelete={handleDeleteService}
                  onEdit={() => handleEditService(service)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="drawer-side">
          <label htmlFor="new-service-drawer" className="drawer-overlay"></label>
          <div className="p-4 md:w-[40%] w-full sm:w-1/2 overflow-y-scroll bg-base-100 h-[85vh] text-base-content absolute bottom-4 right-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editService ? "Edit Service" : "Add New Service"}
            </h2>
            <ServiceForm
              onServiceSubmit={handleServiceSubmit}
              initialData={editService}
              mode={mode}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceLayout;