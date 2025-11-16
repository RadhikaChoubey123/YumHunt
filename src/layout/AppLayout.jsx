import { Header } from "./header"
import { Outlet } from "react-router-dom"
import {  Footer } from "./footer"
export const AppLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}