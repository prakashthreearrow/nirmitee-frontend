import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { appointment, editProfile, getAppointment, getUserDetail, changePassword, logout } from '../redux/actions';
import ProfileModal from '../modal/ProfileModal';
import ChangePasswordModal from '../modal/ChangePasswordModal';
import ProfileImage from '../assets/image/images.png';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const localizer = momentLocalizer(moment);
    const DnDCalendar = withDragAndDrop(BigCalendar);

    const user_data = useSelector((state) => state?.GetUserDetail?.userDetail?.data);

    const fetchAppointments = useCallback(async () => {
        dispatch(
            getAppointment({
                callback: (data) => {
                    const formattedEvents = data?.data?.map((appointment) => {
                        const date = new Date(appointment?.date);
                        const [startHours, startMinutes] = appointment?.startTime.split(":").map(Number);
                        const [endHours, endMinutes] = appointment?.endTime.split(":").map(Number);
                        return {
                            id: appointment?._id,
                            title: appointment?.title,
                            start: new Date(date.setHours(startHours, startMinutes, 0, 0)),
                            end: new Date(date.setHours(endHours, endMinutes, 0, 0)),
                        };
                    });
                    setEvents(formattedEvents);
                    setAppointments(data?.data || []);
                },
            })
        );
    }, [dispatch]);

    const fetchUserDetail = useCallback(async () => {
        dispatch(getUserDetail());
    }, [dispatch]);

    useEffect(() => {
        fetchAppointments();
        fetchUserDetail();
    }, [fetchAppointments, fetchUserDetail]);

    const handleProfileUpdate = ({ firstName, lastName, imageUrl }) => {
        const payload = {
            firstName,
            lastName,
            image: imageUrl,
        };

        dispatch(
            editProfile({
                payload,
                callback: () => {
                    setLoading(false);
                    fetchUserDetail();
                    setIsProfileModalOpen(false); // Close modal after update
                },
            })
        );
    };

    const handleChangePasswordUpdate = ({ oldPassword, password }) => {
        const formPayload = {
            oldPassword,
            password,
        };

        dispatch(
            changePassword({
                data: formPayload,
                callback: (data) => {
                    setLoading(false);
                    if (data?.meta?.code === 200) {
                        setIsChangePasswordModalOpen(false); // Close modal after successful change
                    }
                },
            })
        );
    };

    const handleSelectSlot = async (slotInfo) => {
        const title = prompt('Enter a title for the appointment:');
        if (title) {
            const newEventObj = {
                title,
                date: moment(slotInfo.slots[0]).format('YYYY-MM-DD'),
                startTime: moment(slotInfo.start).format('HH:mm'),
                endTime: moment(slotInfo.end).format('HH:mm'),
            };
            dispatch(
                appointment({
                    calender: newEventObj,
                    callback: (data) => {
                        setEvents([...events, { ...newEventObj, id: data.data._id, start: slotInfo.start, end: slotInfo.end }]);
                    },
                })
            );
        }
    };

    const handleEventDrop = async ({ event, start, end }) => {
        const updatedEvent = { ...event, start, end };
        const updatedEventObj = {
            id: event?.id,
            title: event?.title,
            date: moment(start).format('YYYY-MM-DD'),
            startTime: moment(start).format('HH:mm'),
            endTime: moment(end).format('HH:mm'),
        };
        dispatch(
            appointment({
                calender: updatedEventObj,
                callback: () => {
                    setEvents((prevEvents) =>
                        prevEvents.map((evt) => (evt.id === event.id ? updatedEvent : evt))
                    );
                },
            })
        );
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const user_id = user_data?._id;
        if (user_data) {
            dispatch(
                logout({
                    user_id,
                    callback: () => {
                        navigate('/');
                    },
                })
            );
        }
    };

    const renderUserView = () => (
        <DnDCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelectSlot}
            draggableAccessor={() => true}
            onEventDrop={handleEventDrop}
        />
    );

    const renderDoctorView = () => {
        if (appointments.length === 0) {
            return (
                <div className="text-center text-gray-500 mt-4">
                    <p>No appointments are available.</p>
                </div>
            );
        }

        return (
            <div>
                <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
                <ul className="divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                        <li key={appointment?._id} className="py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{appointment?.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {moment(appointment?.date).format('MMMM Do YYYY')} |{' '}
                                        {appointment?.startTime} - {appointment?.endTime}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        User: {appointment?.userId?.userName || 'N/A'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Email: {appointment?.userId?.email || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    ;

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white flex justify-between items-center p-4">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                        <img
                            src={`${user_data?.image || ProfileImage}`}
                            alt="Profile"
                            className="rounded-full"
                        />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-30">
                            <span
                                onClick={() => setIsProfileModalOpen(true)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                Edit Profile
                            </span>
                            <span
                                onClick={() => setIsChangePasswordModalOpen(true)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                Change Password
                            </span>
                            <span
                                onClick={(e) => handleLogout(e)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            >
                                Logout
                            </span>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-grow p-4">
                {user_data?.role === 1 ? renderUserView() : renderDoctorView()}
            </main>

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={setIsProfileModalOpen}
                onSubmit={handleProfileUpdate}
                setLoading={setLoading}
                loading={loading}
            />

            <ChangePasswordModal
                isOpenChangePassword={isChangePasswordModalOpen}
                onCloseChangePassword={setIsChangePasswordModalOpen}
                onSubmit={handleChangePasswordUpdate}
                setLoading={setLoading}
                loading={loading}
            />

            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
