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
import { CreatePatient } from './components/patients/create-patient/create-patient';
import { CreateVisualHistory } from './components/visual-histories/create-visual-history/create-visual-history';
import { UpdatePatient } from './components/patients/update-patient/update-patient';
import { UpdateVisualHistory } from './components/visual-histories/update-visual-history/update-visual-history';
import { CreateAppointment } from './components/appointments/create-appointment/create-appointment';
import { UpdateAppointment } from './components/appointments/update-appointment/update-appointment';
import { CreateOptometrist } from './components/optometrists/create-optometrist/create-optometrist';
import { UpdateOptometrist } from './components/optometrists/update-optometrist/update-optometrist';
import { CreateVisualExam } from './components/visual-exams/create-visual-exam/create-visual-exam';
import { UpdateVisualExam } from './components/visual-exams/update-visual-exam/update-visual-exam';
import { CreateFrame } from './components/frames/create-frame/create-frame';
import { UpdateFrame } from './components/frames/update-frame/update-frame';
import { CreateLens } from './components/lenses/create-lens/create-lens';
import { UpdateLens } from './components/lenses/update-lens/update-lens';
import { CreateOrderDetail } from './components/order-details/create-order-detail/create-order-detail';
import { UpdateOrderDetail } from './components/order-details/update-order-detail/update-order-detail';
import { CreateSupplier } from './components/suppliers/create-supplier/create-supplier';
import { UpdateSupplier } from './components/suppliers/update-supplier/update-supplier';
import { CreateOrder } from './components/orders/create-order/create-order';
import { UpdateOrder } from './components/orders/update-order/update-order';
import { CreatePayment } from './components/payments/create-payment/create-payment';
import { UpdatePayment } from './components/payments/update-payment/update-payment';
import { CreateDelivery } from './components/deliveries/create-delivery/create-delivery';
import { UpdateDelivery } from './components/deliveries/update-delivery/update-delivery';

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
        path: "patients/new",
        component: CreatePatient
    },
    {
        path: "patients/edit/:id",
        component: UpdatePatient
    },
    {
        path: "visual-histories",
        component: ShowVisualHistories
        
    },
    {
        path: "visual-histories/new",
        component: CreateVisualHistory
        
    },
    {
        path: "visual-histories/edit/:id",
        component: UpdateVisualHistory
        
    },
    {
        path: "appointments",
        component: ShowAppointments
    },
    {
        path: "appointments/new",
        component: CreateAppointment
    },
    {
        path: "appointments/edit/:id",
        component: UpdateAppointment
    },
    {
        path: "optometrists",
        component: ShowOptometrists
    },
    {
        path: "optometrists/new",
        component: CreateOptometrist
    },
    {
        path: "optometrists/edit/:id",
        component: UpdateOptometrist
    },
    {
        path: "visual-exams",
        component: ShowVisualExams
        
    },
     {
        path: "visual-exams/new",
        component: CreateVisualExam
        
    },
     {
        path: "visual-exams/edit/:id",
        component: UpdateVisualExam
        
    },
    {
        path: "frames",
        component: ShowFrames
    },
    {
        path: "frames/new",
        component: CreateFrame
    },
    {
        path: "frames/edit/:id",
        component: UpdateFrame
    },
    {
        path: "lenses",
        component: ShowLenses
    },
    {
        path: "lenses/new",
        component: CreateLens
    },
    {
        path: "lenses/edit/:id",
        component: UpdateLens
    },
    {
        path: "orders",
        component: ShowOrders
    },
    {
        path: "orders/new",
        component: CreateOrder
    },
    {
        path: "orders/edit/:id",
        component: UpdateOrder
    },
    {
        path: "order-details",
        component: ShowOrderDetails
    },
    {
        path: "order-details/new",
        component: CreateOrderDetail
    },
    {
        path: "order-details/edit/:id",
        component: UpdateOrderDetail
    },
    {
        path: "suppliers",
        component: ShowSuppliers
    },
     {
        path: "suppliers/new",
        component: CreateSupplier
    },
     {
        path: "suppliers/edit/:id",
        component: UpdateSupplier
    },

    {
        path: "payments",
        component: ShowPayments
    },
    {
        path: "payments/new",
        component: CreatePayment
    },
    {
        path: "payments/edit/:id",
        component: UpdatePayment
    },
    {
        path: "deliveries",
        component: ShowDeliveries
    },
    {
        path: "deliveries/new",
        component: CreateDelivery
    },
    {
        path: "deliveries/edit/:id",
        component: UpdateDelivery
    },

];
