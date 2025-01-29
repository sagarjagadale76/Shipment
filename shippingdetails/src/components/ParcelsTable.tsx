import { Button } from "./ui/button"
import { Card } from "./ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { FileText, MapPin, Truck, Download, Printer } from 'lucide-react'
import * as React from 'react';

import axios from "axios";
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
//import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ClientSideRowModelModule,provideGlobalGridOptions, themeBalham  } from "ag-grid-community";


export function ParcelsTable() {

  const [rowData, setRowData] = React.useState([]);
  const [totalParcel, setTotalParcel] = React.useState(0);
  const myTheme = themeBalham.withParams({ accentColor: 'red' });
  
  
  const onGridReady = React.useCallback((params) =>  {
    debugger;
    axios(
      {
          method: "GET",
          url: "https://dd7hs8uomk.execute-api.eu-west-2.amazonaws.com/dev/shipmentdetails",
          headers: { "x-api-key" : "TYXQrJvtOT1ac268C3eb0962We9XUlJu1Dls8Rvu" }
      }            
  )
  .then(response => { 
    debugger;         
    const results = [];
    // Store results in the results array
    response.data.map((value) => {
       results.push({
        CustomerReference: value.CustomerReference,
        TrackingNumber: value.TrackingNumber,
        OrderReference: value.OrderReference,
        ConsigneeName: value.ConsigneeName,
        ConsigneeAddress1: value.ConsigneeAddress1,
        ConsigneeAddress2: value.ConsigneeAddress2,
        ConsigneeAddress3: value.ConsigneeAddress3,
        Zip: value.Zip,
        ConsigneeCountry: value.ConsigneeCountry,
        BatchId : value.BatchId,
        ServiceId : value.ServiceId,
        ShipperCompany : value.ShipperCompany,
        ZplLabel : value.ZplLabel,
        ShippingLabel : value.ShippingLabel
      });
    }); 

    setRowData(results);
    setTotalParcel(results.length);                   
  });
  }, []);

   // Column Definitions: Defines the columns to be displayed.
   const [colDefs, setColDefs] = React.useState([
    { 
      headerName: "Labels",
      cellRenderer: (params) => (
        
        <div className="space-y-2">
                      <div>System label</div>
                      <div className="flex gap-2 text-sm">
                        <Link to="#" onClick={() => downloadFile(params.data.ZplLabel,'application/pdf', 'ShippingLabel-' + params.data.ConsigneeName + '.pdf')} className="text-[#4AA3BA] hover:underline flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          PDF
                        </Link>
                        {" | "}
                        
                          <Link to="#" onClick={() => downloadFile(params.data.ZplLabel,'text/plain','label.zpl')} className="text-[#4AA3BA] hover:underline">
                            ZPL
                          </Link>
                        
                      </div>
            </div>
      ),
    },
    {
      headerName: "Created/Accepted",
      sortable:true,
      cellRenderer: (params) => (
        <div>
        <div>09:45 (UTC)</div>
        <div className="text-muted-foreground">19 Dec 2024</div>
        </div>
      )
    },
    { 
      headerName: "Reference/Tracking", 
      cellRenderer: (params) => (
        <div className="space-y-2">
                      <Link to="#" className="text-[#4AA3BA] hover:underline flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Details
                      </Link>
                      <div className="space-y-1">                        
                        <div>
                          <span className="font-medium">System#:</span> {params.data.TrackingNumber}
                        </div>
                        <div>
                          <span className="font-medium">Customer#:</span> {params.data.CustomerReference}
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="font-medium">Order#:</span>
                          <span>{params.data.OrderReference}</span>                          
                        </div>
                      </div>
                    </div>
      ),
      autoHeight: true  },
    {
      headerName: "Consignee information",
      cellRenderer: (params) => (
        <div>
        <div>{params.data.ConsigneeName}</div>
                    <div>{params.data.ConsigneeAddress1 + ',' + params.data.ConsigneeAddress2}</div>
                    <div>{params.data.Zip}</div>
                    <div>{params.data.ConsigneeCountry}</div>  
        </div>
      )
    },
    {
      headerName: " Service",
      autoHeight: true,
      cellRenderer: (params) => (
        <>
          <div>{params.data.ShipperCompany}</div>
          <div className="text-muted-foreground">({params.data.ServiceId})</div>                  
        </>
      ),
    },
    { 
      headerName: "Status",
      cellRenderer: (params) => (
        <>
          <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-600 ring-1 ring-inset ring-orange-500/10">
                    Created
                    </span>                 
        </>
      ),  
      width: 200 
    },
    {
      headerName: " Source",
      cellRenderer: (params) => (
        <>
          BatchId: {params.data.BatchId}
        </>
        
      ),
    },        
]);


const downloadFile = (zplContent, mediatype, linkToDownload) => {
  const blob = new Blob([zplContent], { type: mediatype })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = linkToDownload
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

  return (
    <div className="p-4">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Parcels list</h1>
        <p className="text-muted-foreground">The total number of parcels: {totalParcel}</p>
      </div>
      <Button className="bg-[#4AA3BA] hover:bg-[#3A8296]">
        CREATE NEW PARCEL
      </Button>
    </div>

    <div className="space-y-4">
      <Button variant="outline">ACTION</Button>
      <div className="ag-theme-quartz" style={{ height: "600px", width: "100%", marginTop:"40px" }} >
        <AgGridReact
          theme={myTheme}
          rowData={rowData}
          columnDefs={colDefs}
          rowHeight={30}          
          alwaysShowHorizontalScroll={true}
          onGridReady = {onGridReady}
          pagination={true}
          paginationAutoPageSize={true}
          defaultColDef={{
            resizable: true,            
          }}
        />
      </div>
      
      </div>
    </div>
  )
}

