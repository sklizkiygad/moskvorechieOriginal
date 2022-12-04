import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import CompanyPage from "@/pages/CompanyPage";
import CabinetPage from "@/pages/CabinetPage";
import CabinetUsersPage from "@/pages/CabinetUsersPage";
import DocumentsPage from "@/pages/DocumentsPage";
import CabinetCertificatesPage from "@/pages/CabinetCertificatesPage";
import CompanyEmployeesPage from "@/pages/CompanyEmployeesPage";
import CompanyDivisionsPage from "@/pages/CompanyDivisionsPage";
import CompanyConnectorsPage from "@/pages/CompanyConnectorsPage";
import CompanyLegalPage from "@/pages/CompanyLegalPage";
import ContragentsPage from "@/pages/ContragentsPage";


Vue.use(VueRouter)


const checkMainPage=()=>{
  if(localStorage.getItem('Moskvorechie')){

    return CompanyPage
  }
  else{

    return LoginPage
  }

}

const routes = [
  {
    path: '/',
    name: 'Компания',
    component: checkMainPage()
  },
  {
    path: '/divisions',
    name: 'Подразделения',
    component: CompanyDivisionsPage
  },
  {
    path: '/connectors',
    name: 'Коннекторы',
    component: CompanyConnectorsPage
  },
  { path: '/employees',
    name:'Сотрудники',
    component: CompanyEmployeesPage
  },
  { path: '/legal',
    name:'Юридические лица',
    component: CompanyLegalPage
  },
  {
    path: '/registration',
    name: 'reg',
    component: RegistrationPage
  },
  {
    path: '/cabinet',
    name: 'Кабинет',
    component: CabinetPage,
  },
  { path: '/cabinet/users',
    name:'Пользователи',
    component: CabinetUsersPage
  },
  { path: '/cabinet/certificates',
    name:'Сертификаты',
    component: CabinetCertificatesPage,
  },

  { path: '/documents',
    name:'Документы',
    component: DocumentsPage
  },

  { path: '/contragents',
    name:'Контрагенты',
    component: ContragentsPage
  }





]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
