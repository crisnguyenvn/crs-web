import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import UserPage from "../pages/UserPage/UserPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthorizedLayout from "../layouts/AuthorizedLayout/AuthorizedLayout";
import UnauthorizedLayout from "../layouts/UnauthorizedLayout/UnauthorizedLayout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import VehiclePage from "../pages/VehiclePage/VehiclePage";
import { SessionStorageService } from "../services/sessionStorageService";
import { DashboardsContextComp } from "../contexts/DashboardContext";
import { UsersContextComp } from "../contexts/UserContext";
import { VehiclesContextComp } from "../contexts/VehicleContext";
import { RentalsContextComp } from "../contexts/RentalContext";
import RentalPage from "../pages/RentalPage/RentalPage";
import ReservationPage from "../pages/ReservationPage/ReservationPage";
import { ReservationContextComp } from "../contexts/ReservationContext";
import MyReservation from "../components/Reservation/MyReservation";
import SignupPage from "../pages/SignupPage/SignupPage";

export default function AppRoutes() {
    const sessionStorageService = new SessionStorageService();
    const isAuthenticated: boolean = sessionStorageService.isAuthenticated();
    const isAdmin: boolean = sessionStorageService.isAdmin();

    return (
        <BrowserRouter>
            {isAuthenticated ? (
                <AuthorizedLayout>
                    <Routes>
                        <Route element={<DashboardsContextComp />}>
                            <Route
                                path="/"
                                element={
                                    isAdmin ? (
                                        <DashboardPage />
                                    ) : (
                                        <Navigate to="/rentals" />
                                    )
                                }
                            />
                            <Route
                                path="/dashboards"
                                element={
                                    isAdmin ? (
                                        <DashboardPage />
                                    ) : (
                                        <Navigate to="/rentals" />
                                    )
                                }
                            />
                        </Route>
                        <Route element={<UsersContextComp />}>
                            <Route
                                path="/users"
                                element={
                                    isAdmin ? (
                                        <UserPage />
                                    ) : (
                                        <Navigate to="/rentals" />
                                    )
                                }
                            />
                        </Route>
                        <Route element={<VehiclesContextComp />}>
                            <Route
                                path="/vehicles"
                                element={
                                    isAdmin ? (
                                        <VehiclePage />
                                    ) : (
                                        <Navigate to="/rentals" />
                                    )
                                }
                            />
                        </Route>
                        <Route element={<RentalsContextComp />}>
                            <Route
                                path="/rentals"
                                element={
                                    !isAdmin ? (
                                        <RentalPage />
                                    ) : (
                                        <Navigate to="/dashboards" />
                                    )
                                }
                            />
                        </Route>
                        <Route element={<ReservationContextComp />}>
                            <Route
                                path="/confirm"
                                element={
                                    !isAdmin ? (
                                        <ReservationPage />
                                    ) : (
                                        <Navigate to="/dashboards" />
                                    )
                                }
                            />
                        </Route>
                        <Route element={<ReservationContextComp />}>
                            <Route
                                path="/reservations"
                                element={
                                    !isAdmin ? (
                                        <MyReservation />
                                    ) : (
                                        <Navigate to="/dashboards" />
                                    )
                                }
                            />
                        </Route>

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </AuthorizedLayout>
            ) : (
                <UnauthorizedLayout>
                    <Routes>
                        <Route path="/*" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </UnauthorizedLayout>
            )}
        </BrowserRouter>
    );
}
