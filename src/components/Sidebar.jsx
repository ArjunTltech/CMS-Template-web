import {
    BarChart2,
    ChevronLeft,
    ChevronRight,
    FileText,
    Home,
    Settings,
    Users,
    X,
    Layout,
    Mail,
    MessageSquare,
    Globe,
    PenTool,
    Layers,
    MailIcon,
    BriefcaseBusiness,
    Info,
    UserCog,
    BookOpenCheck,
    ClipboardList,
    FileQuestion,
    Newspaper,
    YoutubeIcon,
    Briefcase,
    Image,
    FileImage,
    ShoppingCart,
    Calendar,
    Bell,
    BookOpen,
    Tag,
    Folder,
    HelpCircle,
    Lock,
    Database,
    Shield,
    MessageCircleQuestion,
    MailOpen,
    Inbox
} from "lucide-react";

import { NavLink } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from "react";
// import axiosInstance from "../config/axios"; // Commented out - no longer needed
// import { useAuth } from "../context/AuthContext"; // Commented out - using mock data instead
import { sidebarCounts, mockAuthState, simulateApiDelay } from "../components/data/dummySidebar";
import logo from '../assets/logo/new-logo-landscape.png'; 
import logoIcon from '../assets/logo/new logo.png'; 

function Sidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }) {

    const [count, setCount] = useState({
        enquiries: 0,
        comments: 0,
        notifications: 0,
        blogs: 0,
        cases: 0,
        carrers: 0,
        services: 0,
        youTubeVideo: 0,
        users: 0,
        faqs: 0,
        testimonials: 0,
        newsletters: 0,
        clients: 0,
        socialMedia: 0,
        team: 0
    });

    // Using mock auth state instead of useAuth hook
    const authState = mockAuthState;

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Simulate API call with dummy data
                // Optional: add delay to simulate network request
                const data = await simulateApiDelay(sidebarCounts, 200);
                
                setCount({
                    enquiries: data.enquiries || 0,
                    comments: data.comments || 0,
                    notifications: data.notifications || 0,
                    blogs: data.blogs || 0,
                    cases: data.cases || 0,
                    carrers: data.carrers || 0,
                    services: data.services || 0,
                    youTubeVideo: data.youTubeVideo || 0,
                    users: data.users || 0,
                    faqs: data.faqs || 0,
                    testimonials: data.testimonials || 0,
                    newsletters: data.newsletters || 0,
                    clients: data.clients || 0,
                    socialMedia: data.socialMedia || 0,
                    team: data.team || 0
                });
            } catch (error) {
                console.error('Error fetching sidebar counts:', error);
                setCount(prevCount => prevCount);
            }
        };

        fetchCounts();

        // Optional: Keep the interval for demonstration purposes
        // In a real template, you might want to remove this
        const interval = setInterval(fetchCounts, 60000); 

        return () => clearInterval(interval);
    }, []);

    const navigation = [
        {
            section: "Dashboard",
            items: [
                { name: 'Dashboard', path: '/', icon: Home },
                { name: 'Analytics', path: '/analytics', icon: BarChart2 },
                { name: 'Enquiries', path: '/enquiries', icon: ClipboardList, count: count.enquiries },
            ]
        },
        {
            section: "Content Management",
            items: [
                { name: 'Pages', path: '/pages', icon: Layout },
                { name: 'Case Studies', path: '/case-study', icon: BookOpenCheck, count: count.cases },
                { name: 'Careers', path: '/career', icon: UserCog, count: count.carrers },
                { name: 'Blogs', path: '/blog', icon: PenTool, count: count.blogs },
                { name: 'Compliance', path: '/documents', icon: FileText },
                { name: 'SEO Editor', path: '/seo-editor', icon: Layers },
                { name: 'Team Management', path: '/team', icon: Users, count: count.team },
                { name: 'FAQs', path: '/faqs', icon: FileQuestion, count: count.faqs },
                { name: 'Services', path: '/services', icon: BriefcaseBusiness, count: count.services },
                { name: 'Organization Details', path: '/organization-details', icon: Info, },
            ]
        },
        {
            section: "User Management",
            items: [
                { name: 'Users', path: '/users', icon: Users, role: 'superadmin', count: count.users },
                // { name: 'Roles & Permissions', path: '/roles', icon: Lock },
            ]
        },
        {
            section: "Marketing",
            items: [
                { name: 'Newsletters', path: '/newsletters', icon: Newspaper, count: count.newsletters },
                { name: 'Testimonials', path: '/testimonials', icon: MessageSquare, count: count.testimonials },
                { name: 'Social Media', path: '/social', icon: Globe, count: count.socialMedia },
            ]
        },
        {
            section: "System",
            items: [
                // { name: 'Notifications', path: '/notifications', icon: Bell, count: count.notifications },
                { name: 'Mail Config', path: '/mail-config', icon: MailIcon },
                { name: 'Settings', path: '/settings', icon: Settings },
                // { name: 'Help & Docs', path: '/help', icon: HelpCircle }
            ]
        },
    ];

    const NavItem = ({ item, isActive }) => {
        const content = (
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <item.icon
                            className={`w-7 h-7 text-primary group-hover:text-white ${isActive ? 'text-white' : ''
                                }`}
                        />
                    </div>
                    <span
                        className={`ml-3 font-medium ease-in-out ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                            } ${isActive ? 'text-white' : ''}`}
                        style={{
                            transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
                            display: isCollapsed ? 'none' : 'block'
                        }}
                    >
                        {item.name}
                    </span>
                </div>
                {item.count > 0 && (
                    <div
                        className={`badge badge-primary ${isCollapsed ? 'hidden' : 'ml-2'
                            }`}
                    >
                        <span className="text-white">{item.count}</span>
                    </div>
                )}
            </div>
        );

        return isCollapsed ? (
            <Tippy
                content={
                    <div className="font-medium flex items-center">
                        {item.name}
                        {item.count && (
                            <div className="badge badge-primary ml-2">
                                {item.count}
                            </div>
                        )}
                    </div>
                }
                placement="right"
                arrow={true}
                className="tippy-box ml-2"
            >
                {content}
            </Tippy>
        ) : (
            content
        );
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-base-200 
                transition-all duration-300 ease-in-out shadow-sm h-full 
                ${isCollapsed ? 'w-16' : 'w-64'} 
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="flex items-center justify-between h-16 px-3">
                    <div className="flex items-center justify-center w-full">
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isCollapsed ? 'w-0 opacity-0' : 'w-40 opacity-100'
                        }`}>
                            <img src={logo} alt="Logo" className="h-14 w-auto rounded-sm" />
                        </div>
                        
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isCollapsed ? 'w-10 opacity-100' : 'w-0 opacity-0'
                        }`}>
                            <img src={logoIcon} alt="Logo Icon" className="h-10 w-10 rounded-sm" />
                        </div>
                    </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 focus:outline-none text-white rounded-xl shadow-md transition-all duration-300 ease-in-out lg:flex hidden"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5 text-neutral-content" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-neutral-content" />
                        )}
                    </button>
                    <button onClick={onClose} className="lg:hidden p-1">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="px-2 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hidden pb-24">
                    {navigation.map((section, index) => {
                        const filteredItems = section.items.filter(item =>
                            !item.role || authState.role === item.role
                        );

                        if (filteredItems.length === 0) {
                            return null;
                        }

                        return (
                            <div key={section.section} className={`${index > 0 ? 'mt-6' : 'mt-2'}`}>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'h-0 opacity-0' : 'h-6 opacity-100'
                                    }`}>
                                    <h2 className="text-xs font-semibold text-neutral-content/70 uppercase tracking-wider px-2 mb-2">
                                        {section.section}
                                    </h2>
                                </div>
                                {filteredItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => window.innerWidth < 1024 && onClose()}
                                        className={({ isActive }) =>
                                            `flex mx-auto px-2 py-2 mt-2 rounded-lg duration-300 ease-in-out group relative
                                        ${isActive
                                                ? 'bg-primary text-white'
                                                : 'text-neutral-content hover:bg-primary/30 hover:text-white'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <NavItem item={item} isActive={isActive} />
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        );
                    })}
                </nav>

            </aside>

            <style>{`
                .tippy-box {
                    background-color: rgb(17, 24, 39);
                }
                .tippy-arrow {
                    color: rgb(17, 24, 39);
                }
            `}</style>
        </>
    );
}

export default Sidebar;