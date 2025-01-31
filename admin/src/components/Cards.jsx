import { LayoutDashboard, FileText, Bell, Building2, MessageSquare, Users, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = () => {
    const navigate = useNavigate();

    const cardData = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Applications", icon: FileText, path: "/applications" },
        { label: "Notifications", icon: Bell, path: "/notifications" },
        { label: "Rooms", icon: Building2, path: "/stats" },
        { label: "Students", icon: Users, path: "/stats" },
        { label: "Contact Forms", icon: MessageSquare, path: "/contact" },
        { label: "Admin Management", icon: UserCog, path: "/admins" }
    ];

    return (
        <div className='space-y-6 mt-40 sm:mt-20 px-20 py-2'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {cardData.map(({ label, icon: Icon, path }, index) => (
                    <div key={index} onClick={() => navigate(path)} className='bg-white rounded-lg shadow p-6 hover:bg-slate-300 cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <p className='text-2xl font-medium text-gray-600'>{label}</p>
                            <Icon className='h-8 w-8 text-indigo-600' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCard;
