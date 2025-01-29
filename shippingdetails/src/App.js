import React from "react";
import "./App.css";
import ShippingDetails from "./components/ShippingDetails";
import NewBatchPopup from "./components/NewBatchPopup";
import ViewBatchPopup from "./components/ViewBatchPopup";
import BatchAuditDialog from "./components/BatchAuditDialog";
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import {ParcelsTable} from './components/ParcelsTable';
import {
    Routes,
    Route,
} from "react-router-dom";



function App() {
    return (       
        <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1">          
          <main className="bg-white m-4 rounded-lg shadow">
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/reports" element={<Reports />} /> */}
              {/* <Route path="/export" element={<Export />} /> */}
              <Route path="/parcels" element={<ParcelsTable />} />
              <Route path="/batches" element={<ShippingDetails />} />
              <Route path="/NewBatch" element={<NewBatchPopup />} />
              <Route path="/BatchAuditDialog" element={<BatchAuditDialog />} />              
            </Routes>
          </main>
        </div>
      </div>     
       
    );
}

export default App;