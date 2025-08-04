import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axios';
import { SkeletonCard } from '../skeleton/Skeleton';
import StatCard from '../ui/StatCard';
import { Eye, User } from 'lucide-react';
import { dummyTotalActiveUsers } from '../data/dummyStats';

const TotalActiveUsers = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                const result = dummyTotalActiveUsers.totalActiveUsers;
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full animate-fade-in-down">
            {loading ? (
                <SkeletonCard />
            ) : (
                <StatCard
                    title="Active users"
                    value={data}
                    description="Last 30 days"
                    icon={User}
                    iconColor="text-teal-500"
                />
            )}
        </div>
    );
};

export default TotalActiveUsers