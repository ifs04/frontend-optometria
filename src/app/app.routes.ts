import { Routes } from '@angular/router';
import { ShowPatients } from './components/patients/show-patients/show-patients';
import { ShowVisualHistories } from './components/visual-histories/show-visual-histories/show-visual-histories';
import { ShowAppointments } from './components/appointments/show-appointments/show-appointments';
import { ShowOptometrists } from './components/optometrists/show-optometrists/show-optometrists';
import { ShowVisualExams } from './components/visual-exams/show-visual-exams/show-visual-exams';
import { ShowFrames } from './components/frames/show-frames/show-frames';
import { ShowLenses } from './components/lenses/show-lenses/show-lenses';
import { ShowOrders } from './components/orders/show-orders/show-orders';
import { ShowOrderDetails } from './components/order-details/show-order-details/show-order-details';
import { ShowSuppliers } from './components/suppliers/show-suppliers/show-suppliers';
import { ShowPayments } from './components/payments/show-payments/show-payments';
import { ShowDeliveries } from './components/deliveries/show-deliveries/show-deliveries';

export const routes: Routes = [
     { 
        path: '', 
        redirectTo: '/', 
        pathMatch: 'full' 
    },
    {
        path: "patients",
        component: ShowPatients
    },
    {
        path: "visual-histories",
        component: ShowVisualHistories
        
    },
    {
        path: "appointments",
        component: ShowAppointments
    },
    {
        path: "optometrists",
        component: ShowOptometrists
    },
    {
        path: "visual-exams",
        component: ShowVisualExams
        
    },
    {
        path: "frames",
        component: ShowFrames
    },
    {
        path: "lenses",
        component: ShowLenses
    },
    {
        path: "orders",
        component: ShowOrders
    },
    {
        path: "order-details",
        component: ShowOrderDetails
    },
    {
        path: "suppliers",
        component: ShowSuppliers
    },

    {
        path: "payments",
        component: ShowPayments
    },
    {
        path: "deliveries",
        component: ShowDeliveries
    },

];
