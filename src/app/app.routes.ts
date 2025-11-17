import { Routes } from '@angular/router';
import { AuthGuard } from './guards/authguard';
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
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'patients', component: ShowPatients, canActivate: [AuthGuard] },
  { path: 'patients/new', component: CreatePatient, canActivate: [AuthGuard] },
  { path: 'patients/edit/:id', component: UpdatePatient, canActivate: [AuthGuard] },

  { path: 'visual-histories', component: ShowVisualHistories, canActivate: [AuthGuard] },
  { path: 'visual-histories/new', component: CreateVisualHistory, canActivate: [AuthGuard] },
  { path: 'visual-histories/edit/:id', component: UpdateVisualHistory, canActivate: [AuthGuard] },

  { path: 'appointments', component: ShowAppointments, canActivate: [AuthGuard] },
  { path: 'appointments/new', component: CreateAppointment, canActivate: [AuthGuard] },
  { path: 'appointments/edit/:id', component: UpdateAppointment, canActivate: [AuthGuard] },

  { path: 'optometrists', component: ShowOptometrists, canActivate: [AuthGuard] },
  { path: 'optometrists/new', component: CreateOptometrist, canActivate: [AuthGuard] },
  { path: 'optometrists/edit/:id', component: UpdateOptometrist, canActivate: [AuthGuard] },

  { path: 'visual-exams', component: ShowVisualExams, canActivate: [AuthGuard] },
  { path: 'visual-exams/new', component: CreateVisualExam, canActivate: [AuthGuard] },
  { path: 'visual-exams/edit/:id', component: UpdateVisualExam, canActivate: [AuthGuard] },

  { path: 'frames', component: ShowFrames, canActivate: [AuthGuard] },
  { path: 'frames/new', component: CreateFrame, canActivate: [AuthGuard] },
  { path: 'frames/edit/:id', component: UpdateFrame, canActivate: [AuthGuard] },

  { path: 'lenses', component: ShowLenses, canActivate: [AuthGuard] },
  { path: 'lenses/new', component: CreateLens, canActivate: [AuthGuard] },
  { path: 'lenses/edit/:id', component: UpdateLens, canActivate: [AuthGuard] },

  { path: 'orders', component: ShowOrders, canActivate: [AuthGuard] },
  { path: 'orders/new', component: CreateOrder, canActivate: [AuthGuard] },
  { path: 'orders/edit/:id', component: UpdateOrder, canActivate: [AuthGuard] },

  { path: 'order-details', component: ShowOrderDetails, canActivate: [AuthGuard] },
  { path: 'order-details/new', component: CreateOrderDetail, canActivate: [AuthGuard] },
  { path: 'order-details/edit/:id', component: UpdateOrderDetail, canActivate: [AuthGuard] },

  { path: 'suppliers', component: ShowSuppliers, canActivate: [AuthGuard] },
  { path: 'suppliers/new', component: CreateSupplier, canActivate: [AuthGuard] },
  { path: 'suppliers/edit/:id', component: UpdateSupplier, canActivate: [AuthGuard] },

  { path: 'payments', component: ShowPayments, canActivate: [AuthGuard] },
  { path: 'payments/new', component: CreatePayment, canActivate: [AuthGuard] },
  { path: 'payments/edit/:id', component: UpdatePayment, canActivate: [AuthGuard] },

  { path: 'deliveries', component: ShowDeliveries, canActivate: [AuthGuard] },
  { path: 'deliveries/new', component: CreateDelivery, canActivate: [AuthGuard] },
  { path: 'deliveries/edit/:id', component: UpdateDelivery, canActivate: [AuthGuard] },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
